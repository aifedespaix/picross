import { describe, expect, it } from 'vitest';
import { computeClues, fromBits } from '@picross/shared';
import {
  autoCross,
  clueStatus,
  type CellState,
  countFilled,
  createGrid,
  gridFromBits,
  isSolved,
  lineRuns,
  resizeGrid,
  toBits,
} from './grid.ts';

const bits = [
  [1, 1, 0],
  [0, 1, 0],
  [1, 0, 1],
];

describe('grid', () => {
  it('crée et redimensionne en conservant le contenu', () => {
    const grid = gridFromBits(bits);
    const bigger = resizeGrid(grid, 4, 4);
    expect(bigger).toHaveLength(4);
    expect(bigger[0]).toEqual(['filled', 'filled', 'blank', 'blank']);
    expect(resizeGrid(bigger, 3, 3)).toEqual(grid);
    expect(createGrid(2, 3)).toEqual([
      ['blank', 'blank'],
      ['blank', 'blank'],
      ['blank', 'blank'],
    ]);
  });

  it('convertit vers/depuis les bits et ignore les croix', () => {
    const grid = gridFromBits(bits);
    grid[0]![2] = 'crossed';
    expect(toBits(grid)).toEqual(bits);
    expect(countFilled(grid)).toBe(5);
  });

  it('lineRuns ignore les croix', () => {
    expect(lineRuns(['filled', 'crossed', 'filled', 'filled', 'blank'])).toEqual([1, 2]);
  });
});

describe('isSolved', () => {
  const clues = computeClues(fromBits(bits));

  it('accepte la solution et rejette une grille incomplète', () => {
    const grid = gridFromBits(bits);
    expect(isSolved(grid, clues)).toBe(true);
    grid[2]![2] = 'blank';
    expect(isSolved(grid, clues)).toBe(false);
  });

  it('accepte une autre grille qui respecte tous les indices', () => {
    // Ces deux grilles ont les mêmes indices : lignes [1,1],[1,1] / colonnes [1,1],[1,1]
    const a = fromBits([
      [1, 0],
      [0, 1],
    ]);
    const b = gridFromBits([
      [0, 1],
      [1, 0],
    ]);
    expect(isSolved(b, computeClues(a))).toBe(true);
  });

  it('les croix ne comptent pas comme des cases pleines', () => {
    const grid = gridFromBits(bits);
    grid[1]![0] = 'crossed';
    expect(isSolved(grid, clues)).toBe(true);
  });
});

describe('clueStatus', () => {
  it('grise les indices déjà satisfaits, dans l’ordre', () => {
    expect(clueStatus(['filled', 'filled', 'blank', 'filled', 'blank'], [2, 2])).toEqual([
      true,
      false,
    ]);
    expect(clueStatus(['blank', 'blank'], [1])).toEqual([false]);
  });
});

describe('clueStatus (déduction exacte)', () => {
  const line = (text: string): CellState[] =>
    [...text].map((c) => (c === '#' ? 'filled' : c === 'x' ? 'crossed' : 'blank'));

  it('grise un bloc au milieu de la ligne quand il est sans ambiguïté', () => {
    // 1 2 1 sur 9 cases : seul « 2 » peut être le bloc de longueur 2.
    expect(clueStatus(line('....##...'), [1, 2, 1])).toEqual([false, true, false]);
  });

  it('grise le dernier bloc posé en premier, mais pas s’il pourrait être un autre indice', () => {
    expect(clueStatus(line('.....##..'), [2, 3])).toEqual([false, false]);
    expect(clueStatus(line('..#.....#'), [2, 1])).toEqual([false, true]);
    expect(clueStatus(line('#........'), [2, 1])).toEqual([false, false]);
  });

  it('ne grise pas un bloc ambigu', () => {
    // 2 3 sur 12 cases : un « 2 » au milieu peut être l’indice 2 ou le début du 3.
    expect(clueStatus(line('.....##.....'), [2, 3])).toEqual([false, false]);
  });

  it('tient compte des croix pour lever l’ambiguïté', () => {
    // La croix en tête interdit au « 2 » de se loger avant : le bloc posé est forcément le « 2 ».
    expect(clueStatus(line('x..##.....'), [2, 4])).toEqual([true, false]);
    expect(clueStatus(line('...##.....'), [2, 4])).toEqual([false, false]);
    expect(clueStatus(line('#....x##x.'), [1, 2])).toEqual([true, true]);
  });

  it('grise un bloc de bord quand il est le seul possible', () => {
    expect(clueStatus(line('###......'), [3, 1])).toEqual([true, false]);
    expect(clueStatus(line('......###'), [1, 3])).toEqual([false, true]);
  });

  it('grise tous les indices d’une ligne résolue', () => {
    expect(clueStatus(line('##.#x'), [2, 1])).toEqual([true, true]);
  });

  it('retombe sur une comparaison simple quand la ligne contient une erreur', () => {
    // Trois cases isolées pour « 3 » : impossible. Le premier bloc de la bonne taille reste grisé.
    expect(clueStatus(line('#.#.#'), [1, 2])).toEqual([true, false]);
  });

  it('une ligne sans indice n’a rien à griser', () => {
    expect(clueStatus(line('...'), [])).toEqual([]);
  });

  /** Énumère tous les placements possibles puis compare avec la déduction exacte. */
  it('est identique à une énumération exhaustive (lignes aléatoires)', () => {
    let seed = 12345;
    const rand = () => (seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31;
    const placements = (n: number, clues: number[]): number[][] => {
      const all: number[][] = [];
      const go = (i: number, from: number, starts: number[]) => {
        if (i === clues.length) return void all.push(starts);
        for (let s = from; s + clues[i]! <= n; s++) go(i + 1, s + clues[i]! + 1, [...starts, s]);
      };
      go(0, 0, []);
      return all;
    };
    let compared = 0;
    for (let round = 0; round < 3000; round++) {
      const n = 3 + Math.floor(rand() * 7);
      const clues: number[] = [];
      for (let used = 0, k = 1 + Math.floor(rand() * 3); k > 0; k--) {
        const length = 1 + Math.floor(rand() * 3);
        if (used + length > n) break;
        clues.push(length);
        used += length + 1;
      }
      if (clues.length === 0 || clues.reduce((a, b) => a + b + 1, -1) > n) continue;
      const cells = Array.from({ length: n }, () => {
        const r = rand();
        return (r < 0.3 ? 'filled' : r < 0.45 ? 'crossed' : 'blank') as CellState;
      });
      const consistent = placements(n, clues).filter((starts) => {
        const covered = Array<boolean>(n).fill(false);
        starts.forEach((s, i) => {
          for (let c = s; c < s + clues[i]!; c++) covered[c] = true;
        });
        return cells.every((state, c) =>
          state === 'filled' ? covered[c] : state === 'crossed' ? !covered[c] : true,
        );
      });
      if (consistent.length === 0) continue; // ligne incohérente : repli, testé à part
      const expected = clues.map((length, i) =>
        consistent.every((starts) =>
          cells.slice(starts[i]!, starts[i]! + length).every((state) => state === 'filled'),
        ),
      );
      expect(clueStatus(cells, clues), `${cells.join(',')} / ${clues.join(',')}`).toEqual(expected);
      compared++;
    }
    expect(compared).toBeGreaterThan(500);
  });
});

describe('autoCross', () => {
  const clues = { rows: [[2], [1]], cols: [[1], [2], [0]] };

  it('croise les cases vides d’une ligne résolue, pas des autres', () => {
    const grid = gridFromBits([
      [1, 1, 0],
      [0, 0, 0],
    ]);
    const next = autoCross(grid, clues);
    expect(next[0]).toEqual(['filled', 'filled', 'crossed']);
    // La colonne 0 (indice 1) est elle aussi résolue : sa case vide est croisée.
    expect(next[1]).toEqual(['crossed', 'blank', 'blank']);
    expect(grid[0]).toEqual(['filled', 'filled', 'blank']); // la grille d'origine n'est pas modifiée
  });

  it('renvoie la même grille si aucune ligne n’est résolue', () => {
    const grid = createGrid(3, 2);
    expect(autoCross(grid, clues)).toBe(grid);
  });
});
