import { computeClues } from '@picross/shared';
import { describe, expect, it } from 'vitest';
import { createAssist } from './assist';
import { createGrid } from './grid';
import { applyHint, findHint } from './hint';

const solution = [
  [true, true, true, true, true],
  [true, false, false, false, true],
  [true, false, true, false, true],
  [true, false, false, false, true],
  [true, true, true, true, true],
];
const clues = computeClues(solution);

describe('findHint', () => {
  it('commence par la déduction la plus simple (ligne pleine)', () => {
    const hint = findHint(createGrid(5, 5), clues, solution)!;
    expect(hint.reason).toBe('full');
    expect(hint.cells.every((cell) => cell.state === 'filled')).toBe(true);
  });

  it('signale une erreur avant tout le reste', () => {
    const grid = createGrid(5, 5);
    grid[1]![2] = 'filled';
    grid[3]![3] = 'crossed';
    grid[3]![0] = 'crossed'; // case de l'image marquée vide
    const hint = findHint(grid, clues, solution)!;
    expect(hint).toMatchObject({ reason: 'error', axis: 'row', index: 1 });
    expect(applyHint(grid, hint)[1]![2]).toBe('blank');
  });

  it('croise le reste d’une ligne terminée', () => {
    const grid = createGrid(5, 5);
    grid[2]![0] = 'filled';
    grid[2]![2] = 'filled';
    grid[2]![4] = 'filled';
    const hint = findHint(grid, clues, solution)!;
    // les lignes pleines (0 et 4) passent avant ; une fois posées, la ligne 2 est « terminée »
    expect(hint.reason).toBe('full');
  });

  it('n’aboutit à rien sur une grille terminée', () => {
    const grid = solution.map((row) =>
      row.map((v) => (v ? ('filled' as const) : ('crossed' as const))),
    );
    expect(findHint(grid, clues, solution)).toBeNull();
  });

  it('finit toujours par résoudre la grille en suivant les indices', () => {
    let grid = createGrid(5, 5);
    for (let i = 0; i < 60; i++) {
      const hint = findHint(grid, clues, solution);
      if (!hint) break;
      grid = applyHint(grid, hint);
    }
    grid.forEach((row, r) =>
      row.forEach((cell, c) => expect(cell === 'filled').toBe(solution[r]![c])),
    );
  });
});

describe('createAssist', () => {
  it('croise les cases devenues impossibles, jamais une case de l’image', () => {
    const assist = createAssist(clues, solution);
    const grid = createGrid(5, 5);
    for (let c = 0; c < 5; c++) grid[0]![c] = 'filled';
    const next = assist(grid);
    expect(next[0]!.every((cell) => cell === 'filled')).toBe(true);
    // colonne 1 (indices 1 1) : le premier bloc est posé, la case juste dessous est forcément vide
    expect(next[1]![1]).toBe('crossed');
    expect(next[1]![0]).toBe('blank');
  });

  it('ne fait rien sans case pleine', () => {
    const grid = createGrid(5, 5);
    expect(createAssist(clues, solution)(grid)).toBe(grid);
  });
});
