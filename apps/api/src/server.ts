import { serve } from '@hono/node-server';
import { createRuntimeApp } from './bootstrap.ts';

const { app, env, close } = await createRuntimeApp();

const server = serve({ fetch: app.fetch, port: env.port }, (info) => {
  console.log(`[api] à l'écoute sur :${info.port} (${env.nodeEnv})`);
});

function shutdown(signal: string) {
  console.log(`[api] ${signal} reçu, arrêt…`);
  server.close(() => {
    close();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
