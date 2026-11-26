import { cloneGrid, type CellState, type Grid, type Pos } from './grid.ts';

export type Tool = 'filled' | 'crossed';

/**
 * Un « trait » = un glisser du doigt / de la souris. Il part d'une case, se verrouille sur
 * l'axe (ligne ou colonne) dans lequel on s'éloigne en premier, et peint toutes les cases
 * jusqu'à la case courante. Le résultat est toujours recalculé depuis la grille de départ :
 * revenir en arrière pendant le glissé annule donc naturellement les cases dépassées.
 */
export interface Stroke {
  origin: Pos;
  /** État appliqué aux cases peintes. */
  brush: CellState;
  /** Seules les cases ayant cet état au départ sont modifiées. */
  source: CellState;
  axis: 'row' | 'col' | null;
  snapshot: Grid;
}

export function beginStroke(grid: Grid, origin: Pos, tool: Tool): Stroke {
  const source = grid[origin.row]?.[origin.col] ?? 'blank';
  return {
    origin,
    // Re-cliquer sur une case qui a déjà l'état de l'outil l'efface.
    brush: source === tool ? 'blank' : tool,
    source,
    axis: null,
    snapshot: cloneGrid(grid),
  };
}

/** Grille obtenue en peignant du point de départ jusqu'à `to`. Verrouille l'axe au premier écart. */
export function strokeTo(stroke: Stroke, to: Pos): Grid {
  const { origin, snapshot } = stroke;
  const next = cloneGrid(snapshot);
  const height = snapshot.length;
  const width = snapshot[0]?.length ?? 0;

  const dRow = to.row - origin.row;
  const dCol = to.col - origin.col;
  if (stroke.axis === null && (dRow !== 0 || dCol !== 0)) {
    stroke.axis = Math.abs(dCol) >= Math.abs(dRow) ? 'row' : 'col';
  }

  const length = stroke.axis === 'col' ? dRow : dCol;
  const step = Math.sign(length) || 1;
  for (let i = 0; i <= Math.abs(length); i++) {
    const row = stroke.axis === 'col' ? origin.row + i * step : origin.row;
    const col = stroke.axis === 'col' ? origin.col : origin.col + i * step;
    if (row < 0 || col < 0 || row >= height || col >= width) continue;
    if (snapshot[row]![col] === stroke.source) next[row]![col] = stroke.brush;
  }
  return next;
}

export function gridsEqual(a: Grid, b: Grid): boolean {
  return a.length === b.length && a.every((row, r) => row.every((cell, c) => cell === b[r]?.[c]));
}
