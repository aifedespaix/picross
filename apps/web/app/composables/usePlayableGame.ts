import { useIntervalFn } from '@vueuse/core';
import {
  computeClues,
  countFilled as countSolution,
  fromBits,
  rateDifficulty,
  STARTER_PUZZLES,
  starterBits,
  type StarterPuzzle,
  type PicrossDetail,
} from '@picross/shared';
import { computed, ref, shallowRef, watch } from 'vue';
import { createAssist } from '@/domain/assist';
import { starsFor } from '@/domain/journey';
import { applyHint, findHint, type Hint } from '@/domain/hint';
import {
  autoCross,
  countFilled,
  createGrid,
  isLineSolved,
  isSolved,
  getColumn,
  type CellState,
  type Grid,
} from '@/domain/grid';
import { clearGame, loadGame, loadTool, saveGame, saveTool } from '@/domain/saves';
import { vibrate } from '@/utils/haptics';
import { useBoard } from './useBoard';
import { useCorruptionStore } from '@/stores/corruption';
import { useSettingsStore } from '@/stores/settings';
import { useSound } from './useSound';

/** Grille jouable : soit renvoyée par l'API, soit locale (mode hors ligne). */
export type PlayablePuzzle = Pick<
  PicrossDetail,
  'id' | 'title' | 'map' | 'author' | 'likes' | 'likedByMe' | 'difficulty'
> & {
  local?: boolean;
};

function toPlayable(puzzle: StarterPuzzle, lang: 'fr' | 'en'): PlayablePuzzle {
  const map = starterBits(puzzle.rows);
  return {
    id: `local-${puzzle.slug}`,
    title: puzzle[lang],
    map,
    difficulty: rateDifficulty(fromBits(map)).level,
    author: null,
    likes: 0,
    likedByMe: false,
    local: true,
  };
}

/** Grille locale au hasard (mode hors ligne) parmi celles livrées avec l'application. */
export function localPuzzle(exclude?: string, lang: 'fr' | 'en' = 'fr'): PlayablePuzzle {
  const choices = STARTER_PUZZLES.filter((puzzle) => `local-${puzzle.slug}` !== exclude);
  return toPlayable(choices[Math.floor(Math.random() * choices.length)]!, lang);
}

/** Grille locale précise (parcours) : `id` est de la forme `local-<slug>`. */
export function localPuzzleById(id: string, lang: 'fr' | 'en' = 'fr'): PlayablePuzzle | null {
  const puzzle = STARTER_PUZZLES.find((item) => `local-${item.slug}` === id);
  return puzzle ? toPlayable(puzzle, lang) : null;
}

/** Logique d'une partie : plateau, minuteur, détection de victoire, sons, sauvegarde. */
export function usePlayableGame() {
  const { play, playBurst, fillRun } = useSound();
  const corruption = useCorruptionStore();
  const settings = useSettingsStore();
  const played = usePlayedFlag();
  const puzzle = shallowRef<PlayablePuzzle | null>(null);
  const won = ref(false);
  /** Dernière grille d'un chapitre (boss) : sa victoire a sa propre fanfare. */
  const finale = ref(false);
  const startedAt = ref<number | null>(null);
  const elapsed = ref(0);
  /** Nombre de fois où une case fausse a été remplie (0 = partie parfaite). */
  const mistakes = ref(0);
  /** Indices demandés : chacun compte comme une erreur pour les étoiles. */
  const hints = ref(0);
  /** Indice affiché : une nouvelle demande l'applique, toute modification de la grille l'écarte. */
  const hint = ref<Hint | null>(null);
  let wrongNow = 0;
  /** Lignes et colonnes résolues (clé `r3` / `c5`) : une qui s'ajoute fait entendre « ligne faite ». */
  let solvedLines = new Set<string>();
  /** Pendant la restauration d'une sauvegarde : ni erreur comptée, ni victoire, ni sauvegarde. */
  let restoring = false;

  const solution = computed(() => (puzzle.value ? fromBits(puzzle.value.map) : []));
  const clues = computed(() => computeClues(solution.value));
  const target = computed(() => countSolution(solution.value));
  const assist = computed(() => createAssist(clues.value, solution.value));

  /** Le minuteur ne tourne qu'après le premier coup (et jamais pendant le SSR). */
  function startTimer() {
    if (startedAt.value !== null) return;
    startedAt.value = Date.now() - elapsed.value;
    timer.resume();
  }

  /** Croix automatiques selon le réglage ; aussi appliquées après un indice. */
  function autoMark(grid: Grid): Grid {
    if (settings.assist === 'off') return grid;
    const crossed = autoCross(grid, clues.value);
    return settings.assist === 'assisted' ? assist.value(crossed) : crossed;
  }

  const board = useBoard(createGrid(1, 1), {
    locked: won,
    transform: autoMark,
    onPaint(states: CellState[]) {
      startTimer();
      // Un son par case modifiée : une ligne de 6 cases d'un coup s'entend comme 6 cases.
      const count = (wanted: CellState) => states.filter((state) => state === wanted).length;
      fillRun(count('filled'));
      playBurst('cross', count('crossed'));
      playBurst('clear', count('blank'));
      if (settings.haptics) vibrate(8);
    },
    onChange(grid) {
      hint.value = null;
      const solved = solvedLinesOf(grid);
      const gained = [...solved].filter((key) => !solvedLines.has(key)).length;
      solvedLines = solved;
      if (restoring) {
        wrongNow = countWrong(grid);
        return;
      }
      const wrong = countWrong(grid);
      const erred = wrong > wrongNow;
      if (erred) {
        mistakes.value += wrong - wrongNow;
        corruption.bump();
        play('error');
      }
      wrongNow = wrong;
      if (isSolved(grid, clues.value)) {
        won.value = true;
        played.value = true;
        corruption.purify(mistakes.value + hints.value === 0);
        timer.pause();
        elapsed.value = Date.now() - (startedAt.value ?? Date.now());
        if (puzzle.value) clearGame(puzzle.value.id);
        play(finale.value ? 'boss' : (`win${starsFor(mistakes.value + hints.value)}` as const));
        if (settings.haptics) vibrate([30, 50, 30, 50, 120]);
      } else {
        // Une ligne qui vient de se compléter (hors erreur, pour ne pas mêler « bravo » et « raté »).
        if (gained > 0 && !erred) play('line');
        persist();
      }
    },
  });

  /** Lignes (`r<i>`) et colonnes (`c<j>`) dont les blocs correspondent aux indices. */
  function solvedLinesOf(grid: Grid): Set<string> {
    const out = new Set<string>();
    clues.value.rows.forEach((clue, row) => {
      if (isLineSolved(grid[row] ?? [], clue)) out.add(`r${row}`);
    });
    clues.value.cols.forEach((clue, col) => {
      if (isLineSolved(getColumn(grid, col), clue)) out.add(`c${col}`);
    });
    return out;
  }

  /** Cases remplies qui ne font pas partie de l'image. */
  function countWrong(grid: Grid): number {
    const map = puzzle.value?.map ?? [];
    let wrong = 0;
    grid.forEach((line, row) =>
      line.forEach((state, col) => {
        if (state === 'filled' && !map[row]?.[col]) wrong++;
      }),
    );
    return wrong;
  }

  const timer = useIntervalFn(
    () => {
      if (startedAt.value) elapsed.value = Date.now() - startedAt.value;
    },
    250,
    { immediate: false },
  );

  const filled = computed(() => countFilled(board.cells.value));

  function persist() {
    if (!puzzle.value || won.value || !import.meta.client) return;
    if (startedAt.value !== null) elapsed.value = Date.now() - startedAt.value;
    saveGame(puzzle.value.id, {
      cells: board.cells.value,
      mistakes: mistakes.value,
      elapsed: elapsed.value,
      hints: hints.value,
    });
  }

  function blankGrid(): Grid {
    return puzzle.value
      ? createGrid(puzzle.value.map[0]?.length ?? 1, puzzle.value.map.length)
      : createGrid(1, 1);
  }

  function reset() {
    won.value = false;
    mistakes.value = 0;
    hints.value = 0;
    hint.value = null;
    wrongNow = 0;
    startedAt.value = null;
    elapsed.value = 0;
    timer.pause();
    // Chargement « silencieux » : il ne doit pas écraser la sauvegarde que `restore` va relire.
    restoring = true;
    try {
      board.load(blankGrid());
      solvedLines = solvedLinesOf(board.cells.value);
    } finally {
      restoring = false;
    }
  }

  /**
   * Efface la grille. Pendant une partie, l'effacement est annulable (historique) ; une partie
   * gagnée repart de zéro. Le chrono et les erreurs ne sont pas remis à zéro.
   */
  function clear() {
    play('clear');
    if (won.value) {
      if (puzzle.value) clearGame(puzzle.value.id);
      return reset();
    }
    board.checkpoint();
    board.load(blankGrid(), { keepHistory: true });
  }

  function start(next: PlayablePuzzle) {
    puzzle.value = next;
    reset();
  }

  /** Reprend la partie mémorisée de cette grille et l'outil choisi (côté client, après hydratation). */
  function restore() {
    const tool = loadTool();
    if (tool) board.tool.value = tool;
    const current = puzzle.value;
    if (!current || won.value) return;
    const saved = loadGame(current.id, current.map[0]?.length ?? 0, current.map.length);
    if (!saved || !saved.cells.some((row) => row.some((state) => state !== 'blank'))) return;
    restoring = true;
    try {
      mistakes.value = saved.mistakes;
      hints.value = saved.hints ?? 0;
      elapsed.value = saved.elapsed;
      startedAt.value = null;
      board.load(saved.cells);
      solvedLines = solvedLinesOf(board.cells.value);
    } finally {
      restoring = false;
    }
  }

  /** Première demande : montre la ligne et explique. Seconde : applique l'indice affiché. */
  function askHint() {
    if (won.value || !puzzle.value) return;
    if (hint.value) {
      const shown = hint.value;
      board.checkpoint();
      board.load(autoMark(applyHint(board.cells.value, shown)), { keepHistory: true });
      startTimer();
      play(shown.cells.some((cell) => cell.state === 'filled') ? 'fill' : 'cross');
      if (settings.haptics) vibrate(12);
      return;
    }
    const found = findHint(board.cells.value, clues.value, solution.value);
    if (!found) return;
    // Corriger une erreur ne coûte rien de plus : l'erreur est déjà comptée.
    if (found.reason !== 'error') hints.value++;
    hint.value = found;
    play('hint');
    persist();
  }

  function dismissHint() {
    hint.value = null;
  }

  watch(board.tool, (tool) => saveTool(tool));

  function undo(): boolean {
    const done = board.undo();
    if (done) play(Math.random() > 0.5 ? 'undo' : 'undo2');
    return done;
  }

  function redo(): boolean {
    const done = board.redo();
    if (done) play(Math.random() > 0.5 ? 'undo' : 'undo2');
    return done;
  }

  return {
    puzzle,
    finale,
    board,
    won,
    mistakes,
    hints,
    hint,
    elapsed,
    clues,
    target,
    filled,
    start,
    restore,
    reset,
    clear,
    undo,
    redo,
    askHint,
    dismissHint,
  };
}
