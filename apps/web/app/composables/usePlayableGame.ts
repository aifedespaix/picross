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
import { computed, ref, shallowRef } from 'vue';
import { countFilled, createGrid, isSolved, type CellState, type Grid } from '@/domain/grid';
import { useBoard } from './useBoard';
import { useCorruptionStore } from '@/stores/corruption';
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

/** Logique d'une partie : plateau, minuteur, détection de victoire, sons. */
export function usePlayableGame() {
  const { play, playBurst } = useSound();
  const corruption = useCorruptionStore();
  const puzzle = shallowRef<PlayablePuzzle | null>(null);
  const won = ref(false);
  const startedAt = ref<number | null>(null);
  const elapsed = ref(0);
  /** Nombre de fois où une case fausse a été remplie (0 = partie parfaite). */
  const mistakes = ref(0);
  let wrongNow = 0;

  const solution = computed(() => (puzzle.value ? fromBits(puzzle.value.map) : []));
  const clues = computed(() => computeClues(solution.value));
  const target = computed(() => countSolution(solution.value));

  const board = useBoard(createGrid(1, 1), {
    locked: won,
    onPaint(states: CellState[]) {
      // Un son par case modifiée : une ligne de 6 cases d'un coup s'entend comme 6 cases.
      const count = (wanted: CellState) => states.filter((state) => state === wanted).length;
      playBurst('fill', count('filled'));
      playBurst('cross', count('crossed'));
      playBurst('clear', count('blank'));
    },
    onChange(grid) {
      if (startedAt.value === null) {
        startedAt.value = Date.now();
        timer.resume(); // le minuteur ne tourne qu'après le premier coup (et jamais pendant le SSR)
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
        play('win');
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

  /** Efface la grille (avec le son de remise à zéro). */
  function clear() {
    play('clear');
    reset();
  }

  function reset() {
    won.value = false;
    mistakes.value = 0;
    wrongNow = 0;
    startedAt.value = null;
    elapsed.value = 0;
    timer.pause();
    const grid = puzzle.value
      ? createGrid(puzzle.value.map[0]?.length ?? 1, puzzle.value.map.length)
      : createGrid(1, 1);
    board.load(grid);
  }

  function start(next: PlayablePuzzle) {
    puzzle.value = next;
    reset();
  }

  function undo() {
    if (board.undo()) play(Math.random() > 0.5 ? 'undo' : 'undo2');
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
    reset,
    clear,
    undo,
  };
}
