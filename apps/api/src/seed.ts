import { STARTER_PUZZLES, starterBits } from '@picross/shared';
import { picrosses } from './db/schema.ts';
import type { Db } from './db/index.ts';

/** Au premier démarrage, insère les grilles livrées avec l'application pour que le jeu soit jouable tout de suite. */
export function seedStarterPuzzles(db: Db): number {
  const existing = db.select({ id: picrosses.id }).from(picrosses).limit(1).get();
  if (existing) return 0;
  for (const puzzle of STARTER_PUZZLES) {
    const bits = starterBits(puzzle.rows);
    db.insert(picrosses)
      .values({
        title: puzzle.title,
        map: JSON.stringify(bits),
        width: bits[0]!.length,
        height: bits.length,
        validated: true,
        authorId: null,
      })
      .run();
  }
  return STARTER_PUZZLES.length;
}
