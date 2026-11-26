import { a as defineEventHandler } from '../../nitro/nitro.mjs';
import { a as sitemapChildXmlEventHandler } from '../../_/event-handlers.mjs';
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
import 'consola';
import 'sitemapd/parse';

const _sitemap__xml = defineEventHandler(sitemapChildXmlEventHandler);

export { _sitemap__xml as default };
//# sourceMappingURL=_sitemap_.xml.mjs.map
