import { computed, ref, shallowRef, type Ref } from 'vue';
import { cloneGrid, type CellState, type Grid, type Pos } from '@/domain/grid';
import { beginStroke, gridsEqual, strokeTo, type Stroke, type Tool } from '@/domain/stroke';

const HISTORY_LIMIT = 200;

export interface BoardOptions {
  /** Quand `true` (grille résolue…), plus aucune modification n'est acceptée. */
  locked?: Ref<boolean>;
  /** Appelé à chaque case modifiée, avec l'état posé (pour le son). */
  onPaint?: (state: CellState) => void;
  /** Appelé après chaque modification de la grille. */
  onChange?: (grid: Grid) => void;
}

/**
 * État d'une grille en cours d'édition : cases, historique d'annulation et gestion des traits.
 * La grille est immuable (on la remplace à chaque changement) pour rester simple à observer.
 */
export function useBoard(initial: Grid, options: BoardOptions = {}) {
  const cells = shallowRef<Grid>(initial);
  const history = shallowRef<Grid[]>([]);
  const tool = ref<Tool>('filled');
  let stroke: Stroke | null = null;
  let lastKey = '';

  const canUndo = computed(() => history.value.length > 0);
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
    const next = strokeTo(stroke, pos);
    if (!gridsEqual(next, cells.value)) {
      options.onPaint?.(stroke.brush);
      commit(next);
    }
  }

  function end() {
    if (stroke && !gridsEqual(stroke.snapshot, cells.value)) {
      history.value = [...history.value.slice(-(HISTORY_LIMIT - 1)), stroke.snapshot];
    }
    stroke = null;
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
    commit(cloneGrid(previous));
    return true;
  }

  /** Mémorise l'état courant pour qu'une modification globale (redimensionnement…) soit annulable. */
  function checkpoint() {
    history.value = [...history.value.slice(-(HISTORY_LIMIT - 1)), cells.value];
  }

  /** Remplace la grille (nouvelle partie, redimensionnement…). */
  function load(grid: Grid, { keepHistory = false } = {}) {
    stroke = null;
    if (!keepHistory) history.value = [];
    commit(grid);
  }

  return { cells, tool, canUndo, begin, move, end, toggleAt, undo, checkpoint, load };
}
