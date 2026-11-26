import { b as useI18n, a as useLocalePath, q as useSiteConfig, f as useHead, w as useSchemaOrg, x as defineWebSite, y as defineWebPage, s as ssrRenderNuxtLink, N as NuxtLink } from '../virtual/entry.mjs';
import { I as Icon_default, s as ssrRenderList$2 } from './Icon-BotjH7zm.mjs';
import { a as computeClues, f as fromBits } from './src-BGkmTxkQ.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-DjkACiAr.mjs';
import { y as defineComponent, n as ssrRenderAttrs, N as ssrInterpolate, u as unref, M as withCtx, m as ssrRenderComponent, B as createVNode, O as createTextVNode, P as toDisplayString, x as computed, W as mergeProps, a0 as ssrRenderClass, a4 as ssrRenderStyle, Z as useSSRContext } from '../_/vue.mjs';
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

// app/components/HeroBoard.vue?vue&type=script&setup=true&lang.ts
/** Petite grille 5 × 5 décorative qui se remplit en boucle (figée si « réduire les animations »). */
var HeroBoard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HeroBoard",
	__ssrInlineRender: true,
	setup(__props) {
		const PATTERN = [
			[
				0,
				1,
				0,
				1,
				0
			],
			[
				1,
				1,
				1,
				1,
				1
			],
			[
				1,
				1,
				1,
				1,
				1
			],
			[
				0,
				1,
				1,
				1,
				0
			],
			[
				0,
				0,
				1,
				0,
				0
			]
		];
		const clues = computeClues(fromBits(PATTERN));
		let order = 0;
		const cells = PATTERN.map((row) => row.map((bit) => bit ? order++ : -1));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "hero-board",
				role: "img",
				"aria-label": _ctx.$t("home.demo")
			}, _attrs))} data-v-f4990281><div class="corner" aria-hidden="true" data-v-f4990281></div><div class="col-clues" aria-hidden="true" data-v-f4990281><!--[-->`);
			ssrRenderList$2(unref(clues).cols, (c, i) => {
				_push(`<div class="clue clue-col" data-v-f4990281><!--[-->`);
				ssrRenderList$2(c, (n, k) => {
					_push(`<span data-v-f4990281>${ssrInterpolate(n)}</span>`);
				});
				_push(`<!--]--></div>`);
			});
			_push(`<!--]--></div><div class="row-clues" aria-hidden="true" data-v-f4990281><!--[-->`);
			ssrRenderList$2(unref(clues).rows, (c, i) => {
				_push(`<div class="clue clue-row" data-v-f4990281><!--[-->`);
				ssrRenderList$2(c, (n, k) => {
					_push(`<span data-v-f4990281>${ssrInterpolate(n)}</span>`);
				});
				_push(`<!--]--></div>`);
			});
			_push(`<!--]--></div><div class="cells" aria-hidden="true" data-v-f4990281><!--[-->`);
			ssrRenderList$2(unref(cells), (row, r) => {
				_push(`<!--[--><!--[-->`);
				ssrRenderList$2(row, (slot, c) => {
					_push(`<span class="${ssrRenderClass([{ on: slot >= 0 }, "cell"])}" style="${ssrRenderStyle(slot >= 0 ? { "--i": slot } : void 0)}" data-v-f4990281></span>`);
				});
				_push(`<!--]--><!--]-->`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
// app/components/HeroBoard.vue
var _sfc_setup$1 = HeroBoard_vue_vue_type_script_setup_true_lang_default.setup;
HeroBoard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroBoard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var HeroBoard_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(HeroBoard_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-f4990281"]]), { __name: "HeroBoard" });
// app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, tm, rt, locale } = useI18n();
		const localePath = useLocalePath();
		const site = useSiteConfig();
		const list = (key, fields) => tm(key).map((item) => Object.fromEntries(fields.map((f) => [f, rt(item[f])])));
		const steps = computed(() => list("home.steps", ["title", "text"]));
		const features = computed(() => list("home.features", ["title", "text"]));
		const faq = computed(() => list("home.faq", ["q", "a"]));
		useHead({
			title: () => t("seo.home.title"),
			titleTemplate: "%s",
			meta: [
				{
					name: "description",
					content: () => t("seo.home.description")
				},
				{
					property: "og:title",
					content: () => t("seo.home.title")
				},
				{
					property: "og:description",
					content: () => t("seo.home.description")
				}
			]
		});
		useSchemaOrg([
			defineWebSite({
				name: "Picross",
				inLanguage: locale.value
			}),
			defineWebPage({
				name: () => t("seo.home.title"),
				description: () => t("seo.home.description")
			}),
			{
				"@type": "WebApplication",
				name: "Picross",
				url: site.url,
				applicationCategory: "GameApplication",
				operatingSystem: "Any",
				browserRequirements: "Requires JavaScript",
				inLanguage: ["fr", "en"],
				offers: {
					"@type": "Offer",
					price: 0,
					priceCurrency: "EUR"
				}
			},
			{
				"@type": "FAQPage",
				mainEntity: faq.value.map((item) => ({
					"@type": "Question",
					name: item.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: item.a
					}
				}))
			}
		]);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}><section class="overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-950"><div class="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20"><div><p class="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-200">${ssrInterpolate(unref(t)("home.eyebrow"))}</p><h1 class="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">${ssrInterpolate(unref(t)("home.title"))}</h1><p class="mt-4 max-w-xl text-lg text-slate-600 text-pretty dark:text-slate-300">${ssrInterpolate(unref(t)("home.lead"))}</p><div class="mt-8 flex flex-wrap gap-3">`);
			_push(ssrRenderNuxtLink(NuxtLink, {
				to: unref(localePath)("play-id"),
				class: "btn btn-primary min-h-12 px-6 text-base"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(Icon_default, { name: "pencil" }, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(unref(t)("home.play"))}`);
					} else return [createVNode(Icon_default, { name: "pencil" }), createTextVNode(" " + toDisplayString(unref(t)("home.play")), 1)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderNuxtLink(NuxtLink, {
				to: unref(localePath)("gallery"),
				class: "btn min-h-12 px-6 text-base"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(Icon_default, { name: "grid" }, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(unref(t)("home.gallery"))}`);
					} else return [createVNode(Icon_default, { name: "grid" }), createTextVNode(" " + toDisplayString(unref(t)("home.gallery")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="flex justify-center md:justify-end">`);
			_push(ssrRenderComponent(HeroBoard_default, null, null, _parent));
			_push(`</div></div></section><section class="mx-auto max-w-6xl px-4 py-16" aria-labelledby="how"><h2 id="how" class="text-3xl font-bold">${ssrInterpolate(unref(t)("home.howTitle"))}</h2><p class="mt-2 text-slate-600 dark:text-slate-400">${ssrInterpolate(unref(t)("home.howLead"))}</p><ol class="mt-8 grid gap-4 md:grid-cols-3"><!--[-->`);
			ssrRenderList$2(unref(steps), (step, index) => {
				_push(`<li class="card"><span class="mb-3 grid size-9 place-items-center rounded-full bg-blue-600 font-bold text-white" aria-hidden="true">${ssrInterpolate(index + 1)}</span><h3 class="text-lg font-semibold">${ssrInterpolate(step.title)}</h3><p class="mt-1 text-slate-600 dark:text-slate-400">${ssrInterpolate(step.text)}</p></li>`);
			});
			_push(`<!--]--></ol></section><section class="bg-white py-16 dark:bg-slate-900" aria-labelledby="features"><div class="mx-auto max-w-6xl px-4"><h2 id="features" class="text-3xl font-bold">${ssrInterpolate(unref(t)("home.featuresTitle"))}</h2><ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
			ssrRenderList$2(unref(features), (feature) => {
				_push(`<li><h3 class="font-semibold">${ssrInterpolate(feature.title)}</h3><p class="mt-1 text-slate-600 dark:text-slate-400">${ssrInterpolate(feature.text)}</p></li>`);
			});
			_push(`<!--]--></ul></div></section><section class="mx-auto max-w-3xl px-4 py-16" aria-labelledby="faq"><h2 id="faq" class="text-3xl font-bold">${ssrInterpolate(unref(t)("home.faqTitle"))}</h2><div class="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900"><!--[-->`);
			ssrRenderList$2(unref(faq), (item) => {
				_push(`<details class="group p-4"><summary class="cursor-pointer list-none font-medium marker:hidden"><span class="flex items-center justify-between gap-4">${ssrInterpolate(item.q)} <span class="text-slate-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span></span></summary><p class="mt-2 text-slate-600 dark:text-slate-400">${ssrInterpolate(item.a)}</p></details>`);
			});
			_push(`<!--]--></div></section><section class="bg-blue-600 py-14 text-center text-white"><div class="mx-auto max-w-2xl px-4"><h2 class="text-3xl font-bold">${ssrInterpolate(unref(t)("home.ctaTitle"))}</h2><p class="mt-2 text-blue-100">${ssrInterpolate(unref(t)("home.ctaText"))}</p>`);
			_push(ssrRenderNuxtLink(NuxtLink, {
				to: unref(localePath)("play-id"),
				class: "btn mt-6 min-h-12 border-white bg-white px-6 text-base text-blue-700 hover:bg-blue-50"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(Icon_default, { name: "pencil" }, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(unref(t)("home.play"))}`);
					} else return [createVNode(Icon_default, { name: "pencil" }), createTextVNode(" " + toDisplayString(unref(t)("home.play")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></section></div>`);
		};
	}
});
// app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-C3_qsSxi.mjs.map
