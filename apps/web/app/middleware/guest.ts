/** Pages de connexion / inscription : inutiles si on est déjà connecté. */
export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();
  const localePath = useLocalePath();
  if (auth.isLoggedIn) return navigateTo(localePath('index'));
});
