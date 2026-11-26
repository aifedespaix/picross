import { serve } from '@hono/node-server';
import { createApp } from './app.ts';
import { createDb } from './db/index.ts';
import { loadEnv } from './env.ts';
import { seedStarterPuzzles } from './seed.ts';

const env = loadEnv();
const { db, sqlite } = createDb(env.databasePath);

const seeded = seedStarterPuzzles(db);
if (seeded) console.log(`[api] ${seeded} grilles de départ insérées`);

const server = serve({ fetch: createApp({ db, env }).fetch, port: env.port }, (info) => {
  console.log(`[api] à l'écoute sur :${info.port} (${env.nodeEnv})`);
});

function shutdown(signal: string) {
  console.log(`[api] ${signal} reçu, arrêt…`);
  server.close(() => {
    sqlite.close();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
