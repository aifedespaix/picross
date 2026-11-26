import { a as defineEventHandler, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
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

function defineSitemapEventHandler(handler) {
  return defineEventHandler(handler);
}

const urls = defineSitemapEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig(event);
  const items = [];
  const LIMIT = 50;
  try {
    for (let offset = 0; offset < 5e3; offset += LIMIT) {
      const page = await $fetch(`${apiUrl}/api/picrosses`, {
        query: { limit: LIMIT, offset }
      });
      items.push(...page.items);
      if (items.length >= page.total || page.items.length === 0) break;
    }
  } catch {
    return [];
  }
  return items.flatMap((puzzle) => {
    const fr = `/jouer/${puzzle.id}`;
    const en = `/en/play/${puzzle.id}`;
    const alternatives = [
      { hreflang: "fr", href: fr },
      { hreflang: "en", href: en },
      { hreflang: "x-default", href: fr }
    ];
    return [
      { loc: fr, lastmod: puzzle.createdAt, alternatives },
      { loc: en, lastmod: puzzle.createdAt, alternatives }
    ];
  });
});

export { urls as default };
//# sourceMappingURL=urls.mjs.map
