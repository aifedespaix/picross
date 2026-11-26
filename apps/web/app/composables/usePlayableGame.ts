import { useIntervalFn } from '@vueuse/core';
import {
  computeClues,
  countFilled as countSolution,
  fromBits,
  rateDifficulty,
  STARTER_PUZZLES,
  starterBits,
  type PicrossDetail,
} from '@picross/shared';
import { computed, ref, shallowRef, watch } from 'vue';
import {
  autoCross,
  countFilled,
  createGrid,
  isSolved,
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

/** Grille locale (mode hors ligne) : l'une des grilles livrées avec l'application, dans la langue `lang`. */
export function localPuzzle(exclude?: string, lang: 'fr' | 'en' = 'fr'): PlayablePuzzle {
  const choices = STARTER_PUZZLES.map((puzzle, index) => ({ puzzle, id: `local-${index}` })).filter(
    (item) => item.id !== exclude,
  );
  const { puzzle, id } = choices[Math.floor(Math.random() * choices.length)]!;
  const map = starterBits(puzzle.rows);
  return {
    id,
    title: puzzle[lang],
    map,
    difficulty: rateDifficulty(fromBits(map)).level,
    author: null,
    likes: 0,
    likedByMe: false,
    local: true,
  };
}

/** Logique d'une partie : plateau, minuteur, détection de victoire, sons, sauvegarde. */
export function usePlayableGame() {
  const { play, playBurst } = useSound();
  const corruption = useCorruptionStore();
  const settings = useSettingsStore();
  const puzzle = shallowRef<PlayablePuzzle | null>(null);
  const won = ref(false);
  const startedAt = ref<number | null>(null);
  const elapsed = ref(0);
  /** Nombre de fois où une case fausse a été remplie (0 = partie parfaite). */
  const mistakes = ref(0);
  let wrongNow = 0;
  /** Pendant la restauration d'une sauvegarde : ni erreur comptée, ni victoire, ni sauvegarde. */
  let restoring = false;

  const solution = computed(() => (puzzle.value ? fromBits(puzzle.value.map) : []));
  const clues = computed(() => computeClues(solution.value));
  const target = computed(() => countSolution(solution.value));

  /** Le minuteur ne tourne qu'après le premier coup (et jamais pendant le SSR). */
  function startTimer() {
    if (startedAt.value !== null) return;
    startedAt.value = Date.now() - elapsed.value;
    timer.resume();
  }

  const board = useBoard(createGrid(1, 1), {
    locked: won,
    transform: (grid) => (settings.autoCross ? autoCross(grid, clues.value) : grid),
    onPaint(states: CellState[]) {
      startTimer();
      // Un son par case modifiée : une ligne de 6 cases d'un coup s'entend comme 6 cases.
      const count = (wanted: CellState) => states.filter((state) => state === wanted).length;
      playBurst('fill', count('filled'));
      playBurst('cross', count('crossed'));
      playBurst('clear', count('blank'));
      if (settings.haptics) vibrate(8);
    },
    onChange(grid) {
      if (restoring) {
        wrongNow = countWrong(grid);
        return;
      }
      const wrong = countWrong(grid);
      if (wrong > wrongNow) {
        mistakes.value += wrong - wrongNow;
        corruption.bump();
      }
      wrongNow = wrong;
      if (isSolved(grid, clues.value)) {
        won.value = true;
        corruption.purify(mistakes.value === 0);
        timer.pause();
        elapsed.value = Date.now() - (startedAt.value ?? Date.now());
        if (puzzle.value) clearGame(puzzle.value.id);
        play('win');
        if (settings.haptics) vibrate([30, 50, 30, 50, 120]);
      } else {
        persist();
      }
    },
  });

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
    wrongNow = 0;
    startedAt.value = null;
    elapsed.value = 0;
    timer.pause();
    // Chargement « silencieux » : il ne doit pas écraser la sauvegarde que `restore` va relire.
    restoring = true;
    try {
      board.load(blankGrid());
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
      elapsed.value = saved.elapsed;
      startedAt.value = null;
      board.load(saved.cells);
    } finally {
      restoring = false;
    }
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
    board,
    won,
    mistakes,
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
  };
}
