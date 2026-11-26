import { b as useI18n, c as useApi, a as useLocalePath, r as refDebounced, f as useHead, s as ssrRenderNuxtLink, N as NuxtLink, A as ApiError } from '../virtual/entry.mjs';
import { u as useAsyncData } from './asyncData-DQ0_ggaq.mjs';
import { s as ssrRenderList$2 } from './Icon-BotjH7zm.mjs';
import { a as DIFFICULTIES } from './DifficultyBadge-Cs75_sYO.mjs';
import { P as PuzzleListItem_default } from './PuzzleListItem-DySUHevY.mjs';
import { y as defineComponent, _ as withAsyncContext, w as watch, n as ssrRenderAttrs, W as mergeProps, N as ssrInterpolate, u as unref, $ as ssrRenderAttr, a1 as includeBooleanAttr, a5 as ssrLooseContain, a6 as ssrLooseEqual, m as ssrRenderComponent, M as withCtx, O as createTextVNode, P as toDisplayString, B as createVNode, l as ref, Z as useSSRContext } from '../_/vue.mjs';
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
import './src-BGkmTxkQ.mjs';
import 'zod';

// app/pages/gallery.vue?vue&type=script&setup=true&lang.ts
var PAGE = 24;
var gallery_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "gallery",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { t } = useI18n();
		const api = useApi();
		const localePath = useLocalePath();
		const search = ref("");
		const debouncedSearch = refDebounced(search, 300);
		const sort = ref("difficulty");
		const difficulty = ref("");
		const items = ref([]);
		const total = ref(0);
		const loading = ref(false);
		const error = ref("");
		let requestId = 0;
		async function load(reset) {
			const current = ++requestId;
			loading.value = true;
			error.value = "";
			try {
				const page = await api.listPicrosses({
					search: debouncedSearch.value.trim(),
					sort: sort.value,
					difficulty: difficulty.value || void 0,
					limit: PAGE,
					offset: reset ? 0 : items.value.length
				});
				if (current !== requestId) return;
				items.value = reset ? page.items : [...items.value, ...page.items];
				total.value = page.total;
			} catch (e) {
				if (current !== requestId) return;
				error.value = t(e instanceof ApiError && e.isNetwork ? "errors.network" : "errors.unknown");
			} finally {
				if (current === requestId) loading.value = false;
			}
		}
		const { data: initial } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("gallery-initial", () => api.listPicrosses({
			sort: "difficulty",
			limit: PAGE
		}).catch(() => null))), __temp = await __temp, __restore(), __temp);
		if (initial.value) {
			items.value = initial.value.items;
			total.value = initial.value.total;
		}
		watch([
			debouncedSearch,
			sort,
			difficulty
		], () => load(true));
		useHead({
			title: () => t("seo.gallery.title"),
			meta: [
				{
					name: "description",
					content: () => t("seo.gallery.description")
				},
				{
					property: "og:title",
					content: () => t("seo.gallery.title")
				},
				{
					property: "og:description",
					content: () => t("seo.gallery.description")
				}
			]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-3xl space-y-4 p-4" }, _attrs))}><div class="flex items-baseline justify-between gap-4"><h1 class="text-2xl font-bold">${ssrInterpolate(unref(t)("gallery.title"))}</h1><p class="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">${ssrInterpolate(unref(t)("gallery.count", total.value))}</p></div><div class="grid gap-3 sm:grid-cols-[1fr_auto_auto]"><div><label for="search" class="sr-only">${ssrInterpolate(unref(t)("gallery.search"))}</label><input id="search"${ssrRenderAttr("value", search.value)} class="field-input" type="search"${ssrRenderAttr("placeholder", unref(t)("gallery.search"))} maxlength="60" autocomplete="off"></div><div><label for="difficulty" class="sr-only">${ssrInterpolate(unref(t)("difficulty.label"))}</label><select id="difficulty" class="field-input"><option value=""${includeBooleanAttr(Array.isArray(difficulty.value) ? ssrLooseContain(difficulty.value, "") : ssrLooseEqual(difficulty.value, "")) ? " selected" : ""}>${ssrInterpolate(unref(t)("difficulty.all"))}</option><!--[-->`);
			ssrRenderList$2(unref(DIFFICULTIES), (level) => {
				_push(`<option${ssrRenderAttr("value", level)}${includeBooleanAttr(Array.isArray(difficulty.value) ? ssrLooseContain(difficulty.value, level) : ssrLooseEqual(difficulty.value, level)) ? " selected" : ""}>${ssrInterpolate(unref(t)(`difficulty.${level}`))}</option>`);
			});
			_push(`<!--]--></select></div><div><label for="sort" class="sr-only">${ssrInterpolate(unref(t)("gallery.sort"))}</label><select id="sort" class="field-input"><option value="difficulty"${includeBooleanAttr(Array.isArray(sort.value) ? ssrLooseContain(sort.value, "difficulty") : ssrLooseEqual(sort.value, "difficulty")) ? " selected" : ""}>${ssrInterpolate(unref(t)("gallery.easiest"))}</option><option value="recent"${includeBooleanAttr(Array.isArray(sort.value) ? ssrLooseContain(sort.value, "recent") : ssrLooseEqual(sort.value, "recent")) ? " selected" : ""}>${ssrInterpolate(unref(t)("gallery.recent"))}</option><option value="popular"${includeBooleanAttr(Array.isArray(sort.value) ? ssrLooseContain(sort.value, "popular") : ssrLooseEqual(sort.value, "popular")) ? " selected" : ""}>${ssrInterpolate(unref(t)("gallery.popular"))}</option></select></div></div>`);
			if (error.value) _push(`<p class="field-error" role="alert">${ssrInterpolate(error.value)}</p>`);
			else _push(`<!---->`);
			if (items.value.length) {
				_push(`<ul class="space-y-2"><!--[-->`);
				ssrRenderList$2(items.value, (puzzle) => {
					_push(ssrRenderComponent(PuzzleListItem_default, {
						key: puzzle.id,
						puzzle
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderNuxtLink(NuxtLink, {
								to: unref(localePath)({
									name: "play-id",
									params: { id: puzzle.id }
								}),
								class: "btn btn-primary"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(unref(t)("gallery.play"))}`);
									else return [createTextVNode(toDisplayString(unref(t)("gallery.play")), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							else return [createVNode(NuxtLink, {
								to: unref(localePath)({
									name: "play-id",
									params: { id: puzzle.id }
								}),
								class: "btn btn-primary"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("gallery.play")), 1)]),
								_: 1
							}, 8, ["to"])];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></ul>`);
			} else if (!loading.value && !error.value) _push(`<p class="py-8 text-center text-slate-500">${ssrInterpolate(unref(t)("gallery.empty"))}</p>`);
			else _push(`<!---->`);
			if (loading.value) _push(`<p class="py-4 text-center text-slate-500" role="status">${ssrInterpolate(unref(t)("common.loading"))}</p>`);
			else _push(`<!---->`);
			if (items.value.length < total.value && !loading.value) _push(`<div class="text-center"><button type="button" class="btn">${ssrInterpolate(unref(t)("common.more"))}</button></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/gallery.vue
var _sfc_setup = gallery_vue_vue_type_script_setup_true_lang_default.setup;
gallery_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/gallery.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var gallery_default = gallery_vue_vue_type_script_setup_true_lang_default;

export { gallery_default as default };
//# sourceMappingURL=gallery-DGt8ZSqR.mjs.map
