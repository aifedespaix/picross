import { a as defineEventHandler } from '../nitro/nitro.mjs';
import { s as sitemapIndexXmlEventHandler } from '../_/event-handlers.mjs';
import 'unhead/server';
import '../_/vue.mjs';
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

const sitemap_index_xml = defineEventHandler(sitemapIndexXmlEventHandler);

export { sitemap_index_xml as default };
//# sourceMappingURL=sitemap_index.xml.mjs.map
