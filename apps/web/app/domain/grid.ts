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
 * Repli quand la ligne est incohérente (une case fausse est posée) : on compare les blocs posés aux
 * indices, dans l'ordre, depuis le début de la ligne comme depuis la fin.
 */
function approximateStatus(line: readonly CellState[], clues: readonly number[]): boolean[] {
  const runs = runsWithPosition(line);
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
 * Déduction exacte : un indice est « fait » quand son bloc est entièrement posé dans TOUTES les
 * façons de finir la ligne qui respectent les cases pleines et les croix déjà placées. Un bloc
 * ambigu (il pourrait aussi être un autre indice) n'est donc jamais grisé à tort, et un bloc
 * déterminé l'est même s'il est au milieu de la ligne ou entouré de blocs incomplets.
 *
 * Programmation dynamique en O(n² · k) : `pre[i][q]` = les blocs 0…i-1 tiennent dans les cases
 * [0, q) en couvrant toutes les cases pleines de cette zone ; `suf[i][p]` = les blocs i…k-1
 * tiennent dans [p, n). Renvoie `null` si aucune façon n'existe (ligne incohérente).
 */
function exactStatus(line: readonly CellState[], clues: readonly number[]): boolean[] | null {
  const n = line.length;
  const k = clues.length;
  const filledBefore = [0];
  const crossedBefore = [0];
  line.forEach((state, i) => {
    filledBefore.push(filledBefore[i]! + (state === 'filled' ? 1 : 0));
    crossedBefore.push(crossedBefore[i]! + (state === 'crossed' ? 1 : 0));
  });
  const filledIn = (from: number, to: number) => filledBefore[to]! - filledBefore[from]!;
  const isFilled = (i: number) => line[i] === 'filled';
  const canPlace = (start: number, length: number) =>
    start >= 0 && start + length <= n && crossedBefore[start + length]! === crossedBefore[start]!;

  const pre: boolean[][] = Array.from({ length: k + 1 }, () => Array<boolean>(n + 1).fill(false));
  for (let q = 0; q <= n; q++) pre[0]![q] = filledIn(0, q) === 0;
  for (let i = 1; i <= k; i++) {
    const length = clues[i - 1]!;
    for (let q = 0; q <= n; q++) {
      for (let end = length; end <= q && !pre[i]![q]; end++) {
        const start = end - length;
        if (filledIn(end, q) !== 0 || !canPlace(start, length)) continue;
        pre[i]![q] = start === 0 ? i === 1 : !isFilled(start - 1) && pre[i - 1]![start - 1]!;
      }
    }
  }

  const suf: boolean[][] = Array.from({ length: k + 1 }, () => Array<boolean>(n + 1).fill(false));
  for (let p = 0; p <= n; p++) suf[k]![p] = filledIn(p, n) === 0;
  for (let i = k - 1; i >= 0; i--) {
    const length = clues[i]!;
    for (let p = n - 1; p >= 0; p--) {
      const skip = !isFilled(p) && suf[i]![p + 1]!;
      const end = p + length;
      const place =
        canPlace(p, length) &&
        (end === n ? suf[i + 1]![n]! : !isFilled(end) && suf[i + 1]![end + 1]!);
      suf[i]![p] = skip || place;
    }
  }

  const status: boolean[] = [];
  for (let i = 0; i < k; i++) {
    const length = clues[i]!;
    let possible = 0;
    let allFilled = true;
    for (let start = 0; start + length <= n; start++) {
      const before = start === 0 ? i === 0 : !isFilled(start - 1) && pre[i]![start - 1]!;
      const end = start + length;
      const after = end === n ? suf[i + 1]![n]! : !isFilled(end) && suf[i + 1]![end + 1]!;
      if (!before || !after || !canPlace(start, length)) continue;
      possible++;
      if (filledIn(start, end) !== length) allFilled = false;
    }
    if (possible === 0) return null;
    status.push(allFilled);
  }
  return status;
}

/**
 * Pour chaque indice, `true` quand son bloc est certainement posé : l'indice est alors grisé.
 * Voir `exactStatus` ; si la ligne contient une erreur, on retombe sur une comparaison simple.
 */
export function clueStatus(line: readonly CellState[], clues: readonly number[]): boolean[] {
  if (clues.length === 0) return [];
  if (clues.some((value) => value <= 0)) return clues.map(() => false);
  return exactStatus(line, clues) ?? approximateStatus(line, clues);
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
