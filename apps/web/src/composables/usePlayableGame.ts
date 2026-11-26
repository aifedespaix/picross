import { useIntervalFn } from '@vueuse/core';
import {
  computeClues,
  countFilled as countSolution,
  fromBits,
  STARTER_PUZZLES,
  starterBits,
  type PicrossDetail,
} from '@picross/shared';
import { computed, ref, shallowRef } from 'vue';
import { countFilled, createGrid, isSolved, type CellState } from '@/domain/grid';
import { useBoard } from './useBoard';
import { useSound } from './useSound';

/** Grille jouable : soit renvoyée par l'API, soit locale (mode hors ligne). */
export type PlayablePuzzle = Pick<
  PicrossDetail,
  'id' | 'title' | 'map' | 'author' | 'likes' | 'likedByMe'
> & {
  local?: boolean;
};

export function localPuzzle(exclude?: string): PlayablePuzzle {
  const choices = STARTER_PUZZLES.map((puzzle, index) => ({ puzzle, id: `local-${index}` })).filter(
    (item) => item.id !== exclude,
  );
  const { puzzle, id } = choices[Math.floor(Math.random() * choices.length)]!;
  return {
    id,
    title: puzzle.title,
    map: starterBits(puzzle.rows),
    author: null,
    likes: 0,
    likedByMe: false,
    local: true,
  };
}

/** Logique d'une partie : plateau, minuteur, détection de victoire, sons. */
export function usePlayableGame() {
  const { play } = useSound();
  const puzzle = shallowRef<PlayablePuzzle | null>(null);
  const won = ref(false);
  const startedAt = ref<number | null>(null);
  const elapsed = ref(0);

  const solution = computed(() => (puzzle.value ? fromBits(puzzle.value.map) : []));
  const clues = computed(() => computeClues(solution.value));
  const target = computed(() => countSolution(solution.value));

  let lastSound = 0;
  const board = useBoard(createGrid(1, 1), {
    locked: won,
    onPaint(state: CellState) {
      const now = performance.now();
      if (now - lastSound < 40) return; // un son par case lors d'un glissé serait cacophonique
      lastSound = now;
      play(state === 'filled' ? 'fill' : state === 'crossed' ? 'cross' : 'clear');
    },
    onChange(grid) {
      startedAt.value ??= Date.now();
      if (isSolved(grid, clues.value)) {
        won.value = true;
        timer.pause();
        elapsed.value = Date.now() - (startedAt.value ?? Date.now());
        play('win');
      }
    },
  });

  const timer = useIntervalFn(
    () => {
      if (startedAt.value) elapsed.value = Date.now() - startedAt.value;
    },
    250,
    { immediate: false },
  );

  const filled = computed(() => countFilled(board.cells.value));

  function reset() {
    won.value = false;
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
    timer.resume();
  }

  function undo() {
    if (board.undo()) play(Math.random() > 0.5 ? 'undo' : 'undo2');
  }

  return { puzzle, board, won, elapsed, clues, target, filled, start, reset, undo };
}
