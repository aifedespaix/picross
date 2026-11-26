import { b as useI18n } from '../virtual/entry.mjs';
import { s as ssrRenderList$2 } from './Icon-BotjH7zm.mjs';
import { g as gridWidth, b as gridHeight, a as computeClues } from './src-BGkmTxkQ.mjs';
import { y as defineComponent, n as ssrRenderAttrs, W as mergeProps, u as unref, a0 as ssrRenderClass, N as ssrInterpolate, x as computed, Z as useSSRContext } from '../_/vue.mjs';

// ../../packages/shared/src/solver.ts
var UNKNOWN = 0;
var FILLED = 1;
var EMPTY = 2;
/**
* Raisonne sur UNE ligne : parmi tous les placements des blocs compatibles avec ce qu'on sait déjà,
* quelles cases sont forcément pleines / forcément vides ? Renvoie `null` en cas de contradiction.
*/
function solveLine(line, clues) {
	const n = line.length;
	const canFill = new Array(n).fill(false);
	const canEmpty = new Array(n).fill(false);
	const placement = new Array(n).fill(false);
	let found = false;
	const suffixLength = new Array(clues.length + 1).fill(0);
	for (let k = clues.length - 1; k >= 0; k--) suffixLength[k] = suffixLength[k + 1] + clues[k] + 1;
	const record = () => {
		found = true;
		for (let i = 0; i < n; i++) if (placement[i]) canFill[i] = true;
		else canEmpty[i] = true;
	};
	const place = (k, from) => {
		if (k === clues.length) {
			for (let i = from; i < n; i++) if (line[i] === FILLED) return;
			for (let i = from; i < n; i++) placement[i] = false;
			record();
			return;
		}
		const len = clues[k];
		for (let start = from; start + suffixLength[k] - 1 <= n; start++) {
			let ok = true;
			for (let i = from; i < start; i++) if (line[i] === FILLED) ok = false;
			if (!ok) break;
			for (let i = start; i < start + len; i++) if (line[i] === EMPTY) ok = false;
			if (start + len < n && line[start + len] === FILLED) ok = false;
			if (!ok) continue;
			for (let i = from; i < start; i++) placement[i] = false;
			for (let i = start; i < start + len; i++) placement[i] = true;
			if (start + len < n) placement[start + len] = false;
			place(k + 1, Math.min(n, start + len + 1));
		}
	};
	place(0, 0);
	if (!found) return null;
	return line.map((cell, i) => {
		if (cell !== UNKNOWN) return cell;
		if (canFill[i] && !canEmpty[i]) return FILLED;
		if (canEmpty[i] && !canFill[i]) return EMPTY;
		return UNKNOWN;
	});
}
function solveByLogic(solution) {
	const height = gridHeight(solution);
	const width = gridWidth(solution);
	const clues = computeClues(solution);
	const grid = Array.from({ length: height }, () => new Array(width).fill(UNKNOWN));
	let rounds = 0;
	for (let changed = true; changed;) {
		changed = false;
		rounds++;
		for (let row = 0; row < height; row++) {
			const next = solveLine(grid[row], clues.rows[row]);
			if (!next) return {
				solved: false,
				rounds,
				unknown: -1
			};
			next.forEach((cell, col) => {
				if (cell !== grid[row][col]) {
					grid[row][col] = cell;
					changed = true;
				}
			});
		}
		for (let col = 0; col < width; col++) {
			const next = solveLine(grid.map((r) => r[col]), clues.cols[col]);
			if (!next) return {
				solved: false,
				rounds,
				unknown: -1
			};
			next.forEach((cell, row) => {
				if (cell !== grid[row][col]) {
					grid[row][col] = cell;
					changed = true;
				}
			});
		}
	}
	const unknown = grid.flat().filter((cell) => cell === UNKNOWN).length;
	return {
		solved: unknown === 0,
		rounds,
		unknown
	};
}
var DIFFICULTIES = [
	"easy",
	"medium",
	"hard",
	"expert"
];
/**
* Difficulté = taille de la grille, relevée d'un cran si le raisonnement ligne par ligne bloque
* (il faut alors faire des hypothèses) ou si beaucoup de passes sont nécessaires.
*/
function rateDifficulty(solution) {
	const area = gridWidth(solution) * gridHeight(solution);
	const { solved, rounds } = solveByLogic(solution);
	let index = area <= 56 ? 0 : area <= 100 ? 1 : area <= 150 ? 2 : 3;
	if (!solved || rounds >= 9) index = Math.min(3, index + 1);
	return {
		level: DIFFICULTIES[index],
		logical: solved,
		rounds
	};
}
// app/components/DifficultyBadge.vue?vue&type=script&setup=true&lang.ts
var DifficultyBadge_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DifficultyBadge",
	__ssrInlineRender: true,
	props: { level: {} },
	setup(__props) {
		const props = __props;
		const { t } = useI18n();
		const rank = computed(() => DIFFICULTIES.indexOf(props.level) + 1);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({
				class: "inline-flex items-center gap-1.5 text-sm",
				title: unref(t)(`difficulty.${__props.level}`)
			}, _attrs))}><span class="inline-flex gap-0.5" aria-hidden="true"><!--[-->`);
			ssrRenderList$2(unref(DIFFICULTIES).length, (n) => {
				_push(`<span class="${ssrRenderClass([n <= unref(rank) ? "bg-slate-900 dark:bg-slate-100" : "bg-slate-300 dark:bg-slate-700", "size-2 rounded-full"])}"></span>`);
			});
			_push(`<!--]--></span><span>${ssrInterpolate(unref(t)(`difficulty.${__props.level}`))}</span></span>`);
		};
	}
});
// app/components/DifficultyBadge.vue
var _sfc_setup = DifficultyBadge_vue_vue_type_script_setup_true_lang_default.setup;
DifficultyBadge_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DifficultyBadge.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var DifficultyBadge_default = Object.assign(DifficultyBadge_vue_vue_type_script_setup_true_lang_default, { __name: "DifficultyBadge" });

export { DifficultyBadge_default as D, DIFFICULTIES as a, rateDifficulty as r };
//# sourceMappingURL=DifficultyBadge-Cs75_sYO.mjs.map
