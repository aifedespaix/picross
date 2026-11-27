import type { CellState, Grid } from './grid';
import type { Tool } from './stroke';

/** Partie en cours d'une grille, mémorisée pour survivre à un rafraîchissement. */
export interface SavedGame {
  cells: Grid;
  mistakes: number;
  elapsed: number;
  /** Indices demandés (absent dans les anciennes sauvegardes). */
  hints?: number;
}

const KEY = 'picross:games';
const TOOL_KEY = 'picross:tool';
/** Nombre maximal de parties conservées (les plus récentes). */
export const MAX_SAVES = 12;

const STATES: readonly CellState[] = ['blank', 'filled', 'crossed'];

function storage(): Pick<Storage, 'getItem' | 'setItem'> | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null; // accès refusé (navigation privée, cookies bloqués…)
  }
}

function isSavedGame(value: unknown): value is SavedGame {
  if (!value || typeof value !== 'object') return false;
  const game = value as SavedGame;
  return (
    Array.isArray(game.cells) &&
    game.cells.every((row) => Array.isArray(row) && row.every((c) => STATES.includes(c))) &&
    Number.isFinite(game.mistakes) &&
    Number.isFinite(game.elapsed) &&
    (game.hints === undefined || Number.isFinite(game.hints))
  );
}

/** Liste ordonnée (la plus récente en dernier) de `[id, partie]`. */
function readAll(): [string, SavedGame][] {
  try {
    const parsed: unknown = JSON.parse(storage()?.getItem(KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is [string, SavedGame] =>
        Array.isArray(entry) && typeof entry[0] === 'string' && isSavedGame(entry[1]),
    );
  } catch {
    return [];
  }
}

function writeAll(entries: [string, SavedGame][]) {
  try {
    storage()?.setItem(KEY, JSON.stringify(entries.slice(-MAX_SAVES)));
  } catch {
    // quota dépassé ou stockage indisponible : la sauvegarde est un confort, pas un besoin
  }
}

/** Partie sauvegardée pour cette grille, si ses dimensions correspondent encore. */
export function loadGame(id: string, width: number, height: number): SavedGame | null {
  const game = readAll().find(([key]) => key === id)?.[1];
  if (!game || game.cells.length !== height || game.cells.some((row) => row.length !== width))
    return null;
  return game;
}

export function saveGame(id: string, game: SavedGame) {
  writeAll([...readAll().filter(([key]) => key !== id), [id, game]]);
}

export function clearGame(id: string) {
  writeAll(readAll().filter(([key]) => key !== id));
}

export function loadTool(): Tool | null {
  const tool = storage()?.getItem(TOOL_KEY);
  return tool === 'filled' || tool === 'crossed' ? tool : null;
}

export function saveTool(tool: Tool) {
  try {
    storage()?.setItem(TOOL_KEY, tool);
  } catch {
    // voir writeAll
  }
}
