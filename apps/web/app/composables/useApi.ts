import { createApi, type Fetcher } from '@/api/client';

/**
 * Client d'API. Pendant le rendu serveur on utilise `useRequestFetch()` : la requête est routée en
 * interne (sans HTTP) et les cookies du visiteur sont relayés, donc le SSR voit l'utilisateur connecté.
 * Doit être appelé dans un contexte Nuxt (setup, plugin, middleware, store).
 */
export function useApi() {
  return createApi(useRequestFetch() as unknown as Fetcher);
}
