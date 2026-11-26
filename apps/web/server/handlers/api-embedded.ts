import { createRuntimeApp } from '@picross/api/bootstrap';

/**
 * Mode « API embarquée » (Vercel) : l'application Hono tourne DANS le serveur Nuxt, au lieu d'être un
 * service séparé. Un seul déploiement, aucun saut réseau, aucune URL d'API à exposer.
 * La base, les migrations et les grilles de départ sont préparées une fois par instance (démarrage à froid).
 */
let ready: ReturnType<typeof createRuntimeApp> | undefined;

export default defineEventHandler(async (event) => {
  // En cas d'échec (base injoignable…), on retente à la requête suivante plutôt que de rester bloqué.
  ready ??= createRuntimeApp(process.env).catch((error) => {
    ready = undefined;
    throw error;
  });
  const { app } = await ready;
  return sendWebResponse(event, await app.fetch(toWebRequest(event)));
});
