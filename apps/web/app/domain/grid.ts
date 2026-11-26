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

interface Run {
  start: number;
  length: number;
}

function runsWithPosition(line: readonly CellState[]): Run[] {
  const runs: Run[] = [];
  line.forEach((state, index) => {
    if (state !== 'filled') return;
    const last = runs.at(-1);
    if (last && last.start + last.length === index) last.length++;
    else runs.push({ start: index, length: 1 });
  });
  return runs;
}

/**
 * Pour chaque indice, `true` si le bloc correspondant est déjà posé avec la bonne longueur :
 * l'indice est alors grisé pour guider le joueur. On compte depuis le début de la ligne (bloc de
 * même rang) comme depuis la fin : poser d'abord le dernier bloc grise aussi son indice, à
 * condition qu'il soit à un endroit où cet indice peut se trouver.
 */
export function clueStatus(line: readonly CellState[], clues: readonly number[]): boolean[] {
  const runs = runsWithPosition(line);
  // Position la plus à gauche où chaque indice peut commencer.
  const earliest: number[] = [];
  clues.reduce((offset, value, index) => {
    earliest[index] = offset;
    return offset + value + 1;
  }, 0);
  return clues.map((value, index) => {
    if (runs[index]?.length === value) return true;
    for (let j = index; j < clues.length; j++) {
      const run = runs[runs.length - (clues.length - j)];
      if (!run || run.length !== clues[j] || run.start < (earliest[j] ?? 0)) return false;
    }
    return true;
  });
}

/**
 * Marque d'une croix les cases vides de chaque ligne et colonne déjà résolue (les cases restantes
 * y sont forcément vides). Renvoie la même grille si rien ne change.
 */
export function autoCross(grid: Grid, clues: Clues): Grid {
  let next: Grid | null = null;
  const cross = (row: number, col: number) => {
    next ??= cloneGrid(grid);
    next[row]![col] = 'crossed';
  };
  clues.rows.forEach((rowClues, row) => {
    const line = grid[row] ?? [];
    if (!isLineSolved(line, rowClues)) return;
    line.forEach((state, col) => state === 'blank' && cross(row, col));
  });
  clues.cols.forEach((colClues, col) => {
    const line = getColumn(grid, col);
    if (!isLineSolved(line, colClues)) return;
    line.forEach((state, row) => state === 'blank' && cross(row, col));
  });
  return next ?? grid;
}
