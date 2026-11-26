import { b as useI18n, a as useLocalePath, z as useSwitchLocalePath, s as ssrRenderNuxtLink, N as NuxtLink, h as useSettingsStore, u as useAuthStore } from '../virtual/entry.mjs';
import { s as ssrRenderList$2, r as renderList$2, I as Icon_default } from './Icon-BotjH7zm.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-DjkACiAr.mjs';
import { B as BaseDialog_default } from './BaseDialog-Cxn5wOxQ.mjs';
import { y as defineComponent, n as ssrRenderAttrs, W as mergeProps, N as ssrInterpolate, u as unref, m as ssrRenderComponent, aa as ssrRenderSlot, l as ref, $ as ssrRenderAttr, M as withCtx, O as createTextVNode, P as toDisplayString, a1 as includeBooleanAttr, a6 as ssrLooseEqual, a0 as ssrRenderClass, a5 as ssrLooseContain, B as createVNode, a2 as openBlock, a3 as createBlock, F as Fragment, ac as withDirectives, ad as vModelRadio, ae as vModelCheckbox, Z as useSSRContext, x as computed } from '../_/vue.mjs';
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

// app/components/AppFooter.vue?vue&type=script&setup=true&lang.ts
var AppFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, locale, locales, setLocale } = useI18n();
		const localePath = useLocalePath();
		const switchLocalePath = useSwitchLocalePath();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t border-slate-200 bg-white py-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400" }, _attrs))}><div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between"><p>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} ${ssrInterpolate(unref(t)("app.name"))} — ${ssrInterpolate(unref(t)("footer.tagline"))}</p><nav${ssrRenderAttr("aria-label", unref(t)("footer.nav"))} class="flex flex-wrap items-center gap-x-5 gap-y-2">`);
			_push(ssrRenderNuxtLink(NuxtLink, {
				to: unref(localePath)("play-id"),
				class: "hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(t)("nav.play"))}`);
					else return [createTextVNode(toDisplayString(unref(t)("nav.play")), 1)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderNuxtLink(NuxtLink, {
				to: unref(localePath)("gallery"),
				class: "hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(t)("nav.gallery"))}`);
					else return [createTextVNode(toDisplayString(unref(t)("nav.gallery")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<a href="https://github.com/aifedespaix/picross" rel="noopener" class="hover:underline">GitHub</a><ul class="flex items-center gap-2"${ssrRenderAttr("aria-label", unref(t)("settings.language"))}><!--[-->`);
			ssrRenderList$2(unref(locales), (item) => {
				_push(`<li>`);
				_push(ssrRenderNuxtLink(NuxtLink, {
					to: unref(switchLocalePath)(item.code),
					hreflang: item.code,
					lang: item.code,
					"aria-current": item.code === unref(locale) ? "true" : void 0,
					class: ["rounded px-1.5 py-0.5 font-medium uppercase hover:underline", item.code === unref(locale) ? "bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white" : ""],
					onClick: ($event) => unref(setLocale)(item.code)
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(item.code)}`);
						else return [createTextVNode(toDisplayString(item.code), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></nav></div></footer>`);
		};
	}
});
// app/components/AppFooter.vue
var _sfc_setup$3 = AppFooter_vue_vue_type_script_setup_true_lang_default.setup;
AppFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var AppFooter_default = Object.assign(AppFooter_vue_vue_type_script_setup_true_lang_default, { __name: "AppFooter" });
// app/assets/picross-icon.svg
var picross_icon_default = __buildAssetsURL("picross-icon.CsL2Z4Dv.svg");
// app/components/AppHeader.vue?vue&type=script&setup=true&lang.ts
var AppHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppHeader",
	__ssrInlineRender: true,
	emits: ["openSettings"],
	setup(__props) {
		const { t } = useI18n();
		const localePath = useLocalePath();
		const auth = useAuthStore();
		const items = computed(() => [
			{
				to: localePath("play-id"),
				label: t("nav.play"),
				icon: "pencil"
			},
			{
				to: localePath("gallery"),
				label: t("nav.gallery"),
				icon: "grid"
			},
			{
				to: localePath("create"),
				label: t("nav.create"),
				icon: "plus"
			}
		]);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90" }, _attrs))} data-v-bbee28a1><div class="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3" data-v-bbee28a1>`);
			_push(ssrRenderNuxtLink(NuxtLink, {
				to: unref(localePath)("index"),
				class: "mr-2 flex items-center gap-2 rounded-lg",
				"aria-label": unref(t)("app.name")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", unref(picross_icon_default))} alt="" class="size-8" width="32" height="32" data-v-bbee28a1${_scopeId}><span class="hidden text-lg font-bold sm:inline" data-v-bbee28a1${_scopeId}>${ssrInterpolate(unref(t)("app.name"))}</span>`);
					else return [createVNode("img", {
						src: unref(picross_icon_default),
						alt: "",
						class: "size-8",
						width: "32",
						height: "32"
					}, null, 8, ["src"]), createVNode("span", { class: "hidden text-lg font-bold sm:inline" }, toDisplayString(unref(t)("app.name")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<nav${ssrRenderAttr("aria-label", unref(t)("nav.main"))} class="flex flex-1 items-center gap-1" data-v-bbee28a1><!--[-->`);
			ssrRenderList$2(unref(items), (item) => {
				_push(ssrRenderNuxtLink(NuxtLink, {
					key: item.icon,
					to: item.to,
					class: "nav-link",
					"aria-label": item.label
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(Icon_default, { name: item.icon }, null, _parent, _scopeId));
							_push(`<span class="hidden sm:inline" data-v-bbee28a1${_scopeId}>${ssrInterpolate(item.label)}</span>`);
						} else return [createVNode(Icon_default, { name: item.icon }, null, 8, ["name"]), createVNode("span", { class: "hidden sm:inline" }, toDisplayString(item.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]-->`);
			if (unref(auth).isAdmin) _push(ssrRenderNuxtLink(NuxtLink, {
				to: unref(localePath)("admin"),
				class: "nav-link",
				"aria-label": unref(t)("nav.admin")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(Icon_default, { name: "shield" }, null, _parent, _scopeId));
						_push(`<span class="hidden sm:inline" data-v-bbee28a1${_scopeId}>${ssrInterpolate(unref(t)("nav.admin"))}</span>`);
					} else return [createVNode(Icon_default, { name: "shield" }), createVNode("span", { class: "hidden sm:inline" }, toDisplayString(unref(t)("nav.admin")), 1)];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</nav><button type="button" class="btn btn-icon border-transparent bg-transparent shadow-none"${ssrRenderAttr("aria-label", unref(t)("nav.settings"))} data-v-bbee28a1>`);
			_push(ssrRenderComponent(Icon_default, { name: "sliders" }, null, _parent));
			_push(`</button>`);
			if (unref(auth).user) _push(ssrRenderNuxtLink(NuxtLink, {
				to: unref(localePath)("profile"),
				class: "nav-link",
				"aria-label": unref(t)("nav.profile")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(Icon_default, { name: "user" }, null, _parent, _scopeId));
						_push(`<span class="hidden max-w-28 truncate md:inline" data-v-bbee28a1${_scopeId}>${ssrInterpolate(unref(auth).user.name)}</span>`);
					} else return [createVNode(Icon_default, { name: "user" }), createVNode("span", { class: "hidden max-w-28 truncate md:inline" }, toDisplayString(unref(auth).user.name), 1)];
				}),
				_: 1
			}, _parent));
			else _push(ssrRenderNuxtLink(NuxtLink, {
				to: unref(localePath)("login"),
				class: "btn btn-primary",
				"aria-label": unref(t)("nav.login")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(Icon_default, {
							name: "user",
							class: "sm:hidden"
						}, null, _parent, _scopeId));
						_push(`<span class="hidden sm:inline" data-v-bbee28a1${_scopeId}>${ssrInterpolate(unref(t)("nav.login"))}</span>`);
					} else return [createVNode(Icon_default, {
						name: "user",
						class: "sm:hidden"
					}), createVNode("span", { class: "hidden sm:inline" }, toDisplayString(unref(t)("nav.login")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></header>`);
		};
	}
});
// app/components/AppHeader.vue
var _sfc_setup$2 = AppHeader_vue_vue_type_script_setup_true_lang_default.setup;
AppHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var AppHeader_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(AppHeader_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-bbee28a1"]]), { __name: "AppHeader" });
// app/components/SettingsDialog.vue?vue&type=script&setup=true&lang.ts
var SettingsDialog_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SettingsDialog",
	__ssrInlineRender: true,
	props: { open: { type: Boolean } },
	emits: ["close"],
	setup(__props) {
		const { t, locale, locales, setLocale } = useI18n();
		const settings = useSettingsStore();
		const THEMES = [
			"system",
			"light",
			"dark"
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(BaseDialog_default, mergeProps({
				open: __props.open,
				title: unref(t)("settings.title"),
				onClose: ($event) => _ctx.$emit("close")
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-5"${_scopeId}><fieldset${_scopeId}><legend class="field-label"${_scopeId}>${ssrInterpolate(unref(t)("settings.theme"))}</legend><div class="grid grid-cols-3 gap-2"${_scopeId}><!--[-->`);
						ssrRenderList$2(THEMES, (choice) => {
							_push(`<label class="btn cursor-pointer has-checked:border-blue-600 has-checked:bg-blue-50 has-checked:text-blue-800 has-focus-visible:outline-2 dark:has-checked:bg-slate-700 dark:has-checked:text-blue-200"${_scopeId}><input${includeBooleanAttr(ssrLooseEqual(unref(settings).theme, choice)) ? " checked" : ""} type="radio" name="theme"${ssrRenderAttr("value", choice)} class="sr-only"${_scopeId}> ${ssrInterpolate(unref(t)(`settings.${choice}`))}</label>`);
						});
						_push(`<!--]--></div></fieldset><fieldset${_scopeId}><legend class="field-label"${_scopeId}>${ssrInterpolate(unref(t)("settings.language"))}</legend><div class="grid grid-cols-2 gap-2"${_scopeId}><!--[-->`);
						ssrRenderList$2(unref(locales), (item) => {
							_push(`<button type="button"${ssrRenderAttr("lang", item.code)}${ssrRenderAttr("aria-pressed", item.code === unref(locale))} class="${ssrRenderClass([item.code === unref(locale) ? "border-blue-600 bg-blue-50 text-blue-800 dark:bg-slate-700 dark:text-blue-200" : "", "btn"])}"${_scopeId}>${ssrInterpolate(item.name)}</button>`);
						});
						_push(`<!--]--></div></fieldset><label class="flex cursor-pointer items-center gap-3"${_scopeId}><input${includeBooleanAttr(Array.isArray(unref(settings).sound) ? ssrLooseContain(unref(settings).sound, null) : unref(settings).sound) ? " checked" : ""} type="checkbox" class="size-5 accent-blue-600"${_scopeId}><span class="text-sm font-medium"${_scopeId}>${ssrInterpolate(unref(t)("settings.sound"))}</span></label></div>`);
					} else return [createVNode("div", { class: "space-y-5" }, [
						createVNode("fieldset", null, [createVNode("legend", { class: "field-label" }, toDisplayString(unref(t)("settings.theme")), 1), createVNode("div", { class: "grid grid-cols-3 gap-2" }, [(openBlock(), createBlock(Fragment, null, renderList$2(THEMES, (choice) => {
							return createVNode("label", {
								key: choice,
								class: "btn cursor-pointer has-checked:border-blue-600 has-checked:bg-blue-50 has-checked:text-blue-800 has-focus-visible:outline-2 dark:has-checked:bg-slate-700 dark:has-checked:text-blue-200"
							}, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(settings).theme = $event,
								type: "radio",
								name: "theme",
								value: choice,
								class: "sr-only"
							}, null, 8, ["onUpdate:modelValue", "value"]), [[vModelRadio, unref(settings).theme]]), createTextVNode(" " + toDisplayString(unref(t)(`settings.${choice}`)), 1)]);
						}), 64))])]),
						createVNode("fieldset", null, [createVNode("legend", { class: "field-label" }, toDisplayString(unref(t)("settings.language")), 1), createVNode("div", { class: "grid grid-cols-2 gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList$2(unref(locales), (item) => {
							return openBlock(), createBlock("button", {
								key: item.code,
								type: "button",
								class: ["btn", item.code === unref(locale) ? "border-blue-600 bg-blue-50 text-blue-800 dark:bg-slate-700 dark:text-blue-200" : ""],
								lang: item.code,
								"aria-pressed": item.code === unref(locale),
								onClick: ($event) => unref(setLocale)(item.code)
							}, toDisplayString(item.name), 11, [
								"lang",
								"aria-pressed",
								"onClick"
							]);
						}), 128))])]),
						createVNode("label", { class: "flex cursor-pointer items-center gap-3" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(settings).sound = $event,
							type: "checkbox",
							class: "size-5 accent-blue-600"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(settings).sound]]), createVNode("span", { class: "text-sm font-medium" }, toDisplayString(unref(t)("settings.sound")), 1)])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
// app/components/SettingsDialog.vue
var _sfc_setup$1 = SettingsDialog_vue_vue_type_script_setup_true_lang_default.setup;
SettingsDialog_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SettingsDialog.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var SettingsDialog_default = Object.assign(SettingsDialog_vue_vue_type_script_setup_true_lang_default, { __name: "SettingsDialog" });
// app/layouts/default.vue?vue&type=script&setup=true&lang.ts
var default_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "default",
	__ssrInlineRender: true,
	setup(__props) {
		const { t } = useI18n();
		const settingsOpen = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-full flex-col" }, _attrs))}><a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3 focus:shadow-lg dark:focus:bg-slate-900">${ssrInterpolate(unref(t)("app.skip"))}</a>`);
			_push(ssrRenderComponent(AppHeader_default, { onOpenSettings: ($event) => settingsOpen.value = true }, null, _parent));
			_push(`<main id="main" class="flex-1">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main>`);
			_push(ssrRenderComponent(AppFooter_default, null, null, _parent));
			_push(ssrRenderComponent(SettingsDialog_default, {
				open: unref(settingsOpen),
				onClose: ($event) => settingsOpen.value = false
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
// app/layouts/default.vue
var _sfc_setup = default_vue_vue_type_script_setup_true_lang_default.setup;
default_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = default_vue_vue_type_script_setup_true_lang_default;

export { default_default as default };
//# sourceMappingURL=default-pQlgBQmW.mjs.map
