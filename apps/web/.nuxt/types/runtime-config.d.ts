import { RuntimeConfig as UserRuntimeConfig } from 'nuxt/schema'
interface SharedRuntimeConfig {
  appSecret: string,
  app: {
    buildId: string,
    baseURL: string,
    buildAssetsDir: string,
    cdnURL: string,
  },
  apiUrl: string,
  sitemap: {
    cacheMaxAgeSeconds: number,
    debug: boolean,
  },
  "nuxt-schema-org": {
    reactive: boolean,
    minify: boolean,
    scriptAttributes: {
      "data-nuxt-schema-org": boolean,
    },
    identity: {
      type: string,
      name: string,
      url: string,
      logo: string,
    },
    excludeWorkTranslationLocales: Array<any>,
    version: string,
  },
  "nuxt-robots": {
    version: string,
    debug: boolean,
    credits: boolean,
    sitemap: Array<string>,
    header: boolean,
    contentSignalHeader?: any,
    robotsEnabledValue: string,
    robotsDisabledValue: string,
    cacheControl: string,
    botDetection: boolean,
    groups: Array<{
      comment?: Array<any>,
      disallow?: Array<string>,
      allow?: Array<string>,
      userAgent?: Array<string>,
      contentUsage?: Array<any>,
      contentSignal?: Array<any>,
      _indexable?: boolean,
      _rules?: Array<{
        pattern?: string,
        allow?: boolean,
      }>,
      _normalized?: boolean,
    }>,
  },
  "nuxt-site-config": {
    stack: Array<{
      _context?: string,
      _priority?: number,
      env?: string,
    } | {
      _priority?: number,
      _context?: string,
      url?: string,
      name?: string,
      description?: string,
      defaultLocale?: string,
    } | {
      _priority?: number,
      _context?: string,
      defaultLocale?: string,
    }>,
    version: string,
    debug: boolean,
    multiTenancy: Array<any>,
  },
}
interface SharedPublicRuntimeConfig {
  "nuxt-seo-utils-version": string,
  "seo-utils": {
    canonicalQueryWhitelist: Array<string>,
    canonicalLowercase: boolean,
    automaticTwitterTags: boolean,
    tagPriority: string,
    separator?: any,
    titleSeparator?: any,
  },
  i18n: {
    baseUrl: string,
    defaultLocale: string,
    rootRedirect?: any,
    redirectStatusCode: number,
    skipSettingLocaleOnNavigate: boolean,
    locales: Array<{
      code?: string,
      language?: string,
      name?: string,
      domains?: Array<any>,
      defaultForDomains?: Array<any>,
    }>,
    detectBrowserLanguage: {
      alwaysRedirect: boolean,
      cookieCrossOrigin: boolean,
      cookieDomain: any,
      cookieKey: string,
      cookieSecure: boolean,
      fallbackLocale: string,
      redirectOn: string,
      useCookie: boolean,
    },
    experimental: {
      localeDetector: string,
      typedPages: boolean,
      typedOptionsAndMessages: boolean,
      alternateLinkCanonicalQueries: boolean,
      devCache: boolean,
      cacheLifetime?: any,
      stripMessagesPayload: boolean,
      preload: boolean,
      strictSeo: boolean,
      nitroContextDetection: boolean,
      httpCacheDuration: number,
      compactRoutes: boolean,
      prerenderMessages: boolean,
      optimizeMessageBundling: boolean,
    },
    domainLocales: {
      fr: {
        domain: string,
      },
      en: {
        domain: string,
      },
    },
  },
  "nuxt-robots": {
    version: string,
    debug: boolean,
    credits: boolean,
    sitemap: Array<string>,
    header: boolean,
    contentSignalHeader?: any,
    robotsEnabledValue: string,
    robotsDisabledValue: string,
    cacheControl: string,
    botDetection: boolean,
  },
}
declare module 'nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module '@nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: UserRuntimeConfig
        }
      }