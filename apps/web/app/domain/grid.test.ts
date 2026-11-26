import { describe, expect, it } from 'vitest';
import { computeClues, fromBits } from '@picross/shared';
import {
  autoCross,
  clueStatus,
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

describe('clueStatus depuis la fin', () => {
  it('grise le dernier indice quand son bloc est posé en premier', () => {
    expect(clueStatus(['blank', 'blank', 'blank', 'filled', 'filled'], [1, 2])).toEqual([
      false,
      true,
    ]);
    expect(clueStatus(['filled', 'blank', 'blank', 'blank', 'blank'], [2, 1])).toEqual([
      false,
      false,
    ]);
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
