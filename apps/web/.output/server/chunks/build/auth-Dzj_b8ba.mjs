import { d as defineNuxtRouteMiddleware, u as useAuthStore, a as useLocalePath, n as navigateTo } from '../virtual/entry.mjs';
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
import '../_/vue.mjs';
import 'unhead/legacy';
import 'unhead/plugins';
import 'node:events';
import 'node:crypto';
import 'nostics';
import 'pinia';

// app/middleware/auth.ts
/** Pages réservées aux connectés (`definePageMeta({ middleware: 'auth' })`). */
var auth_default = defineNuxtRouteMiddleware((to) => {
	const auth = useAuthStore();
	const localePath = useLocalePath();
	if (!auth.isLoggedIn) return navigateTo({
		path: localePath("login"),
		query: { redirect: to.fullPath }
	});
});

export { auth_default as default };
//# sourceMappingURL=auth-Dzj_b8ba.mjs.map
