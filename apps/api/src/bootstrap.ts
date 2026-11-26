import { createApp } from './app.ts';
import { createDb, migrateDb } from './db/index.ts';
import { loadEnv } from './env.ts';
import { seedStarterPuzzles } from './seed.ts';

/**
 * Prépare une application prête à servir : configuration, base, migrations, grilles de départ.
 * Partagé entre le serveur Node (`server.ts`) et le déploiement Vercel (l'API est alors embarquée
 * dans le serveur Nuxt). Les migrations et le seed sont idempotents : sans danger à chaque démarrage à froid.
 */
export async function createRuntimeApp(source: Record<string, string | undefined> = process.env) {
  const env = loadEnv(source);
  const { db, close } = await createDb({ url: env.databaseUrl, authToken: env.databaseAuthToken });
  await migrateDb(db);
  const seeded = await seedStarterPuzzles(db);
  if (seeded) console.log(`[api] ${seeded} grilles de départ insérées`);
  return { app: createApp({ db, env }), env, db, close };
}
