import type { PicrossSummary } from '@picross/shared';

interface Page {
  items: PicrossSummary[];
  total: number;
}

/** Ajoute au sitemap chaque grille publique (FR + EN, avec les liens hreflang croisés). */
export default defineSitemapEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig(event);
  const items: PicrossSummary[] = [];
  const LIMIT = 50;

  try {
    for (let offset = 0; offset < 5000; offset += LIMIT) {
      const page = await $fetch<Page>(`${apiUrl}/api/picrosses`, {
        query: { limit: LIMIT, offset },
      });
      items.push(...page.items);
      if (items.length >= page.total || page.items.length === 0) break;
    }
  } catch {
    return []; // API indisponible : on sert le sitemap sans les grilles plutôt qu'une erreur
  }

  return items.flatMap((puzzle) => {
    const fr = `/jouer/${puzzle.id}`;
    const en = `/en/play/${puzzle.id}`;
    const alternatives = [
      { hreflang: 'fr', href: fr },
      { hreflang: 'en', href: en },
      { hreflang: 'x-default', href: fr },
    ];
    return [
      { loc: fr, lastmod: puzzle.createdAt, alternatives },
      { loc: en, lastmod: puzzle.createdAt, alternatives },
    ];
  });
});
