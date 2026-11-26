import { computed, ref, shallowRef, type Ref } from 'vue';
import { cloneGrid, type CellState, type Grid, type Pos } from '@/domain/grid';
import { beginStroke, gridsEqual, strokeTo, type Stroke, type Tool } from '@/domain/stroke';

const HISTORY_LIMIT = 200;

export interface BoardOptions {
  /** Quand `true` (grille résolue…), plus aucune modification n'est acceptée. */
  locked?: Ref<boolean>;
  /** Appelé à chaque modification, avec le nouvel état de chaque case modifiée (pour le son). */
  onPaint?: (states: CellState[]) => void;
  /** Complète chaque grille calculée par un trait (ex. croix automatiques) ; doit être pure. */
  transform?: (grid: Grid) => Grid;
  /** Appelé après chaque modification de la grille. */
  onChange?: (grid: Grid) => void;
}

/** Nouvel état de chaque case qui diffère entre deux grilles. */
function changedStates(before: Grid, after: Grid): CellState[] {
  const states: CellState[] = [];
  after.forEach((line, row) =>
    line.forEach((state, col) => {
      if (state !== before[row]?.[col]) states.push(state);
    }),
  );
  return states;
}

/**
 * État d'une grille en cours d'édition : cases, historique d'annulation et gestion des traits.
 * La grille est immuable (on la remplace à chaque changement) pour rester simple à observer.
 */
export function useBoard(initial: Grid, options: BoardOptions = {}) {
  const cells = shallowRef<Grid>(initial);
  const history = shallowRef<Grid[]>([]);
  /** États annulés, que « rétablir » peut rejouer ; vidé dès qu'une nouvelle modification est faite. */
  const future = shallowRef<Grid[]>([]);
  const tool = ref<Tool>('filled');
  let stroke: Stroke | null = null;
  let lastKey = '';

  const canUndo = computed(() => history.value.length > 0);
  const canRedo = computed(() => future.value.length > 0);
  const isLocked = () => options.locked?.value === true;

  function commit(next: Grid) {
    cells.value = next;
    options.onChange?.(next);
  }

  function begin(pos: Pos, forcedTool: Tool = tool.value) {
    if (isLocked()) return;
    stroke = beginStroke(cells.value, pos, forcedTool);
    lastKey = '';
    move(pos);
  }

  function move(pos: Pos) {
    if (!stroke || isLocked()) return;
    const key = `${pos.row}:${pos.col}`;
    if (key === lastKey) return;
    lastKey = key;
    const next = (options.transform ?? ((grid) => grid))(strokeTo(stroke, pos));
    if (!gridsEqual(next, cells.value)) {
      options.onPaint?.(changedStates(cells.value, next));
      commit(next);
    }
  }

  function end() {
    if (stroke && !gridsEqual(stroke.snapshot, cells.value)) {
      history.value = [...history.value.slice(-(HISTORY_LIMIT - 1)), stroke.snapshot];
      future.value = [];
    }
    stroke = null;
  }

  /** Abandonne le trait en cours (ex. un second doigt arrive : c'était un pincement). */
  function cancel() {
    if (!stroke) return;
    const { snapshot } = stroke;
    stroke = null;
    if (!gridsEqual(snapshot, cells.value)) commit(snapshot);
  }

  /** Action sur une seule case (clavier). */
  function toggleAt(pos: Pos, forcedTool: Tool = tool.value) {
    begin(pos, forcedTool);
    end();
  }

  function undo(): boolean {
    const previous = history.value.at(-1);
    if (!previous || isLocked()) return false;
    history.value = history.value.slice(0, -1);
    future.value = [...future.value, cells.value];
    commit(cloneGrid(previous));
    return true;
  }

  function redo(): boolean {
    const following = future.value.at(-1);
    if (!following || isLocked()) return false;
    future.value = future.value.slice(0, -1);
    history.value = [...history.value.slice(-(HISTORY_LIMIT - 1)), cells.value];
    commit(cloneGrid(following));
    return true;
  }

  /** Mémorise l'état courant pour qu'une modification globale (redimensionnement…) soit annulable. */
  function checkpoint() {
    history.value = [...history.value.slice(-(HISTORY_LIMIT - 1)), cells.value];
    future.value = [];
  }

  /** Remplace la grille (nouvelle partie, redimensionnement…). */
  function load(grid: Grid, { keepHistory = false } = {}) {
    stroke = null;
    if (!keepHistory) {
      history.value = [];
      future.value = [];
    }
    commit(grid);
  }

  return {
    cells,
    tool,
    canUndo,
    canRedo,
    begin,
    move,
    end,
    cancel,
    toggleAt,
    undo,
    redo,
    checkpoint,
    load,
  };
}
