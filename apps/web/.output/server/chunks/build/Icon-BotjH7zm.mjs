import { t as tryUseNuxtApp, v as vforBound } from '../virtual/entry.mjs';
import { a8 as ssrRenderList, a9 as renderList, y as defineComponent, n as ssrRenderAttrs, W as mergeProps, $ as ssrRenderAttr, Z as useSSRContext } from '../_/vue.mjs';

// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/render-list.js
function bound(source) {
	if (typeof source === "number" && source > 1e4 && tryUseNuxtApp()?.ssrContext?.islandContext) return vforBound(source);
	return source;
}
/**
* `renderList` from `vue`, with numeric sources clamped to `MAX_VFOR_LENGTH`
* while rendering a server component or island.
*
* @internal
*/
var renderList$2 = ((source, ...rest) => renderList(bound(source), ...rest));
/**
* `ssrRenderList` from `vue/server-renderer`, with numeric sources clamped to
* `MAX_VFOR_LENGTH` while rendering a server component or island.
*
* @internal
*/
function ssrRenderList$2(source, renderItem) {
	ssrRenderList(bound(source), renderItem);
}
// app/components/Icon.vue?vue&type=script&setup=true&lang.ts
var Icon_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Icon",
	__ssrInlineRender: true,
	props: {
		name: {},
		filled: { type: Boolean }
	},
	setup(__props) {
		/** Icônes (tracés de 24×24, style « outline »). Décoratives : masquées aux lecteurs d'écran. */
		const PATHS = {
			undo: ["M3 7v6h6", "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"],
			reset: ["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5"],
			x: ["M18 6 6 18", "m6 6 12 12"],
			pencil: ["M12 20h9", "M16.38 3.62a2.12 2.12 0 0 1 3 3L7.37 18.63a2 2 0 0 1-.86.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.86z"],
			sliders: [
				"M4 21v-7",
				"M4 10V3",
				"M12 21v-9",
				"M12 8V3",
				"M20 21v-5",
				"M20 12V3",
				"M1 14h6",
				"M9 8h6",
				"M17 16h6"
			],
			user: ["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
			heart: ["M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"],
			check: ["M20 6 9 17l-5-5"],
			plus: ["M5 12h14", "M12 5v14"],
			trash: [
				"M3 6h18",
				"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
				"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
			],
			shuffle: [
				"M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22",
				"m18 2 4 4-4 4",
				"M2 6h1.9c1.5 0 2.9.9 3.6 2.2",
				"M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8",
				"m18 14 4 4-4 4"
			],
			link: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
			logout: [
				"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
				"m16 17 5-5-5-5",
				"M21 12H9"
			],
			grid: [
				"M3 3h7v7H3z",
				"M14 3h7v7h-7z",
				"M14 14h7v7h-7z",
				"M3 14h7v7H3z"
			],
			shield: ["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"],
			eye: ["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
			eyeOff: [
				"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",
				"M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",
				"M2 2l20 20"
			]
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<svg${ssrRenderAttrs(mergeProps({
				class: "size-5 shrink-0",
				viewBox: "0 0 24 24",
				fill: __props.filled ? "currentColor" : "none",
				stroke: "currentColor",
				"stroke-width": "2",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"aria-hidden": "true"
			}, _attrs))}><!--[-->`);
			ssrRenderList$2(PATHS[__props.name], (d) => {
				_push(`<path${ssrRenderAttr("d", d)}></path>`);
			});
			_push(`<!--]--></svg>`);
		};
	}
});
// app/components/Icon.vue
var _sfc_setup = Icon_vue_vue_type_script_setup_true_lang_default.setup;
Icon_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Icon.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Icon_default = Object.assign(Icon_vue_vue_type_script_setup_true_lang_default, { __name: "Icon" });

export { Icon_default as I, renderList$2 as r, ssrRenderList$2 as s };
//# sourceMappingURL=Icon-BotjH7zm.mjs.map
