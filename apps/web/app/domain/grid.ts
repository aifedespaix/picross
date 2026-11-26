import { lineClues, type Clues } from '@picross/shared';

/** Case vide, case pleine, ou case marquée d'une croix (« je sais qu'elle est vide »). */
export type CellState = 'blank' | 'filled' | 'crossed';
export type Grid = CellState[][];
export interface Pos {
  row: number;
  col: number;
}

export function createGrid(width: number, height: number): Grid {
  return Array.from({ length: height }, () => Array<CellState>(width).fill('blank'));
}

export function cloneGrid(grid: Grid): Grid {
  return grid.map((row) => [...row]);
}

export const gridWidth = (grid: Grid) => grid[0]?.length ?? 0;
export const gridHeight = (grid: Grid) => grid.length;

/** Redimensionne en conservant le contenu existant (les nouvelles cases sont vides). */
export function resizeGrid(grid: Grid, width: number, height: number): Grid {
  return Array.from({ length: height }, (_, row) =>
    Array.from({ length: width }, (_, col) => grid[row]?.[col] ?? 'blank'),
  );
}

export function getColumn(grid: Grid, col: number): CellState[] {
  return grid.map((row) => row[col] ?? 'blank');
}

export function countFilled(grid: Grid): number {
  let total = 0;
  for (const row of grid) for (const cell of row) if (cell === 'filled') total++;
  return total;
}

export function toSolution(grid: Grid): boolean[][] {
  return grid.map((row) => row.map((cell) => cell === 'filled'));
}

export function toBits(grid: Grid): (0 | 1)[][] {
  return grid.map((row) => row.map((cell) => (cell === 'filled' ? 1 : 0)));
}

export function gridFromBits(bits: readonly (readonly number[])[]): Grid {
  return bits.map((row) => row.map((bit): CellState => (bit === 1 ? 'filled' : 'blank')));
}

/** Blocs consécutifs de cases pleines dans une ligne jouée. */
export function lineRuns(line: readonly CellState[]): number[] {
  return lineClues(line.map((cell) => cell === 'filled'));
}

const sameRuns = (a: readonly number[], b: readonly number[]) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

/** Une ligne est résolue quand ses blocs correspondent exactement à ses indices. */
export function isLineSolved(line: readonly CellState[], clues: readonly number[]): boolean {
  return sameRuns(lineRuns(line), clues);
}

/** Toutes les lignes et colonnes respectent leurs indices (toute solution valide est acceptée). */
export function isSolved(grid: Grid, clues: Clues): boolean {
  return (
    clues.rows.every((rowClues, row) => isLineSolved(grid[row] ?? [], rowClues)) &&
    clues.cols.every((colClues, col) => isLineSolved(getColumn(grid, col), colClues))
  );
}

/**
 * Pour chaque indice, `true` si le bloc correspondant (dans l'ordre) est déjà posé avec la bonne
 * longueur : l'indice est alors grisé pour guider le joueur.
 */
export function clueStatus(line: readonly CellState[], clues: readonly number[]): boolean[] {
  const runs = lineRuns(line);
  return clues.map((value, index) => runs[index] === value);
}
