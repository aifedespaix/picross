import tailwindcss from '@tailwindcss/vite';

/**
 * URL publique du site (canonical, hreflang, sitemap, Open Graph).
 * Renseignée au runtime via NUXT_PUBLIC_SITE_URL (cf. compose.yaml / DEPLOY.md).
 */
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL ?? 'http://localhost:5173';

/**
 * Où tourne l'API ?
 * - Docker / Dokploy : service séparé, relayé par un proxy (NUXT_API_URL).
 * - Vercel (ou API_MODE=embedded) : embarquée dans le serveur Nuxt, sans service à part.
 */
const embeddedApi = process.env.API_MODE === 'embedded' || !!process.env.VERCEL;

/** Pages privées : jamais indexées, absentes du sitemap, interdites aux robots. */
const PRIVATE_PATHS = [
  '/connexion',
  '/inscription',
  '/compte',
  '/creer',
  '/admin',
  '/en/login',
  '/en/register',
  '/en/account',
  '/en/create',
  '/en/admin',
];

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },
  devServer: { port: 5173 },

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    'nuxt-seo-utils',
  ],

  imports: { dirs: ['stores'] },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  build: { transpile: ['@picross/shared'] },

  // --- Configuration runtime (surchargeable par variables NUXT_*) ----------------------------
  runtimeConfig: {
    /** URL interne de l'API (NUXT_API_URL). Dans le compose : http://api:3000 */
    apiUrl: 'http://localhost:3000',
  },

  // --- SEO ----------------------------------------------------------------------------------
  site: {
    url: siteUrl,
    name: 'Picross',
    description: 'Picross en ligne : résolvez des nonogrammes, créez vos grilles et partagez-les.',
    defaultLocale: 'fr',
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#faf9f6' },
        { name: 'color-scheme', content: 'light dark' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/img/icons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
    },
  },
  robots: {
    disallow: ['/api/', ...PRIVATE_PATHS],
  },
  sitemap: {
    // Pages privées + page « grille au hasard » (sans identifiant) hors sitemap ;
    // les grilles publiques sont ajoutées par server/routes/__sitemap__/urls.ts.
    exclude: [...PRIVATE_PATHS, '/jouer', '/en/play'],
    sources: ['/__sitemap__/urls'],
  },
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Picross',
      url: siteUrl,
      logo: '/img/icons/android-chrome-512x512.png',
    },
  },

  // --- Internationalisation : français par défaut sans préfixe, anglais sous /en ---------------
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    // Redirige selon la langue du navigateur UNIQUEMENT sur la racine « / » (bon pour le SEO) ;
    // un choix explicite de l'utilisateur est mémorisé dans le cookie et prime ensuite.
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'picross_lang',
      cookieSecure: process.env.NODE_ENV === 'production',
      redirectOn: 'root',
      fallbackLocale: 'fr',
    },
    // Slugs traduits : /jouer ↔ /en/play, /galerie ↔ /en/gallery…
    customRoutes: 'config',
    pages: {
      'play/[[id]]': { fr: '/jouer/[[id]]', en: '/play/[[id]]' },
      journey: { fr: '/parcours', en: '/journey' },
      gallery: { fr: '/galerie', en: '/gallery' },
      create: { fr: '/creer', en: '/create' },
      profile: { fr: '/compte', en: '/account' },
      login: { fr: '/connexion', en: '/login' },
      register: { fr: '/inscription', en: '/register' },
    },
  },

  // --- En-têtes de sécurité (la CSP, calculée par requête, est dans server/plugins/security.ts) --
  routeRules: {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
    '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
  },
  nitro: {
    compressPublicAssets: true,
    handlers: [
      {
        route: '/api/**',
        handler: embeddedApi
          ? './server/handlers/api-embedded.ts'
          : './server/handlers/api-proxy.ts',
      },
    ],
  },
  experimental: { payloadExtraction: false },
});
