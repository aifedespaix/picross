<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { clampPos } from '@/domain/geometry';
import { clueStatus, getColumn, type CellState, type Grid, type Pos } from '@/domain/grid';
import type { Tool } from '@/domain/stroke';
import { IDENTITY, panBy, zoomAt, type Layout, type View } from '@/domain/zoom';
import ClueLine from './ClueLine.vue';
import Icon from './Icon.vue';

const props = defineProps<{
  cells: Grid;
  rowClues: number[][];
  colClues: number[][];
  tool: Tool;
  /** `false` : affichage seul (grille résolue, aperçu…). */
  interactive: boolean;
  /** Autorise l'outil croix (désactivé dans l'éditeur). */
  allowCross: boolean;
  /** Grise les indices satisfaits (mode jeu uniquement). */
  showProgress: boolean;
  /** Ligne ou colonne mise en avant par un indice. */
  highlight?: { axis: 'row' | 'col'; index: number } | null;
}>();

const emit = defineEmits<{
  strokeStart: [pos: Pos, tool: Tool];
  strokeMove: [pos: Pos];
  strokeEnd: [];
  /** Un second doigt est arrivé : le trait commencé était un pincement, pas un dessin. */
  strokeCancel: [];
  cellAction: [pos: Pos, tool: Tool];
  undo: [];
}>();

const { t } = useI18n();

const height = computed(() => props.cells.length);
const width = computed(() => props.cells[0]?.length ?? 0);

const vars = computed(() => ({
  '--cols': width.value,
  '--rows': height.value,
  '--row-slots': Math.max(1, ...props.rowClues.map((c) => c.length)),
  '--col-slots': Math.max(1, ...props.colClues.map((c) => c.length)),
}));

const rowDone = computed(() =>
  props.showProgress
    ? props.rowClues.map((clues, row) => clueStatus(props.cells[row] ?? [], clues))
    : [],
);
const colDone = computed(() =>
  props.showProgress
    ? props.colClues.map((clues, col) => clueStatus(getColumn(props.cells, col), clues))
    : [],
);

// --- Pointeur -------------------------------------------------------------
const frameEl = ref<HTMLElement>();
const boardEl = ref<HTMLElement>();
const gridEl = ref<HTMLElement>();
const hover = ref<Pos | null>(null);
const cursor = ref<Pos>({ row: 0, col: 0 });
const focused = ref(false);
/** Le curseur clavier n'est visible que si on navigue au clavier (pas après un clic). */
const keyboardMode = ref(false);
let dragging = false;
let mouseDrag = true;

// --- Zoom (pincement à deux doigts, Ctrl + molette) --------------------------
const view = ref<View>({ ...IDENTITY });
const zoomed = computed(() => view.value.scale > 1.001);
const pointers = new Map<number, { x: number; y: number }>();
let pinch: { dist: number; x: number; y: number } | null = null;

function layout(): Layout | null {
  const frame = frameEl.value;
  const board = boardEl.value;
  if (!frame || !board) return null;
  return {
    board: {
      left: board.offsetLeft,
      top: board.offsetTop,
      width: board.offsetWidth,
      height: board.offsetHeight,
    },
    frame: { width: frame.clientWidth, height: frame.clientHeight },
  };
}

function relativeToFrame(clientX: number, clientY: number) {
  const rect = frameEl.value?.getBoundingClientRect();
  return { x: clientX - (rect?.left ?? 0), y: clientY - (rect?.top ?? 0) };
}

function resetZoom() {
  view.value = { ...IDENTITY };
}
// Une autre grille (ou un autre format) repart à l'échelle 1.
watch([width, height], resetZoom);

function pinchState() {
  const [a, b] = [...pointers.values()];
  if (!a || !b) return null;
  return { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function onWheel(event: WheelEvent) {
  const l = layout();
  if (!l || !props.interactive) return;
  if (event.ctrlKey) {
    // Pincement du pavé tactile (ou Ctrl + molette) : zoom autour du curseur.
    event.preventDefault();
    const center = relativeToFrame(event.clientX, event.clientY);
    view.value = zoomAt(view.value, Math.exp(-event.deltaY * 0.01), center, l);
  } else if (zoomed.value) {
    event.preventDefault();
    view.value = panBy(view.value, -event.deltaX, -event.deltaY, l);
  }
}

function posFromEvent(event: PointerEvent): Pos | null {
  const rect = gridEl.value?.getBoundingClientRect();
  if (!rect || !rect.width || !rect.height) return null;
  // Calcul par coordonnées : fonctionne aussi pendant un glissé tactile (où le doigt reste
  // « capturé » par la première case) et ne dépend d'aucun gestionnaire par case.
  return clampPos(
    {
      col: Math.floor(((event.clientX - rect.left) / rect.width) * width.value),
      row: Math.floor(((event.clientY - rect.top) / rect.height) * height.value),
    },
    width.value,
    height.value,
  );
}

function onPointerDown(event: PointerEvent) {
  if (!props.interactive || (event.pointerType === 'mouse' && event.button > 2)) return;
  event.preventDefault();
  try {
    gridEl.value?.setPointerCapture?.(event.pointerId);
  } catch {
    // pointeur déjà relâché : sans capture, le glissé suit quand même via les coordonnées
  }
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (pointers.size >= 2) {
    // Deuxième doigt : on abandonne le trait du premier et on passe en zoom / déplacement.
    if (dragging) {
      dragging = false;
      emit('strokeCancel');
    }
    hover.value = null;
    pinch = pinchState();
    return;
  }
  const pos = posFromEvent(event);
  if (!pos) return;
  keyboardMode.value = false;
  mouseDrag = event.pointerType === 'mouse';
  dragging = true;
  cursor.value = pos;
  // Au doigt, la case est cachée : on éclaire sa ligne et sa colonne (et leurs indices).
  if (!mouseDrag) hover.value = pos;
  const secondary = event.pointerType === 'mouse' && event.button === 2;
  emit('strokeStart', pos, secondary && props.allowCross ? 'crossed' : props.tool);
}

function onPointerMove(event: PointerEvent) {
  if (pointers.has(event.pointerId)) {
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  }
  if (pinch) {
    const now = pinchState();
    const l = layout();
    if (now && l) {
      const center = relativeToFrame(pinch.x, pinch.y);
      let next = zoomAt(view.value, now.dist / pinch.dist, center, l);
      next = panBy(next, now.x - pinch.x, now.y - pinch.y, l);
      view.value = next;
      pinch = now;
    }
    return;
  }
  const pos = posFromEvent(event);
  if (event.pointerType === 'mouse' || dragging) hover.value = pos;
  if (dragging && pos) emit('strokeMove', pos);
}

function endDrag(event?: PointerEvent) {
  if (event) pointers.delete(event.pointerId);
  if (pointers.size < 2) pinch = null;
  if (!dragging) return;
  dragging = false;
  if (!mouseDrag) hover.value = null;
  emit('strokeEnd');
}

function onFocus() {
  focused.value = true;
  // Focus obtenu au clavier (Tab) : on affiche le curseur tout de suite.
  if (gridEl.value?.matches(':focus-visible')) keyboardMode.value = true;
}

// --- Clavier --------------------------------------------------------------
function onKeyDown(event: KeyboardEvent) {
  if (!props.interactive) return;
  keyboardMode.value = true;
  const { row, col } = cursor.value;
  const key = event.key.toLowerCase();
  const move = (dRow: number, dCol: number) => {
    cursor.value = clampPos({ row: row + dRow, col: col + dCol }, width.value, height.value);
    event.preventDefault();
  };

  if (key === 'arrowup') move(-1, 0);
  else if (key === 'arrowdown') move(1, 0);
  else if (key === 'arrowleft') move(0, -1);
  else if (key === 'arrowright') move(0, 1);
  else if (key === ' ' || key === 'enter') {
    emit(
      'cellAction',
      cursor.value,
      props.tool === 'crossed' && props.allowCross ? 'crossed' : 'filled',
    );
    event.preventDefault();
  } else if (key === 'x' && props.allowCross) {
    emit('cellAction', cursor.value, 'crossed');
    event.preventDefault();
  } else if (key === 'backspace' || key === 'delete') {
    const state = props.cells[row]?.[col];
    if (state && state !== 'blank') emit('cellAction', cursor.value, state);
    event.preventDefault();
  } else if (key === 'z' && (event.ctrlKey || event.metaKey) && !event.shiftKey) {
    emit('undo');
    event.preventDefault();
  }
}

// --- Rendu des cases ------------------------------------------------------
function cellClass(state: CellState, row: number, col: number): string[] {
  const classes: string[] = [];
  const hinted =
    props.highlight &&
    (props.highlight.axis === 'row'
      ? props.highlight.index === row
      : props.highlight.index === col);
  if (state === 'filled') classes.push('bg-ink dark:bg-pearl');
  else if (hinted) classes.push('bg-amber-100 dark:bg-amber-900/40');
  else if (hover.value && (hover.value.row === row || hover.value.col === col))
    classes.push('bg-slate-100 dark:bg-slate-800');
  else classes.push('bg-white dark:bg-slate-900');
  // Séparateurs plus épais toutes les 5 cases pour compter plus facilement.
  if (col > 0 && col % 5 === 0) classes.push('ml-[2px]');
  if (row > 0 && row % 5 === 0) classes.push('mt-[2px]');
  if (focused.value && keyboardMode.value && cursor.value.row === row && cursor.value.col === col)
    classes.push('relative z-10 outline-2 -outline-offset-2 outline-demon');
  return classes;
}

const stateLabel = (state: CellState) => t(`game.state.${state}`);
</script>

<template>
  <div ref="frameEl" class="board-frame" :class="{ 'has-zoom': zoomed }">
    <div
      ref="boardEl"
      class="board"
      :class="{ 'is-zoomed': zoomed }"
      :style="{
        ...vars,
        transform: zoomed ? `translate(${view.x}px, ${view.y}px) scale(${view.scale})` : undefined,
      }"
    >
      <div class="board-col-clues" aria-hidden="true">
        <ClueLine
          v-for="(clues, col) in colClues"
          :key="col"
          direction="col"
          :clues="clues"
          :done="colDone[col]"
          :active="hover?.col === col"
          :hinted="highlight?.axis === 'col' && highlight.index === col"
        />
      </div>
      <div class="board-row-clues" aria-hidden="true">
        <ClueLine
          v-for="(clues, row) in rowClues"
          :key="row"
          direction="row"
          :clues="clues"
          :done="rowDone[row]"
          :active="hover?.row === row"
          :hinted="highlight?.axis === 'row' && highlight.index === row"
        />
      </div>

      <div
        ref="gridEl"
        class="board-cells"
        role="grid"
        tabindex="0"
        :aria-label="t('game.boardLabel', { width, height })"
        :aria-readonly="!interactive"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="endDrag"
        @pointercancel="endDrag"
        @lostpointercapture="endDrag"
        @wheel="onWheel"
        @pointerleave="hover = null"
        @contextmenu.prevent
        @keydown="onKeyDown"
        @focus="onFocus"
        @blur="focused = false"
      >
        <div v-for="(line, row) in cells" :key="row" role="row" class="contents">
          <div
            v-for="(state, col) in line"
            :key="col"
            role="gridcell"
            class="flex items-center justify-center"
            :class="cellClass(state, row, col)"
            :aria-label="`${t('game.cell', { row: row + 1, col: col + 1 })}, ${stateLabel(state)}`"
          >
            <svg
              v-if="state === 'crossed'"
              class="size-[60%] text-slate-400 dark:text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="zoomed"
      type="button"
      class="zoom-reset btn btn-icon"
      :aria-label="t('game.resetZoom')"
      :title="t('game.resetZoom')"
      @click="resetZoom"
    >
      <Icon name="shrink" />
    </button>
  </div>
</template>

<style scoped>
@reference '../assets/css/main.css';
/* Le cadre mesure l'espace disponible ; la taille d'une case en découle (unités de conteneur). */
.board-frame {
  container-type: size;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  position: relative;
}
/* Rogner seulement quand on zoome ; au repos, rien ne doit être coupé. */
.board-frame.has-zoom {
  overflow: hidden;
}

.zoom-reset {
  position: absolute;
  right: 4px;
  bottom: 4px;
  z-index: 5;
  opacity: 0.85;
}

.board {
  --cell: clamp(
    12px,
    min(
      calc(100cqw / (var(--cols) + var(--row-slots) * 0.6 + 0.5)),
      calc(100cqh / (var(--rows) + var(--col-slots) * 0.6 + 0.3))
    ),
    72px
  );
  display: grid;
  grid-template-columns: auto calc(var(--cell) * var(--cols));
  grid-template-rows: auto calc(var(--cell) * var(--rows));
  grid-template-areas:
    '. cols'
    'rows cells';
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transform-origin: 0 0;
}
.board.is-zoomed {
  will-change: transform;
}

.board-col-clues {
  grid-area: cols;
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  align-items: end;
}
.board-row-clues {
  grid-area: rows;
  display: grid;
  grid-template-rows: repeat(var(--rows), 1fr);
}

.board-cells {
  grid-area: cells;
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  grid-auto-rows: 1fr;
  gap: 1px;
  /* La couleur du fond « fuit » dans les gouttières : ce sont les lignes de la grille. */
  @apply bg-slate-300 dark:bg-slate-600;
  border: 2px solid;
  @apply border-slate-400 dark:border-slate-500;
  box-sizing: content-box;
  margin: -2px;
  touch-action: none; /* le glissé sur la grille ne fait pas défiler la page */
  outline-offset: 4px;
}
</style>
