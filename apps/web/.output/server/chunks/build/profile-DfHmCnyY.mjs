import { b as useI18n, c as useApi, u as useAuthStore, a as useLocalePath, f as useHead, s as ssrRenderNuxtLink, N as NuxtLink } from '../virtual/entry.mjs';
import { I as Icon_default, s as ssrRenderList$2 } from './Icon-BotjH7zm.mjs';
import { P as PuzzleListItem_default } from './PuzzleListItem-DySUHevY.mjs';
import { y as defineComponent, n as ssrRenderAttrs, W as mergeProps, N as ssrInterpolate, u as unref, m as ssrRenderComponent, M as withCtx, B as createVNode, O as createTextVNode, P as toDisplayString, $ as ssrRenderAttr, l as ref, Z as useSSRContext } from '../_/vue.mjs';
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

// app/pages/profile.vue?vue&type=script&setup=true&lang.ts
var profile_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "profile",
	__ssrInlineRender: true,
	setup(__props) {
		const { t } = useI18n();
		const api = useApi();
		const auth = useAuthStore();
		const localePath = useLocalePath();
		const items = ref([]);
		const loading = ref(true);
		const error = ref("");
		async function remove(puzzle) {
			if (!(void 0).confirm(t("profile.confirmDelete", { title: puzzle.title }))) return;
			try {
				await api.deletePicross(puzzle.id);
				items.value = items.value.filter((item) => item.id !== puzzle.id);
			} catch {
				error.value = t("errors.unknown");
			}
		}
		useHead({
			title: () => t("profile.title"),
			meta: [{
				name: "robots",
				content: "noindex, nofollow"
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-3xl space-y-6 p-4" }, _attrs))}><div class="flex flex-wrap items-center justify-between gap-3"><div><h1 class="text-2xl font-bold">${ssrInterpolate(unref(t)("profile.hello", { name: unref(auth).user?.name }))}</h1><p class="text-sm text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(auth).user?.email)}</p></div><button type="button" class="btn">`);
			_push(ssrRenderComponent(Icon_default, { name: "logout" }, null, _parent));
			_push(` ${ssrInterpolate(unref(t)("nav.logout"))}</button></div><section aria-labelledby="mine"><div class="mb-3 flex items-center justify-between"><h2 id="mine" class="text-lg font-semibold">${ssrInterpolate(unref(t)("profile.mine"))}</h2>`);
			_push(ssrRenderNuxtLink(NuxtLink, {
				to: unref(localePath)("create"),
				class: "btn btn-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(Icon_default, { name: "plus" }, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(unref(t)("nav.create"))}`);
					} else return [createVNode(Icon_default, { name: "plus" }), createTextVNode(" " + toDisplayString(unref(t)("nav.create")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (error.value) _push(`<p class="field-error" role="alert">${ssrInterpolate(error.value)}</p>`);
			else _push(`<!---->`);
			if (loading.value) _push(`<p role="status" class="text-slate-500">${ssrInterpolate(unref(t)("common.loading"))}</p>`);
			else if (!items.value.length && !error.value) _push(`<p class="text-slate-500">${ssrInterpolate(unref(t)("profile.none"))}</p>`);
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
									if (_push) _push(`${ssrInterpolate(unref(t)("gallery.play"))}`);
									else return [createTextVNode(toDisplayString(unref(t)("gallery.play")), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`<button type="button" class="btn btn-icon btn-danger"${ssrRenderAttr("aria-label", unref(t)("common.delete"))}${_scopeId}>`);
							_push(ssrRenderComponent(Icon_default, { name: "trash" }, null, _parent, _scopeId));
							_push(`</button>`);
						} else return [createVNode(NuxtLink, {
							to: unref(localePath)({
								name: "play-id",
								params: { id: puzzle.id }
							}),
							class: "btn"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("gallery.play")), 1)]),
							_: 1
						}, 8, ["to"]), createVNode("button", {
							type: "button",
							class: "btn btn-icon btn-danger",
							"aria-label": unref(t)("common.delete"),
							onClick: ($event) => remove(puzzle)
						}, [createVNode(Icon_default, { name: "trash" })], 8, ["aria-label", "onClick"])];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></ul></section></div>`);
		};
	}
});
// app/pages/profile.vue
var _sfc_setup = profile_vue_vue_type_script_setup_true_lang_default.setup;
profile_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var profile_default = profile_vue_vue_type_script_setup_true_lang_default;

export { profile_default as default };
//# sourceMappingURL=profile-DfHmCnyY.mjs.map
