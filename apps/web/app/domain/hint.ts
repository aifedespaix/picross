import { solveLine, type Clues, type Solution } from '@picross/shared';
import { getColumn, isLineSolved, type CellState, type Grid } from './grid';

/** Pourquoi cette ligne permet d'avancer (sert à choisir le texte affiché). */
export type HintReason = 'error' | 'empty' | 'full' | 'finished' | 'overlap' | 'logic' | 'reveal';

export interface HintCell {
  row: number;
  col: number;
  /** État à donner à la case si l'indice est appliqué. */
  state: CellState;
}

export interface Hint {
  axis: 'row' | 'col';
  /** Numéro (à partir de 0) de la ligne ou colonne concernée. */
  index: number;
  reason: HintReason;
  cells: HintCell[];
  /** Valeur utile au texte : le plus grand bloc (« overlap »). */
  clue?: number;
}

type Known = 0 | 1 | 2;

/** Du plus simple au plus subtil : le joueur apprend d'abord les raisonnements de base. */
const RANK: Record<HintReason, number> = {
  error: 0,
  empty: 1,
  full: 2,
  finished: 3,
  overlap: 4,
  logic: 5,
  reveal: 6,
};

function known(line: readonly CellState[]): Known[] {
  return line.map((state): Known => (state === 'filled' ? 1 : state === 'crossed' ? 2 : 0));
}

function classify(line: readonly CellState[], clues: readonly number[]): [HintReason, number?] {
  if (clues.length === 0) return ['empty'];
  const needed = clues.reduce((sum, value) => sum + value, 0) + clues.length - 1;
  if (needed === line.length) return ['full'];
  if (isLineSolved(line, clues)) return ['finished'];
  const slack = line.length - needed;
  const biggest = Math.max(...clues);
  if (biggest > slack) return ['overlap', biggest];
  return ['logic'];
}

/** Cases fausses : une case pleine hors de l'image, ou une croix sur une case de l'image. */
function findError(grid: Grid, solution: Solution): Hint | null {
  for (let row = 0; row < grid.length; row++) {
    const cells: HintCell[] = [];
    grid[row]!.forEach((state, col) => {
      const wanted = solution[row]?.[col] === true;
      if ((state === 'filled' && !wanted) || (state === 'crossed' && wanted))
        cells.push({ row, col, state: 'blank' });
    });
    if (cells.length) return { axis: 'row', index: row, reason: 'error', cells };
  }
  return null;
}

/**
 * Le meilleur indice pour cette grille, ou `null` si elle est déjà complète.
 * 1. une erreur à corriger ; 2. sinon la déduction la plus simple, ligne par ligne ;
 * 3. sinon (grille qui demande de deviner) une case de la solution.
 */
export function findHint(grid: Grid, clues: Clues, solution: Solution): Hint | null {
  const error = findError(grid, solution);
  if (error) return error;

  let best: Hint | null = null;
  const consider = (axis: 'row' | 'col', index: number, line: CellState[], lineClues: number[]) => {
    const solved = solveLine(known(line), lineClues);
    if (!solved) return;
    const cells: HintCell[] = [];
    solved.forEach((value, i) => {
      if (value === 0 || line[i] !== 'blank') return;
      const state: CellState = value === 1 ? 'filled' : 'crossed';
      cells.push(axis === 'row' ? { row: index, col: i, state } : { row: i, col: index, state });
    });
    if (!cells.length) return;
    const [reason, clue] = classify(line, lineClues);
    const better =
      !best ||
      RANK[reason] < RANK[best.reason] ||
      (RANK[reason] === RANK[best.reason] && cells.length > best.cells.length);
    if (better) best = { axis, index, reason, cells, clue };
  };

  grid.forEach((line, row) => consider('row', row, line, clues.rows[row] ?? []));
  clues.cols.forEach((colClues, col) => consider('col', col, getColumn(grid, col), colClues));
  if (best) return best;

  for (let row = 0; row < grid.length; row++) {
    const col = grid[row]!.findIndex((state) => state === 'blank');
    if (col >= 0) {
      const state: CellState = solution[row]?.[col] ? 'filled' : 'crossed';
      return { axis: 'row', index: row, reason: 'reveal', cells: [{ row, col, state }] };
    }
  }
  return null;
}

/** Grille obtenue en appliquant un indice. */
export function applyHint(grid: Grid, hint: Hint): Grid {
  const next = grid.map((line) => [...line]);
  for (const { row, col, state } of hint.cells) next[row]![col] = state;
  return next;
}
