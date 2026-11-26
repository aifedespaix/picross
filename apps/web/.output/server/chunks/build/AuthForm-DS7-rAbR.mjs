import { b as useI18n, e as useRoute, a as useLocalePath, u as useAuthStore, s as ssrRenderNuxtLink, N as NuxtLink } from '../virtual/entry.mjs';
import { I as Icon_default } from './Icon-BotjH7zm.mjs';
import { u as useFormErrors } from './useFormErrors-4w1-3u6s.mjs';
import { y as defineComponent, n as ssrRenderAttrs, W as mergeProps, N as ssrInterpolate, u as unref, $ as ssrRenderAttr, ab as ssrRenderDynamicModel, m as ssrRenderComponent, a1 as includeBooleanAttr, M as withCtx, O as createTextVNode, P as toDisplayString, b as reactive, l as ref, x as computed, Z as useSSRContext } from '../_/vue.mjs';

// app/components/AuthForm.vue?vue&type=script&setup=true&lang.ts
var AuthForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AuthForm",
	__ssrInlineRender: true,
	props: { mode: {} },
	setup(__props) {
		const props = __props;
		const { t } = useI18n();
		const route = useRoute();
		const localePath = useLocalePath();
		useAuthStore();
		const { fields, formError} = useFormErrors();
		const form = reactive({
			name: "",
			email: "",
			password: ""
		});
		const showPassword = ref(false);
		const submitting = ref(false);
		const isRegister = computed(() => props.mode === "register");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-sm p-4 pt-8" }, _attrs))}><h1 class="mb-6 text-2xl font-bold">${ssrInterpolate(isRegister.value ? unref(t)("auth.registerTitle") : unref(t)("auth.loginTitle"))}</h1><form class="card space-y-4" novalidate>`);
			if (isRegister.value) {
				_push(`<div><label for="name" class="field-label">${ssrInterpolate(unref(t)("auth.name"))}</label><input id="name"${ssrRenderAttr("value", form.name)} class="field-input" type="text" autocomplete="username"${ssrRenderAttr("aria-invalid", !!unref(fields).name)}${ssrRenderAttr("aria-describedby", unref(fields).name ? "name-error" : void 0)}>`);
				if (unref(fields).name) _push(`<p id="name-error" class="field-error">${ssrInterpolate(unref(fields).name)}</p>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<div><label for="email" class="field-label">${ssrInterpolate(unref(t)("auth.email"))}</label><input id="email"${ssrRenderAttr("value", form.email)} class="field-input" type="email" inputmode="email" autocomplete="email"${ssrRenderAttr("aria-invalid", !!unref(fields).email)}${ssrRenderAttr("aria-describedby", unref(fields).email ? "email-error" : void 0)}>`);
			if (unref(fields).email) _push(`<p id="email-error" class="field-error">${ssrInterpolate(unref(fields).email)}</p>`);
			else _push(`<!---->`);
			_push(`</div><div><label for="password" class="field-label">${ssrInterpolate(unref(t)("auth.password"))}</label><div class="relative"><input id="password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", form.password, null)} class="field-input pr-12"${ssrRenderAttr("type", showPassword.value ? "text" : "password")}${ssrRenderAttr("autocomplete", isRegister.value ? "new-password" : "current-password")}${ssrRenderAttr("aria-invalid", !!unref(fields).password)}${ssrRenderAttr("aria-describedby", unref(fields).password ? "password-error" : isRegister.value ? "password-hint" : void 0)}><button type="button" class="absolute inset-y-0 right-0 grid w-11 place-items-center text-slate-500"${ssrRenderAttr("aria-label", showPassword.value ? unref(t)("auth.hide") : unref(t)("auth.show"))}${ssrRenderAttr("aria-pressed", showPassword.value)}>`);
			_push(ssrRenderComponent(Icon_default, { name: showPassword.value ? "eyeOff" : "eye" }, null, _parent));
			_push(`</button></div>`);
			if (unref(fields).password) _push(`<p id="password-error" class="field-error">${ssrInterpolate(unref(fields).password)}</p>`);
			else if (isRegister.value) _push(`<p id="password-hint" class="mt-1 text-sm text-slate-500">${ssrInterpolate(unref(t)("auth.passwordHint", { min: unref(8) }))}</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (unref(formError)) _push(`<p class="field-error" role="alert">${ssrInterpolate(unref(formError))}</p>`);
			else _push(`<!---->`);
			_push(`<button type="submit" class="btn btn-primary w-full"${includeBooleanAttr(submitting.value) ? " disabled" : ""}>${ssrInterpolate(isRegister.value ? unref(t)("auth.submitRegister") : unref(t)("auth.submitLogin"))}</button></form><p class="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">${ssrInterpolate(isRegister.value ? unref(t)("auth.haveAccount") : unref(t)("auth.noAccount"))} `);
			_push(ssrRenderNuxtLink(NuxtLink, {
				to: {
					path: unref(localePath)(isRegister.value ? "login" : "register"),
					query: unref(route).query
				},
				class: "font-medium text-blue-700 underline dark:text-blue-300"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(isRegister.value ? unref(t)("nav.login") : unref(t)("nav.register"))}`);
					else return [createTextVNode(toDisplayString(isRegister.value ? unref(t)("nav.login") : unref(t)("nav.register")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</p></div>`);
		};
	}
});
// app/components/AuthForm.vue
var _sfc_setup = AuthForm_vue_vue_type_script_setup_true_lang_default.setup;
AuthForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuthForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AuthForm_default = Object.assign(AuthForm_vue_vue_type_script_setup_true_lang_default, { __name: "AuthForm" });

export { AuthForm_default as A };
//# sourceMappingURL=AuthForm-DS7-rAbR.mjs.map
