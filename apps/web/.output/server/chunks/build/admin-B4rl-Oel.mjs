import { b as useI18n, c as useApi, a as useLocalePath, f as useHead, s as ssrRenderNuxtLink, N as NuxtLink, A as ApiError } from '../virtual/entry.mjs';
import { s as ssrRenderList$2, I as Icon_default } from './Icon-BotjH7zm.mjs';
import { P as PuzzleListItem_default } from './PuzzleListItem-DySUHevY.mjs';
import { y as defineComponent, w as watch, n as ssrRenderAttrs, W as mergeProps, N as ssrInterpolate, u as unref, $ as ssrRenderAttr, a0 as ssrRenderClass, m as ssrRenderComponent, M as withCtx, O as createTextVNode, P as toDisplayString, B as createVNode, a2 as openBlock, a3 as createBlock, l as ref, Z as useSSRContext } from '../_/vue.mjs';
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
import './DifficultyBadge-Cs75_sYO.mjs';
import './src-BGkmTxkQ.mjs';
import 'zod';

// app/pages/admin.vue?vue&type=script&setup=true&lang.ts
var admin_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "admin",
	__ssrInlineRender: true,
	setup(__props) {
		const { t } = useI18n();
		const api = useApi();
		const localePath = useLocalePath();
		const status = ref("pending");
		const items = ref([]);
		const loading = ref(true);
		const error = ref("");
		async function load() {
			loading.value = true;
			error.value = "";
			try {
				items.value = (await api.listPicrosses({
					status: status.value,
					limit: 50,
					sort: "recent"
				})).items;
			} catch (e) {
				error.value = t(e instanceof ApiError && e.isNetwork ? "errors.network" : "errors.forbidden");
			} finally {
				loading.value = false;
			}
		}
		async function setValidated(puzzle, validated) {
			try {
				const updated = await api.validatePicross(puzzle.id, validated);
				items.value = status.value === "pending" ? items.value.filter((item) => item.id !== puzzle.id) : items.value.map((item) => item.id === puzzle.id ? updated : item);
			} catch {
				error.value = t("errors.unknown");
			}
		}
		async function remove(puzzle) {
			if (!(void 0).confirm(t("profile.confirmDelete", { title: puzzle.title }))) return;
			try {
				await api.deletePicross(puzzle.id);
				items.value = items.value.filter((item) => item.id !== puzzle.id);
			} catch {
				error.value = t("errors.unknown");
			}
		}
		watch(status, load);
		useHead({
			title: () => t("admin.title"),
			meta: [{
				name: "robots",
				content: "noindex, nofollow"
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-3xl space-y-4 p-4" }, _attrs))}><h1 class="text-2xl font-bold">${ssrInterpolate(unref(t)("admin.title"))}</h1><div role="radiogroup" class="inline-grid grid-cols-2 gap-1 rounded-xl bg-slate-200 p-1 dark:bg-slate-800"><!--[-->`);
			ssrRenderList$2(["pending", "all"], (option) => {
				_push(`<button type="button" role="radio"${ssrRenderAttr("aria-checked", status.value === option)} class="${ssrRenderClass([status.value === option ? "bg-white text-blue-700 shadow-sm dark:bg-slate-600 dark:text-white" : "text-slate-600 dark:text-slate-300", "min-h-10 rounded-lg px-4 text-sm font-medium"])}">${ssrInterpolate(unref(t)(`admin.${option}`))}</button>`);
			});
			_push(`<!--]--></div>`);
			if (error.value) _push(`<p class="field-error" role="alert">${ssrInterpolate(error.value)}</p>`);
			else _push(`<!---->`);
			if (loading.value) _push(`<p role="status" class="text-slate-500">${ssrInterpolate(unref(t)("common.loading"))}</p>`);
			else if (!items.value.length && !error.value) _push(`<p class="text-slate-500">${ssrInterpolate(unref(t)("admin.none"))}</p>`);
			else _push(`<!---->`);
			_push(`<ul class="space-y-2"><!--[-->`);
			ssrRenderList$2(items.value, (puzzle) => {
				_push(ssrRenderComponent(PuzzleListItem_default, {
					key: puzzle.id,
					puzzle,
					"show-status": ""
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderNuxtLink(NuxtLink, {
								to: unref(localePath)({
									name: "play-id",
									params: { id: puzzle.id }
								}),
								class: "btn"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(unref(t)("admin.preview"))}`);
									else return [createTextVNode(toDisplayString(unref(t)("admin.preview")), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							if (!puzzle.validated) {
								_push(`<button type="button" class="btn btn-primary"${_scopeId}>`);
								_push(ssrRenderComponent(Icon_default, { name: "check" }, null, _parent, _scopeId));
								_push(` ${ssrInterpolate(unref(t)("admin.validate"))}</button>`);
							} else _push(`<button type="button" class="btn"${_scopeId}>${ssrInterpolate(unref(t)("admin.unvalidate"))}</button>`);
							_push(`<button type="button" class="btn btn-icon btn-danger"${ssrRenderAttr("aria-label", unref(t)("common.delete"))}${_scopeId}>`);
							_push(ssrRenderComponent(Icon_default, { name: "trash" }, null, _parent, _scopeId));
							_push(`</button>`);
						} else return [
							createVNode(NuxtLink, {
								to: unref(localePath)({
									name: "play-id",
									params: { id: puzzle.id }
								}),
								class: "btn"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("admin.preview")), 1)]),
								_: 1
							}, 8, ["to"]),
							!puzzle.validated ? (openBlock(), createBlock("button", {
								key: 0,
								type: "button",
								class: "btn btn-primary",
								onClick: ($event) => setValidated(puzzle, true)
							}, [createVNode(Icon_default, { name: "check" }), createTextVNode(" " + toDisplayString(unref(t)("admin.validate")), 1)], 8, ["onClick"])) : (openBlock(), createBlock("button", {
								key: 1,
								type: "button",
								class: "btn",
								onClick: ($event) => setValidated(puzzle, false)
							}, toDisplayString(unref(t)("admin.unvalidate")), 9, ["onClick"])),
							createVNode("button", {
								type: "button",
								class: "btn btn-icon btn-danger",
								"aria-label": unref(t)("common.delete"),
								onClick: ($event) => remove(puzzle)
							}, [createVNode(Icon_default, { name: "trash" })], 8, ["aria-label", "onClick"])
						];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></ul></div>`);
		};
	}
});
// app/pages/admin.vue
var _sfc_setup = admin_vue_vue_type_script_setup_true_lang_default.setup;
admin_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var admin_default = admin_vue_vue_type_script_setup_true_lang_default;

export { admin_default as default };
//# sourceMappingURL=admin-B4rl-Oel.mjs.map
