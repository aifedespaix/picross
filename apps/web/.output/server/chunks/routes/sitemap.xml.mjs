import { a as defineEventHandler } from '../nitro/nitro.mjs';
import { b as sitemapXmlEventHandler } from '../_/event-handlers.mjs';
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

const sitemap_xml = defineEventHandler(sitemapXmlEventHandler);

export { sitemap_xml as default };
//# sourceMappingURL=sitemap.xml.mjs.map
