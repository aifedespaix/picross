/** Pages réservées aux administrateurs (en plus de `auth`). */
export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();
  const localePath = useLocalePath();
  if (!auth.isAdmin) return navigateTo(localePath('index'));
});
