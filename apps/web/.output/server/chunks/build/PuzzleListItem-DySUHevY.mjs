import { b as useI18n } from '../virtual/entry.mjs';
import { D as DifficultyBadge_default } from './DifficultyBadge-Cs75_sYO.mjs';
import { I as Icon_default } from './Icon-BotjH7zm.mjs';
import { y as defineComponent, n as ssrRenderAttrs, W as mergeProps, N as ssrInterpolate, u as unref, m as ssrRenderComponent, a0 as ssrRenderClass, aa as ssrRenderSlot, Z as useSSRContext } from '../_/vue.mjs';

// app/components/PuzzleListItem.vue?vue&type=script&setup=true&lang.ts
var PuzzleListItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PuzzleListItem",
	__ssrInlineRender: true,
	props: {
		puzzle: {},
		showStatus: { type: Boolean }
	},
	setup(__props) {
		const { t, n } = useI18n();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<li${ssrRenderAttrs(mergeProps({ class: "card flex flex-wrap items-center gap-x-4 gap-y-2" }, _attrs))}><div class="min-w-0 flex-1"><h3 class="truncate font-semibold">${ssrInterpolate(__props.puzzle.title)}</h3><p class="flex flex-wrap items-center gap-x-2 text-sm text-slate-500 dark:text-slate-400"><span>${ssrInterpolate(unref(t)("common.size", {
				width: __props.puzzle.width,
				height: __props.puzzle.height
			}))}</span><span aria-hidden="true">·</span><span>${ssrInterpolate(__props.puzzle.author ? unref(t)("common.by", { author: __props.puzzle.author }) : unref(t)("common.builtin"))}</span><span aria-hidden="true">·</span>`);
			_push(ssrRenderComponent(DifficultyBadge_default, { level: __props.puzzle.difficulty }, null, _parent));
			_push(`<span aria-hidden="true">·</span><span class="inline-flex items-center gap-1">`);
			_push(ssrRenderComponent(Icon_default, {
				name: "heart",
				class: ["size-4", __props.puzzle.likedByMe ? "text-red-500" : ""],
				filled: __props.puzzle.likedByMe
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(n)(__props.puzzle.likes))}</span></p>`);
			if (__props.showStatus) _push(`<p class="${ssrRenderClass([__props.puzzle.validated ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" : "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200", "mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium"])}">${ssrInterpolate(__props.puzzle.validated ? unref(t)("profile.published") : unref(t)("profile.pending"))}</p>`);
			else _push(`<!---->`);
			_push(`</div><div class="flex items-center gap-2">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></li>`);
		};
	}
});
// app/components/PuzzleListItem.vue
var _sfc_setup = PuzzleListItem_vue_vue_type_script_setup_true_lang_default.setup;
PuzzleListItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PuzzleListItem.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var PuzzleListItem_default = Object.assign(PuzzleListItem_vue_vue_type_script_setup_true_lang_default, { __name: "PuzzleListItem" });

export { PuzzleListItem_default as P };
//# sourceMappingURL=PuzzleListItem-DySUHevY.mjs.map
