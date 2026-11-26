import { createApi, type Fetcher } from '@/api/client';

/**
 * Client d'API. Pendant le rendu serveur on utilise `useRequestFetch()` : la requête est routée en
 * interne (sans HTTP) et les cookies du visiteur sont relayés, donc le SSR voit l'utilisateur connecté.
 * La langue courante est transmise pour recevoir les titres des grilles dans la bonne langue.
 * Doit être appelé dans un contexte Nuxt (setup, plugin, middleware, store).
 */
export function useApi() {
  const { $i18n } = useNuxtApp();
  return createApi(useRequestFetch() as unknown as Fetcher, () => $i18n.locale.value);
}
