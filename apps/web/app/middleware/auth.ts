/** Pages réservées aux connectés (`definePageMeta({ middleware: 'auth' })`). */
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  const localePath = useLocalePath();
  if (!auth.isLoggedIn) {
    return navigateTo({ path: localePath('login'), query: { redirect: to.fullPath } });
  }
});
