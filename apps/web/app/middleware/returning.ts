/**
 * Un joueur qui a déjà joué ne revoit pas la page de présentation à l'ouverture de l'application : `/`
 * mène au parcours. Uniquement au chargement serveur (ouverture, rafraîchissement) : le logo et le lien
 * « Accueil » du pied de page, eux, naviguent côté client et affichent toujours la présentation.
 * Les robots n'ont pas le cookie : la page reste indexée.
 */
export default defineNuxtRouteMiddleware(() => {
  if (!import.meta.server) return;
  if (usePlayedFlag().value) return navigateTo(useLocalePath()('journey'), { redirectCode: 302 });
});
