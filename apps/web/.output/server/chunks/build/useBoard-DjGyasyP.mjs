import { b as useI18n } from '../virtual/entry.mjs';
import { s as ssrRenderList$2 } from './Icon-BotjH7zm.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-DjkACiAr.mjs';
import { l as lineClues } from './src-iCRH6kH_.mjs';
import { y as defineComponent, n as ssrRenderAttrs, W as mergeProps, a4 as ssrRenderStyle, m as ssrRenderComponent, $ as ssrRenderAttr, u as unref, a0 as ssrRenderClass, x as computed, l as ref, v as shallowRef, N as ssrInterpolate, Z as useSSRContext } from '../_/vue.mjs';

// app/domain/grid.ts
function createGrid(width, height) {
	return Array.from({ length: height }, () => Array(width).fill("blank"));
}
function cloneGrid(grid) {
	return grid.map((row) => [...row]);
}
function getColumn(grid, col) {
	return grid.map((row) => row[col] ?? "blank");
}
function countFilled(grid) {
	let total = 0;
	for (const row of grid) for (const cell of row) if (cell === "filled") total++;
	return total;
}
function toSolution(grid) {
	return grid.map((row) => row.map((cell) => cell === "filled"));
}
/** Blocs consécutifs de cases pleines dans une ligne jouée. */
function lineRuns(line) {
	return lineClues(line.map((cell) => cell === "filled"));
}
var sameRuns = (a, b) => a.length === b.length && a.every((value, index) => value === b[index]);
/** Une ligne est résolue quand ses blocs correspondent exactement à ses indices. */
function isLineSolved(line, clues) {
	return sameRuns(lineRuns(line), clues);
}
/** Toutes les lignes et colonnes respectent leurs indices (toute solution valide est acceptée). */
function isSolved(grid, clues) {
	return clues.rows.every((rowClues, row) => isLineSolved(grid[row] ?? [], rowClues)) && clues.cols.every((colClues, col) => isLineSolved(getColumn(grid, col), colClues));
}
/**
* Pour chaque indice, `true` si le bloc correspondant (dans l'ordre) est déjà posé avec la bonne
* longueur : l'indice est alors grisé pour guider le joueur.
*/
function clueStatus(line, clues) {
	const runs = lineRuns(line);
	return clues.map((value, index) => runs[index] === value);
}
// app/components/ClueLine.vue?vue&type=script&setup=true&lang.ts
var ClueLine_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ClueLine",
	__ssrInlineRender: true,
	props: {
		clues: {},
		done: {},
		direction: {},
		active: { type: Boolean }
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["clue-line flex items-center justify-end rounded-sm font-semibold tabular-nums transition-colors", [__props.direction === "col" ? "flex-col" : "flex-row px-[calc(var(--cell)*.1)]", __props.active ? "bg-blue-100 dark:bg-slate-800" : ""]] }, _attrs))} data-v-5bc4dde5><!--[-->`);
			ssrRenderList$2(__props.clues.length ? __props.clues : [0], (value, index) => {
				_push(`<span class="${ssrRenderClass([__props.done?.[index] ? "opacity-30" : "", "clue-number flex items-center justify-center transition-opacity"])}" data-v-5bc4dde5>${ssrInterpolate(value)}</span>`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
// app/components/ClueLine.vue
var _sfc_setup$1 = ClueLine_vue_vue_type_script_setup_true_lang_default.setup;
ClueLine_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ClueLine.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ClueLine_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(ClueLine_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-5bc4dde5"]]), { __name: "ClueLine" });
// app/components/Board.vue?vue&type=script&setup=true&lang.ts
var Board_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Board",
	__ssrInlineRender: true,
	props: {
		cells: {},
		rowClues: {},
		colClues: {},
		tool: {},
		interactive: { type: Boolean },
		allowCross: { type: Boolean },
		showProgress: { type: Boolean }
	},
	emits: [
		"strokeStart",
		"strokeMove",
		"strokeEnd",
		"cellAction",
		"undo"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { t } = useI18n();
		const height = computed(() => props.cells.length);
		const width = computed(() => props.cells[0]?.length ?? 0);
		const vars = computed(() => ({
			"--cols": width.value,
			"--rows": height.value,
			"--row-slots": Math.max(1, ...props.rowClues.map((c) => c.length)),
			"--col-slots": Math.max(1, ...props.colClues.map((c) => c.length))
		}));
		const rowDone = computed(() => props.showProgress ? props.rowClues.map((clues, row) => clueStatus(props.cells[row] ?? [], clues)) : []);
		const colDone = computed(() => props.showProgress ? props.colClues.map((clues, col) => clueStatus(getColumn(props.cells, col), clues)) : []);
		const hover = ref(null);
		const cursor = ref({
			row: 0,
			col: 0
		});
		const focused = ref(false);
		/** Le curseur clavier n'est visible que si on navigue au clavier (pas après un clic). */
		const keyboardMode = ref(false);
		function cellClass(state, row, col) {
			const classes = [];
			if (state === "filled") classes.push("bg-blue-600 dark:bg-blue-500");
			else if (hover.value && (hover.value.row === row || hover.value.col === col)) classes.push("bg-blue-50 dark:bg-slate-800");
			else classes.push("bg-white dark:bg-slate-900");
			if (col > 0 && col % 5 === 0) classes.push("ml-[2px]");
			if (row > 0 && row % 5 === 0) classes.push("mt-[2px]");
			if (focused.value && keyboardMode.value && cursor.value.row === row && cursor.value.col === col) classes.push("relative z-10 outline-2 -outline-offset-2 outline-amber-500");
			return classes;
		}
		const stateLabel = (state) => t(`game.state.${state}`);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "board-frame" }, _attrs))} data-v-d56994e0><div class="board" style="${ssrRenderStyle(vars.value)}" data-v-d56994e0><div class="board-col-clues" aria-hidden="true" data-v-d56994e0><!--[-->`);
			ssrRenderList$2(__props.colClues, (clues, col) => {
				_push(ssrRenderComponent(ClueLine_default, {
					key: col,
					direction: "col",
					clues,
					done: colDone.value[col],
					active: hover.value?.col === col
				}, null, _parent));
			});
			_push(`<!--]--></div><div class="board-row-clues" aria-hidden="true" data-v-d56994e0><!--[-->`);
			ssrRenderList$2(__props.rowClues, (clues, row) => {
				_push(ssrRenderComponent(ClueLine_default, {
					key: row,
					direction: "row",
					clues,
					done: rowDone.value[row],
					active: hover.value?.row === row
				}, null, _parent));
			});
			_push(`<!--]--></div><div class="board-cells" role="grid" tabindex="0"${ssrRenderAttr("aria-label", unref(t)("game.boardLabel", {
				width: width.value,
				height: height.value
			}))}${ssrRenderAttr("aria-readonly", !__props.interactive)} data-v-d56994e0><!--[-->`);
			ssrRenderList$2(__props.cells, (line, row) => {
				_push(`<div role="row" class="contents" data-v-d56994e0><!--[-->`);
				ssrRenderList$2(line, (state, col) => {
					_push(`<div role="gridcell" class="${ssrRenderClass([cellClass(state, row, col), "flex items-center justify-center"])}"${ssrRenderAttr("aria-label", `${unref(t)("game.cell", {
						row: row + 1,
						col: col + 1
					})}, ${stateLabel(state)}`)} data-v-d56994e0>`);
					if (state === "crossed") _push(`<svg class="size-[60%] text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true" data-v-d56994e0><path d="M18 6 6 18M6 6l12 12" data-v-d56994e0></path></svg>`);
					else _push(`<!---->`);
					_push(`</div>`);
				});
				_push(`<!--]--></div>`);
			});
			_push(`<!--]--></div></div></div>`);
		};
	}
});
// app/components/Board.vue
var _sfc_setup = Board_vue_vue_type_script_setup_true_lang_default.setup;
Board_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Board.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Board_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(Board_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-d56994e0"]]), { __name: "Board" });
// app/domain/stroke.ts
function beginStroke(grid, origin, tool) {
	const source = grid[origin.row]?.[origin.col] ?? "blank";
	return {
		origin,
		brush: source === tool ? "blank" : tool,
		source,
		axis: null,
		snapshot: cloneGrid(grid)
	};
}
/** Grille obtenue en peignant du point de départ jusqu'à `to`. Verrouille l'axe au premier écart. */
function strokeTo(stroke, to) {
	const { origin, snapshot } = stroke;
	const next = cloneGrid(snapshot);
	const height = snapshot.length;
	const width = snapshot[0]?.length ?? 0;
	const dRow = to.row - origin.row;
	const dCol = to.col - origin.col;
	if (stroke.axis === null && (dRow !== 0 || dCol !== 0)) stroke.axis = Math.abs(dCol) >= Math.abs(dRow) ? "row" : "col";
	const length = stroke.axis === "col" ? dRow : dCol;
	const step = Math.sign(length) || 1;
	for (let i = 0; i <= Math.abs(length); i++) {
		const row = stroke.axis === "col" ? origin.row + i * step : origin.row;
		const col = stroke.axis === "col" ? origin.col : origin.col + i * step;
		if (row < 0 || col < 0 || row >= height || col >= width) continue;
		if (snapshot[row][col] === stroke.source) next[row][col] = stroke.brush;
	}
	return next;
}
function gridsEqual(a, b) {
	return a.length === b.length && a.every((row, r) => row.every((cell, c) => cell === b[r]?.[c]));
}
// app/composables/useBoard.ts
/**
* État d'une grille en cours d'édition : cases, historique d'annulation et gestion des traits.
* La grille est immuable (on la remplace à chaque changement) pour rester simple à observer.
*/
function useBoard(initial, options = {}) {
	const cells = shallowRef(initial);
	const history = shallowRef([]);
	const tool = ref("filled");
	let stroke = null;
	let lastKey = "";
	const canUndo = computed(() => history.value.length > 0);
	const isLocked = () => options.locked?.value === true;
	function commit(next) {
		cells.value = next;
		options.onChange?.(next);
	}
	function begin(pos, forcedTool = tool.value) {
		if (isLocked()) return;
		stroke = beginStroke(cells.value, pos, forcedTool);
		lastKey = "";
		move(pos);
	}
	function move(pos) {
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
		if (stroke && !gridsEqual(stroke.snapshot, cells.value)) history.value = [...history.value.slice(-199), stroke.snapshot];
		stroke = null;
	}
	/** Action sur une seule case (clavier). */
	function toggleAt(pos, forcedTool = tool.value) {
		begin(pos, forcedTool);
		end();
	}
	function undo() {
		const previous = history.value.at(-1);
		if (!previous || isLocked()) return false;
		history.value = history.value.slice(0, -1);
		commit(cloneGrid(previous));
		return true;
	}
	/** Mémorise l'état courant pour qu'une modification globale (redimensionnement…) soit annulable. */
	function checkpoint() {
		history.value = [...history.value.slice(-199), cells.value];
	}
	/** Remplace la grille (nouvelle partie, redimensionnement…). */
	function load(grid, { keepHistory = false } = {}) {
		stroke = null;
		if (!keepHistory) history.value = [];
		commit(grid);
	}
	return {
		cells,
		tool,
		canUndo,
		begin,
		move,
		end,
		toggleAt,
		undo,
		checkpoint,
		load
	};
}

export { Board_default as B, countFilled as a, createGrid as c, isSolved as i, toSolution as t, useBoard as u };
//# sourceMappingURL=useBoard-DjGyasyP.mjs.map
