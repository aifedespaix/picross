import { and, eq, isNull, sql } from 'drizzle-orm';
import { fromBits, rateDifficulty, STARTER_PUZZLES, starterBits } from '@picross/shared';
import type { Db } from './db/index.ts';
import { meta, picrosses } from './db/schema.ts';

/**
 * À incrémenter quand on ajoute des grilles à `STARTER_PUZZLES` : l'insertion est rejouée au prochain
 * démarrage, mais seules les grilles dont le `slug` manque en base sont ajoutées (jamais de doublon).
 * Une grille livrée supprimée par un admin ne réapparaît donc qu'à la prochaine montée de version.
 */
export const STARTERS_VERSION = 2;
const KEY = 'starters_version';

/** Insère les grilles livrées avec l'application pour que le jeu soit jouable tout de suite. */
export async function seedStarterPuzzles(db: Db): Promise<number> {
  const current = Number((await db.select().from(meta).where(eq(meta.key, KEY)).get())?.value ?? 0);
  if (current >= STARTERS_VERSION) return 0;

  return db.transaction(async (tx) => {
    // Anciennes grilles de départ (avant les slugs) : sans auteur ni slug, on les remplace.
    tx.delete(picrosses)
      .where(and(isNull(picrosses.authorId), isNull(picrosses.slug)))
      .run();

    const known = new Set(
      (await tx.select({ slug: picrosses.slug }).from(picrosses).all()).map((row) => row.slug),
    );
    let inserted = 0;
    for (const puzzle of STARTER_PUZZLES) {
      if (known.has(puzzle.slug)) continue;
      const bits = starterBits(puzzle.rows);
      await tx
        .insert(picrosses)
        .values({
          slug: puzzle.slug,
          title: puzzle.fr,
          titleEn: puzzle.en,
          difficulty: rateDifficulty(fromBits(bits)).level,
          map: JSON.stringify(bits),
          width: bits[0]!.length,
          height: bits.length,
          validated: true,
          authorId: null,
        })
        .run();
      inserted++;
    }
    await tx
      .insert(meta)
      .values({ key: KEY, value: String(STARTERS_VERSION) })
      .onConflictDoUpdate({ target: meta.key, set: { value: sql`excluded.value` } })
      .run();
    return inserted;
  });
}
