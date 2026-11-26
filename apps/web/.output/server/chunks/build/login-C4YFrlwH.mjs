import { b as useI18n, f as useHead } from '../virtual/entry.mjs';
import { A as AuthForm_default } from './AuthForm-sn9DL4lW.mjs';
import { y as defineComponent, m as ssrRenderComponent, W as mergeProps, Z as useSSRContext } from '../_/vue.mjs';
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
import './Icon-BotjH7zm.mjs';
import './useFormErrors-8fixJtZx.mjs';

// app/pages/login.vue?vue&type=script&setup=true&lang.ts
var login_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "login",
	__ssrInlineRender: true,
	setup(__props) {
		const { t } = useI18n();
		useHead({
			title: () => t("nav.login"),
			meta: [{
				name: "robots",
				content: "noindex, nofollow"
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(AuthForm_default, mergeProps({ mode: "login" }, _attrs), null, _parent));
		};
	}
});
// app/pages/login.vue
var _sfc_setup = login_vue_vue_type_script_setup_true_lang_default.setup;
login_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var login_default = login_vue_vue_type_script_setup_true_lang_default;

export { login_default as default };
//# sourceMappingURL=login-C4YFrlwH.mjs.map
