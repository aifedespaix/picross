import { b as useI18n, c as useApi, a as useLocalePath, f as useHead, s as ssrRenderNuxtLink, N as NuxtLink } from '../virtual/entry.mjs';
import { a as computeClues, M as MIN_FILL_RATIO } from './src-iCRH6kH_.mjs';
import { u as useBoard, c as createGrid, B as Board_default, t as toSolution, a as countFilled } from './useBoard-DjGyasyP.mjs';
import { I as Icon_default } from './Icon-BotjH7zm.mjs';
import { u as useFormErrors } from './useFormErrors-4w1-3u6s.mjs';
import { y as defineComponent, n as ssrRenderAttrs, W as mergeProps, N as ssrInterpolate, u as unref, $ as ssrRenderAttr, a0 as ssrRenderClass, m as ssrRenderComponent, a1 as includeBooleanAttr, M as withCtx, O as createTextVNode, P as toDisplayString, l as ref, x as computed, Z as useSSRContext } from '../_/vue.mjs';
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
import 'zod';
import './_plugin-vue_export-helper-DjkACiAr.mjs';

// app/pages/create.vue?vue&type=script&setup=true&lang.ts
var create_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "create",
	__ssrInlineRender: true,
	setup(__props) {
		const { t } = useI18n();
		useApi();
		const localePath = useLocalePath();
		const { fields, formError} = useFormErrors();
		const board = useBoard(createGrid(10, 10));
		const title = ref("");
		const linked = ref(true);
		const submitting = ref(false);
		const created = ref(null);
		const width = computed(() => board.cells.value[0]?.length ?? 0);
		const height = computed(() => board.cells.value.length);
		const clues = computed(() => computeClues(toSolution(board.cells.value)));
		const filled = computed(() => countFilled(board.cells.value));
		const minFilled = computed(() => Math.floor(width.value * height.value * MIN_FILL_RATIO) + 1);
		const enough = computed(() => filled.value >= minFilled.value);
		useHead({
			title: () => t("nav.create"),
			meta: [{
				name: "robots",
				content: "noindex, nofollow"
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto flex max-w-6xl flex-col gap-3 p-3 lg:flex-row lg:items-start lg:gap-8" }, _attrs))}><aside class="order-1 w-full space-y-4 lg:order-2 lg:w-80 lg:shrink-0 lg:pt-4">`);
			if (!created.value) {
				_push(`<!--[--><div><h1 class="text-xl font-bold">${ssrInterpolate(unref(t)("create.title"))}</h1><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(t)("create.intro"))}</p></div><form class="space-y-4" novalidate><div><label for="title" class="field-label">${ssrInterpolate(unref(t)("create.name"))}</label><input id="title"${ssrRenderAttr("value", title.value)} class="field-input" type="text"${ssrRenderAttr("maxlength", unref(40))}${ssrRenderAttr("aria-invalid", !!unref(fields).title)}${ssrRenderAttr("aria-describedby", unref(fields).title ? "title-error" : void 0)} autocomplete="off">`);
				if (unref(fields).title) _push(`<p id="title-error" class="field-error">${ssrInterpolate(unref(fields).title)}</p>`);
				else _push(`<!---->`);
				_push(`</div><div class="flex items-end gap-2"><div class="flex-1"><label for="cols" class="field-label">${ssrInterpolate(unref(t)("create.cols"))}</label><input id="cols" class="field-input" type="number" inputmode="numeric"${ssrRenderAttr("min", unref(3))}${ssrRenderAttr("max", unref(15))}${ssrRenderAttr("value", width.value)}></div><button type="button" class="${ssrRenderClass([linked.value ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-slate-700 dark:text-blue-300" : "", "btn btn-icon mb-0.5"])}"${ssrRenderAttr("aria-pressed", linked.value)}${ssrRenderAttr("aria-label", unref(t)("create.link"))}${ssrRenderAttr("title", unref(t)("create.link"))}>`);
				_push(ssrRenderComponent(Icon_default, { name: "link" }, null, _parent));
				_push(`</button><div class="flex-1"><label for="rows" class="field-label">${ssrInterpolate(unref(t)("create.rows"))}</label><input id="rows" class="field-input" type="number" inputmode="numeric"${ssrRenderAttr("min", unref(3))}${ssrRenderAttr("max", unref(15))}${ssrRenderAttr("value", height.value)}></div></div><p class="${ssrRenderClass([enough.value ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" : "bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200", "rounded-lg px-3 py-2 text-sm"])}" role="status">`);
				if (enough.value) _push(`<!--[-->${ssrInterpolate(filled.value)} / ${ssrInterpolate(width.value * height.value)}<!--]-->`);
				else _push(`<!--[-->${ssrInterpolate(unref(t)("create.tooEmpty", {
					done: filled.value,
					min: minFilled.value
				}))}<!--]-->`);
				_push(`</p>`);
				if (unref(formError)) _push(`<p class="field-error" role="alert">${ssrInterpolate(unref(formError))}</p>`);
				else _push(`<!---->`);
				if (unref(fields).map) _push(`<p class="field-error" role="alert">${ssrInterpolate(unref(fields).map)}</p>`);
				else _push(`<!---->`);
				_push(`<div class="flex flex-wrap gap-2"><button type="button" class="btn flex-1"${includeBooleanAttr(!unref(board).canUndo.value) ? " disabled" : ""}>`);
				_push(ssrRenderComponent(Icon_default, { name: "undo" }, null, _parent));
				_push(` ${ssrInterpolate(unref(t)("game.undo"))}</button><button type="button" class="btn flex-1">`);
				_push(ssrRenderComponent(Icon_default, { name: "trash" }, null, _parent));
				_push(` ${ssrInterpolate(unref(t)("create.clear"))}</button><button type="submit" class="btn btn-primary w-full"${includeBooleanAttr(!enough.value || submitting.value) ? " disabled" : ""}>`);
				_push(ssrRenderComponent(Icon_default, { name: "check" }, null, _parent));
				_push(` ${ssrInterpolate(unref(t)("create.submit"))}</button></div></form><!--]-->`);
			} else {
				_push(`<div class="card space-y-3" role="status"><h1 class="text-xl font-bold">${ssrInterpolate(unref(t)("create.sent"))}</h1><p class="text-sm">${ssrInterpolate(created.value.validated ? unref(t)("create.sentPublic") : unref(t)("create.sentPending"))}</p><div class="flex flex-col gap-2">`);
				_push(ssrRenderNuxtLink(NuxtLink, {
					to: unref(localePath)({
						name: "play-id",
						params: { id: created.value.id }
					}),
					class: "btn btn-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(t)("gallery.play"))}`);
						else return [createTextVNode(toDisplayString(unref(t)("gallery.play")), 1)];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderNuxtLink(NuxtLink, {
					to: unref(localePath)("profile"),
					class: "btn"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(t)("create.seeProfile"))}`);
						else return [createTextVNode(toDisplayString(unref(t)("create.seeProfile")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`<button type="button" class="btn">${ssrInterpolate(unref(t)("create.again"))}</button></div></div>`);
			}
			_push(`</aside><section class="order-2 h-[min(calc(100vw-1.5rem),calc(100svh-24rem))] min-h-72 w-full lg:order-1 lg:h-[calc(100svh-5.5rem)] lg:flex-1">`);
			_push(ssrRenderComponent(Board_default, {
				cells: unref(board).cells.value,
				"row-clues": clues.value.rows,
				"col-clues": clues.value.cols,
				tool: "filled",
				interactive: !created.value,
				"allow-cross": false,
				"show-progress": false,
				onStrokeStart: (pos, tool) => unref(board).begin(pos, tool),
				onStrokeMove: unref(board).move,
				onStrokeEnd: unref(board).end,
				onCellAction: (pos, tool) => unref(board).toggleAt(pos, tool),
				onUndo: ($event) => unref(board).undo()
			}, null, _parent));
			_push(`</section></div>`);
		};
	}
});
// app/pages/create.vue
var _sfc_setup = create_vue_vue_type_script_setup_true_lang_default.setup;
create_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var create_default = create_vue_vue_type_script_setup_true_lang_default;

export { create_default as default };
//# sourceMappingURL=create-CsTwISKD.mjs.map
