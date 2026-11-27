import { solveLine, type Clues, type Solution } from '@picross/shared';
import { getColumn, type CellState, type Grid } from './grid';

const CACHE_LIMIT = 4000;

/**
 * Mode assisté : marque d'une croix les cases dont le vide se déduit des cases PLEINES déjà posées
 * (bloc terminé, case hors de portée…). Les croix ne sont donc que la conséquence de ce que le
 * joueur a trouvé : elles ne révèlent aucune case pleine. Une case de l'image n'est jamais croisée,
 * même si une case fausse a faussé le raisonnement.
 *
 * Renvoie une fonction pure ; les calculs de ligne sont mémorisés (le tracé d'un trait réévalue
 * toute la grille à chaque case).
 */
export function createAssist(clues: Clues, solution: Solution): (grid: Grid) => Grid {
  const cache = new Map<string, number[]>();

  /** Positions déduites vides pour cette ligne, d'après ses seules cases pleines. */
  function deducedEmpties(key: string, line: readonly CellState[], lineClues: number[]): number[] {
    if (!line.includes('filled')) return [];
    const pattern = line.map((state) => (state === 'filled' ? '1' : '0')).join('');
    const id = `${key}:${pattern}`;
    let found = cache.get(id);
    if (!found) {
      const solved = solveLine(
        line.map((state) => (state === 'filled' ? 1 : 0)),
        lineClues,
      );
      found = solved ? solved.flatMap((value, i) => (value === 2 ? [i] : [])) : [];
      if (cache.size >= CACHE_LIMIT) cache.clear();
      cache.set(id, found);
    }
    return found;
  }

  return (grid) => {
    let next: Grid | null = null;
    const cross = (row: number, col: number) => {
      if (grid[row]?.[col] !== 'blank' || solution[row]?.[col]) return;
      next ??= grid.map((line) => [...line]);
      next[row]![col] = 'crossed';
    };
    clues.rows.forEach((rowClues, row) =>
      deducedEmpties(`r${row}`, grid[row] ?? [], rowClues).forEach((col) => cross(row, col)),
    );
    clues.cols.forEach((colClues, col) =>
      deducedEmpties(`c${col}`, getColumn(grid, col), colClues).forEach((row) => cross(row, col)),
    );
    return next ?? grid;
  };
}
