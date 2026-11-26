/**
 * Proxy /api/* vers le service API interne. Le navigateur ne parle qu'au serveur Nuxt :
 * une seule origine (pas de CORS, cookies de session « SameSite=Lax »), l'API n'est jamais exposée.
 * Les appels faits pendant le SSR (useFetch / useRequestFetch) passent aussi par ici, cookies compris.
 */
export default defineEventHandler((event) => {
  const { apiUrl } = useRuntimeConfig(event);
  const target = new URL(event.path, apiUrl);
  // L'API s'en sert pour son rate limiting (TRUST_PROXY=true) : il lui faut l'IP du visiteur réel.
  const ip = getRequestIP(event, { xForwardedFor: true });
  return proxyRequest(event, target.toString(), {
    headers: ip ? { 'x-forwarded-for': ip } : {},
  });
});
