import { b as useI18n, c as useApi, e as useRoute, a as useLocalePath, u as useAuthStore, f as useHead, s as ssrRenderNuxtLink, N as NuxtLink, A as ApiError, n as navigateTo, g as useIntervalFn, h as useSettingsStore } from '../virtual/entry.mjs';
import { u as useAsyncData } from './asyncData-DQ0_ggaq.mjs';
import { s as ssrRenderList$2, I as Icon_default } from './Icon-BotjH7zm.mjs';
import { B as BaseDialog_default } from './BaseDialog-Cxn5wOxQ.mjs';
import { B as Board_default, u as useBoard, c as createGrid, a as countFilled, i as isSolved } from './useBoard-DjGyasyP.mjs';
import { c as countFilled$1, a as computeClues, f as fromBits } from './src-iCRH6kH_.mjs';
import { y as defineComponent, _ as withAsyncContext, w as watch, n as ssrRenderAttrs, W as mergeProps, u as unref, N as ssrInterpolate, m as ssrRenderComponent, $ as ssrRenderAttr, a0 as ssrRenderClass, a1 as includeBooleanAttr, M as withCtx, O as createTextVNode, P as toDisplayString, B as createVNode, a2 as openBlock, a3 as createBlock, S as createCommentVNode, l as ref, x as computed, v as shallowRef, Z as useSSRContext } from '../_/vue.mjs';
import 'node:buffer';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'vue-router';
import '../nitro/nitro.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'node:events';
import 'node:crypto';
import 'nostics';
import 'pinia';
import './_plugin-vue_export-helper-DjkACiAr.mjs';
import 'zod';

// ../../packages/shared/src/starters.ts
/** Grilles livrées avec l'application (`#` = case pleine). Insérées au premier démarrage. */
var STARTER_PUZZLES = [
	{
		title: "Cœur",
		rows: [
			"..........",
			".###..###.",
			"##########",
			"##########",
			"##########",
			".########.",
			"..######..",
			"...####...",
			"....##....",
			".........."
		]
	},
	{
		title: "Maison",
		rows: [
			"....##....",
			"...####...",
			"..######..",
			".########.",
			"##########",
			".########.",
			".##.##.##.",
			".##.##.##.",
			".########.",
			".........."
		]
	},
	{
		title: "Sapin",
		rows: [
			"....##....",
			"...####...",
			"..######..",
			"...####...",
			"..######..",
			".########.",
			"##########",
			"....##....",
			"....##....",
			"...####..."
		]
	},
	{
		title: "Étoile",
		rows: [
			"....##....",
			"....##....",
			"...####...",
			"##########",
			".########.",
			"..######..",
			"..######..",
			".###..###.",
			".##....##.",
			"##......##"
		]
	},
	{
		title: "Sourire",
		rows: [
			"...####...",
			".########.",
			".########.",
			"##.####.##",
			"##########",
			"##########",
			"##.####.##",
			".###..###.",
			".########.",
			"...####..."
		]
	}
];
function starterBits(rows) {
	return rows.map((row) => [...row].map((char) => char === "#" ? 1 : 0));
}
// app/assets/audio/close.mp3
var close_default = __buildAssetsURL("close.DBEX-eAa.mp3");
// app/assets/audio/empty.mp3
var empty_default = __buildAssetsURL("empty.DfIc8Rlb.mp3");
// app/composables/useSound.ts
var URLS = {
	fill: __buildAssetsURL("value.DZKgfTrE.mp3"),
	cross: empty_default,
	clear: close_default,
	undo: __buildAssetsURL("undo.DD7jM576.mp3"),
	undo2: __buildAssetsURL("undo_2.D24FX4_f.mp3"),
	win: __buildAssetsURL("win.C62ATpsQ.mp3")
};
var cache = /* @__PURE__ */ new Map();
/** Les fichiers audio ne sont créés qu'à la première lecture (pas de chargement au démarrage). */
function useSound() {
	const settings = useSettingsStore();
	function play(name) {
		if (!settings.sound) return;
		let audio = cache.get(name);
		if (!audio) {
			audio = new Audio(URLS[name]);
			cache.set(name, audio);
		}
		audio.currentTime = 0;
		audio.play().catch(() => {});
	}
	return { play };
}
// app/composables/usePlayableGame.ts
function localPuzzle(exclude) {
	const choices = STARTER_PUZZLES.map((puzzle, index) => ({
		puzzle,
		id: `local-${index}`
	})).filter((item) => item.id !== exclude);
	const { puzzle, id } = choices[Math.floor(Math.random() * choices.length)];
	return {
		id,
		title: puzzle.title,
		map: starterBits(puzzle.rows),
		author: null,
		likes: 0,
		likedByMe: false,
		local: true
	};
}
/** Logique d'une partie : plateau, minuteur, détection de victoire, sons. */
function usePlayableGame() {
	const { play } = useSound();
	const puzzle = shallowRef(null);
	const won = ref(false);
	const startedAt = ref(null);
	const elapsed = ref(0);
	const solution = computed(() => puzzle.value ? fromBits(puzzle.value.map) : []);
	const clues = computed(() => computeClues(solution.value));
	const target = computed(() => countFilled$1(solution.value));
	let lastSound = 0;
	const board = useBoard(createGrid(1, 1), {
		locked: won,
		onPaint(state) {
			const now = performance.now();
			if (now - lastSound < 40) return;
			lastSound = now;
			play(state === "filled" ? "fill" : state === "crossed" ? "cross" : "clear");
		},
		onChange(grid) {
			if (startedAt.value === null) {
				startedAt.value = Date.now();
				timer.resume();
			}
			if (isSolved(grid, clues.value)) {
				won.value = true;
				timer.pause();
				elapsed.value = Date.now() - (startedAt.value ?? Date.now());
				play("win");
			}
		}
	});
	const timer = useIntervalFn(() => {
		if (startedAt.value) elapsed.value = Date.now() - startedAt.value;
	}, 250, { immediate: false });
	const filled = computed(() => countFilled(board.cells.value));
	function reset() {
		won.value = false;
		startedAt.value = null;
		elapsed.value = 0;
		timer.pause();
		const grid = puzzle.value ? createGrid(puzzle.value.map[0]?.length ?? 1, puzzle.value.map.length) : createGrid(1, 1);
		board.load(grid);
	}
	function start(next) {
		puzzle.value = next;
		reset();
	}
	function undo() {
		if (board.undo()) play(Math.random() > .5 ? "undo" : "undo2");
	}
	return {
		puzzle,
		board,
		won,
		elapsed,
		clues,
		target,
		filled,
		start,
		reset,
		undo
	};
}
// app/utils/format.ts
/** 83_000 ms -> « 1:23 ». */
function formatDuration(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}
// app/pages/play/[[id]].vue?vue&type=script&setup=true&lang.ts
/** Récupère une grille ; bascule sur une grille locale si l'API est injoignable ou vide. */
var __id___vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[[id]]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { t } = useI18n();
		const api = useApi();
		const route = useRoute();
		const localePath = useLocalePath();
		const auth = useAuthStore();
		const game = usePlayableGame();
		const status = ref("ready");
		const offline = ref(false);
		const winOpen = ref(false);
		const liking = ref(false);
		const isTouch = ref(false);
		const puzzle = computed(() => game.puzzle.value);
		const routeId = computed(() => typeof route.params.id === "string" ? route.params.id : void 0);
		async function fetchPuzzle(id, exclude) {
			try {
				return {
					puzzle: id ? await api.getPicross(id) : await api.randomPicross(exclude),
					offline: false
				};
			} catch (error) {
				const unreachable = error instanceof ApiError && error.isNetwork;
				const noPuzzleYet = !id && error instanceof ApiError && error.status === 404;
				if (!unreachable && !noPuzzleYet) return {
					puzzle: null,
					offline: false
				};
				return {
					puzzle: localPuzzle(exclude),
					offline: unreachable
				};
			}
		}
		function apply(result) {
			offline.value = result.offline;
			winOpen.value = false;
			if (!result.puzzle) {
				status.value = "error";
				return;
			}
			game.start(result.puzzle);
			status.value = "ready";
		}
		/** Chargements suivants (grille suivante, navigation) : côté client. */
		async function load(id, exclude) {
			status.value = "loading";
			apply(await fetchPuzzle(id, exclude));
			if (!id && puzzle.value && !puzzle.value.local) await navigateTo({ path: localePath({
				name: "play-id",
				params: { id: puzzle.value.id }
			}) }, { replace: true });
		}
		const { data: initial } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`puzzle:${routeId.value ?? "random"}`, () => fetchPuzzle(routeId.value))), __temp = await __temp, __restore(), __temp);
		if (initial.value) apply(initial.value);
		watch(routeId, (id) => {
			if (id && id !== puzzle.value?.id) load(id);
			if (!id) load();
		});
		watch(() => game.won.value, (won) => {
			if (won) winOpen.value = true;
		});
		const next = () => load(void 0, puzzle.value?.id);
		async function toggleLike() {
			const current = puzzle.value;
			if (!current || current.local || !auth.isLoggedIn || liking.value) return;
			liking.value = true;
			try {
				const updated = await api.likePicross(current.id, !current.likedByMe);
				game.puzzle.value = {
					...current,
					likes: updated.likes,
					likedByMe: updated.likedByMe
				};
			} finally {
				liking.value = false;
			}
		}
		const tools = [{
			id: "filled",
			icon: "pencil",
			label: "game.fill"
		}, {
			id: "crossed",
			icon: "x",
			label: "game.cross"
		}];
		useHead({
			title: () => puzzle.value ? t("seo.play.title", {
				title: puzzle.value.title,
				width: puzzle.value.map[0]?.length,
				height: puzzle.value.map.length
			}) : t("nav.play"),
			titleTemplate: "%s",
			meta: [
				{
					name: "description",
					content: () => t("seo.play.description", {
						title: puzzle.value?.title ?? "",
						width: puzzle.value?.map[0]?.length ?? 0,
						height: puzzle.value?.map.length ?? 0
					})
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					name: "robots",
					content: () => routeId.value ? "index, follow" : "noindex, follow"
				}
			]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto grid max-w-6xl gap-3 p-3 lg:grid-cols-[1fr_18rem] lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-4" }, _attrs))}><div class="space-y-2 lg:col-start-2 lg:row-start-1 lg:pt-4">`);
			if (unref(puzzle)) _push(`<!--[--><div><h1 class="truncate text-xl font-bold">${ssrInterpolate(unref(puzzle).title)}</h1><p class="text-sm text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(t)("common.size", {
				width: unref(puzzle).map[0]?.length,
				height: unref(puzzle).map.length
			}))} · ${ssrInterpolate(unref(puzzle).author ? unref(t)("common.by", { author: unref(puzzle).author }) : unref(t)("common.builtin"))}</p></div><dl class="grid grid-cols-2 gap-2 text-sm"><div class="card flex items-baseline justify-between gap-2 px-3 py-2 lg:block"><dt class="text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(t)("game.time"))}</dt><dd class="text-lg font-semibold tabular-nums">${ssrInterpolate(unref(formatDuration)(unref(game).elapsed.value))}</dd></div><div class="card flex items-baseline justify-between gap-2 px-3 py-2 lg:block"><dt class="text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(t)("game.cells"))}</dt><dd class="text-lg font-semibold tabular-nums">${ssrInterpolate(unref(game).filled.value)} / ${ssrInterpolate(unref(game).target.value)}</dd></div></dl><!--]-->`);
			else _push(`<!---->`);
			_push(`</div><section class="h-[min(calc(100vw-1.5rem),calc(100svh-21rem))] min-h-64 w-full lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-[calc(100svh-5.5rem)]">`);
			if (unref(status) === "loading") _push(`<p class="grid h-full place-items-center text-slate-500" role="status">${ssrInterpolate(unref(t)("common.loading"))}</p>`);
			else if (unref(status) === "error") _push(`<div class="grid h-full place-content-center gap-3 text-center"><p>${ssrInterpolate(unref(t)("game.loadError"))}</p><button type="button" class="btn btn-primary">${ssrInterpolate(unref(t)("common.retry"))}</button></div>`);
			else _push(ssrRenderComponent(Board_default, {
				cells: unref(game).board.cells.value,
				"row-clues": unref(game).clues.value.rows,
				"col-clues": unref(game).clues.value.cols,
				tool: unref(game).board.tool.value,
				interactive: !unref(game).won.value,
				"allow-cross": "",
				"show-progress": "",
				onStrokeStart: (pos, tool) => unref(game).board.begin(pos, tool),
				onStrokeMove: unref(game).board.move,
				onStrokeEnd: unref(game).board.end,
				onCellAction: (pos, tool) => unref(game).board.toggleAt(pos, tool),
				onUndo: ($event) => unref(game).undo()
			}, null, _parent));
			_push(`</section><div class="space-y-3 lg:col-start-2 lg:row-start-2">`);
			if (unref(puzzle)) {
				_push(`<!--[--><div role="radiogroup"${ssrRenderAttr("aria-label", unref(t)("game.tool"))} class="grid grid-cols-2 gap-1 rounded-xl bg-slate-200 p-1 dark:bg-slate-800"><!--[-->`);
				ssrRenderList$2(tools, (tool) => {
					_push(`<button type="button" role="radio"${ssrRenderAttr("aria-checked", unref(game).board.tool.value === tool.id)} class="${ssrRenderClass([unref(game).board.tool.value === tool.id ? "bg-white text-blue-700 shadow-sm dark:bg-slate-600 dark:text-white" : "text-slate-600 dark:text-slate-300", "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 text-sm font-medium transition-colors"])}">`);
					_push(ssrRenderComponent(Icon_default, { name: tool.icon }, null, _parent));
					_push(`<span class="truncate">${ssrInterpolate(unref(t)(tool.label))}</span></button>`);
				});
				_push(`<!--]--></div><div class="grid grid-cols-3 gap-2 lg:grid-cols-2"><button type="button" class="btn px-2"${includeBooleanAttr(!unref(game).board.canUndo.value || unref(game).won.value) ? " disabled" : ""}>`);
				_push(ssrRenderComponent(Icon_default, { name: "undo" }, null, _parent));
				_push(` ${ssrInterpolate(unref(t)("game.undo"))}</button><button type="button" class="btn px-2">`);
				_push(ssrRenderComponent(Icon_default, { name: "reset" }, null, _parent));
				_push(` ${ssrInterpolate(unref(t)("game.reset"))}</button><button type="button" class="btn btn-primary px-2 lg:col-span-2">`);
				_push(ssrRenderComponent(Icon_default, { name: "shuffle" }, null, _parent));
				_push(` ${ssrInterpolate(unref(t)("game.new"))}</button></div>`);
				if (unref(offline)) _push(`<p class="rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200" role="status">${ssrInterpolate(unref(t)("game.offline"))}</p>`);
				else _push(`<!---->`);
				_push(`<p class="hidden text-sm text-slate-500 lg:block dark:text-slate-400">${ssrInterpolate(unref(isTouch) ? unref(t)("game.helpTouch") : unref(t)("game.help"))}</p><!--]-->`);
			} else _push(`<!---->`);
			_push(`</div>`);
			_push(ssrRenderComponent(BaseDialog_default, {
				open: unref(winOpen),
				title: unref(t)("win.title"),
				onClose: ($event) => winOpen.value = false
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<p class="mb-4" role="status"${_scopeId}>${ssrInterpolate(unref(t)("win.text", {
							title: unref(puzzle)?.title ?? "",
							time: unref(formatDuration)(unref(game).elapsed.value)
						}))}</p><div class="flex flex-col gap-2"${_scopeId}>`);
						if (unref(puzzle) && !unref(puzzle).local) {
							_push(`<button type="button" class="btn"${includeBooleanAttr(!unref(auth).isLoggedIn || unref(liking)) ? " disabled" : ""}${ssrRenderAttr("aria-pressed", unref(puzzle).likedByMe)}${_scopeId}>`);
							_push(ssrRenderComponent(Icon_default, {
								name: "heart",
								filled: unref(puzzle).likedByMe,
								class: unref(puzzle).likedByMe ? "text-red-500" : ""
							}, null, _parent, _scopeId));
							_push(` ${ssrInterpolate(unref(puzzle).likedByMe ? unref(t)("win.liked") : unref(t)("win.like"))} · ${ssrInterpolate(unref(puzzle).likes)}</button>`);
						} else _push(`<!---->`);
						if (unref(puzzle) && !unref(puzzle).local && !unref(auth).isLoggedIn) {
							_push(`<p class="text-sm text-slate-500"${_scopeId}>`);
							_push(ssrRenderNuxtLink(NuxtLink, {
								to: unref(localePath)("login"),
								class: "underline"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(unref(t)("win.loginToLike"))}`);
									else return [createTextVNode(toDisplayString(unref(t)("win.loginToLike")), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</p>`);
						} else _push(`<!---->`);
						_push(`<button type="button" class="btn btn-primary" autofocus${_scopeId}>`);
						_push(ssrRenderComponent(Icon_default, { name: "shuffle" }, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(unref(t)("game.next"))}</button><button type="button" class="btn"${_scopeId}>${ssrInterpolate(unref(t)("common.close"))}</button></div>`);
					} else return [createVNode("p", {
						class: "mb-4",
						role: "status"
					}, toDisplayString(unref(t)("win.text", {
						title: unref(puzzle)?.title ?? "",
						time: unref(formatDuration)(unref(game).elapsed.value)
					})), 1), createVNode("div", { class: "flex flex-col gap-2" }, [
						unref(puzzle) && !unref(puzzle).local ? (openBlock(), createBlock("button", {
							key: 0,
							type: "button",
							class: "btn",
							disabled: !unref(auth).isLoggedIn || unref(liking),
							"aria-pressed": unref(puzzle).likedByMe,
							onClick: toggleLike
						}, [createVNode(Icon_default, {
							name: "heart",
							filled: unref(puzzle).likedByMe,
							class: unref(puzzle).likedByMe ? "text-red-500" : ""
						}, null, 8, ["filled", "class"]), createTextVNode(" " + toDisplayString(unref(puzzle).likedByMe ? unref(t)("win.liked") : unref(t)("win.like")) + " · " + toDisplayString(unref(puzzle).likes), 1)], 8, ["disabled", "aria-pressed"])) : createCommentVNode("", true),
						unref(puzzle) && !unref(puzzle).local && !unref(auth).isLoggedIn ? (openBlock(), createBlock("p", {
							key: 1,
							class: "text-sm text-slate-500"
						}, [createVNode(NuxtLink, {
							to: unref(localePath)("login"),
							class: "underline"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("win.loginToLike")), 1)]),
							_: 1
						}, 8, ["to"])])) : createCommentVNode("", true),
						createVNode("button", {
							type: "button",
							class: "btn btn-primary",
							autofocus: "",
							onClick: next
						}, [createVNode(Icon_default, { name: "shuffle" }), createTextVNode(" " + toDisplayString(unref(t)("game.next")), 1)]),
						createVNode("button", {
							type: "button",
							class: "btn",
							onClick: ($event) => winOpen.value = false
						}, toDisplayString(unref(t)("common.close")), 9, ["onClick"])
					])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/play/[[id]].vue
var _sfc_setup = __id___vue_vue_type_script_setup_true_lang_default.setup;
__id___vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/play/[[id]].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var __id___default = __id___vue_vue_type_script_setup_true_lang_default;

export { __id___default as default };
//# sourceMappingURL=_id_-NPXuIGWn.mjs.map
