import type { Pos } from './grid';

/** Ramène une position dans la grille (utile quand le doigt sort du plateau en glissant). */
export function clampPos(pos: Pos, width: number, height: number): Pos {
  return {
    row: Math.min(Math.max(pos.row, 0), Math.max(height - 1, 0)),
    col: Math.min(Math.max(pos.col, 0), Math.max(width - 1, 0)),
  };
}
