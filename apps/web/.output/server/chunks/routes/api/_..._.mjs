import { d as defineEventHandler, u as useRuntimeConfig, g as getRequestIP, p as proxyRequest } from '../../nitro/nitro.mjs';
import 'unhead/server';
import '../../_/vue.mjs';
import 'unhead/legacy';
import 'unhead/plugins';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'nostics';
import 'vue-router';
import 'node:url';

const _____ = defineEventHandler((event) => {
  const { apiUrl } = useRuntimeConfig(event);
  const target = new URL(event.path, apiUrl);
  const ip = getRequestIP(event, { xForwardedFor: true });
  return proxyRequest(event, target.toString(), {
    headers: ip ? { "x-forwarded-for": ip } : {}
  });
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
