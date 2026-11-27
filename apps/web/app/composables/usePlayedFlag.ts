/**
 * Cookie « a déjà joué » : le serveur ne lit pas le localStorage (où vit la progression), donc c'est lui
 * qui permet de rediriger l'accueil vers le parcours sans flash, dès le rendu serveur.
 */
export function usePlayedFlag() {
  return useCookie<boolean>('picross_played', {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
    default: () => false,
  });
}
