/**
 * Détermine qui est connecté avant le premier rendu :
 * - serveur : on interroge l'API seulement si un cookie de session est présent (sinon, anonyme) ;
 * - client : l'état est déjà là (transmis par le serveur) ; on ne rappelle l'API qu'en secours.
 */
export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();
  if (auth.ready) return;

  if (import.meta.server) {
    const hasSession = !!useRequestHeaders(['cookie']).cookie?.includes('picross_session=');
    if (hasSession) await auth.init();
    else auth.ready = true;
  } else {
    await auth.init();
  }
});
