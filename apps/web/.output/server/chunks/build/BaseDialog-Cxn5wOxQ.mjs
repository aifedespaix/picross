import { b as useI18n } from '../virtual/entry.mjs';
import { I as Icon_default } from './Icon-BotjH7zm.mjs';
import { y as defineComponent, w as watch, X as nextTick, n as ssrRenderAttrs, W as mergeProps, $ as ssrRenderAttr, N as ssrInterpolate, u as unref, m as ssrRenderComponent, aa as ssrRenderSlot, l as ref, Z as useSSRContext } from '../_/vue.mjs';

// app/components/BaseDialog.vue?vue&type=script&setup=true&lang.ts
var BaseDialog_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BaseDialog",
	__ssrInlineRender: true,
	props: {
		open: { type: Boolean },
		title: {}
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { t } = useI18n();
		const dialog = ref();
		const titleId = `dialog-title-${Math.random().toString(36).slice(2, 8)}`;
		watch(() => props.open, async (open) => {
			await nextTick();
			const el = dialog.value;
			if (!el) return;
			if (open && !el.open) el.showModal();
			if (!open && el.open) el.close();
		}, { immediate: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<dialog${ssrRenderAttrs(mergeProps({
				ref_key: "dialog",
				ref: dialog,
				"aria-labelledby": titleId,
				class: "m-auto w-[min(92vw,26rem)] rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
			}, _attrs))}>`);
			if (__props.open) {
				_push(`<div class="p-5"><div class="mb-4 flex items-start justify-between gap-4"><h2${ssrRenderAttr("id", titleId)} class="text-lg font-semibold">${ssrInterpolate(__props.title)}</h2><button type="button" class="btn btn-icon -mt-1 -mr-2 border-transparent bg-transparent shadow-none"${ssrRenderAttr("aria-label", unref(t)("common.close"))}>`);
				_push(ssrRenderComponent(Icon_default, { name: "x" }, null, _parent));
				_push(`</button></div>`);
				ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</dialog>`);
		};
	}
});
// app/components/BaseDialog.vue
var _sfc_setup = BaseDialog_vue_vue_type_script_setup_true_lang_default.setup;
BaseDialog_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BaseDialog.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var BaseDialog_default = Object.assign(BaseDialog_vue_vue_type_script_setup_true_lang_default, { __name: "BaseDialog" });

export { BaseDialog_default as B };
//# sourceMappingURL=BaseDialog-Cxn5wOxQ.mjs.map
