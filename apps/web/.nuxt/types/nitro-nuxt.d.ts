
/// <reference path="nitro-layouts.d.ts" />
/// <reference path="shared-app.config.d.ts" />
/// <reference path="runtime-config.d.ts" />
/// <reference path="../../../../node_modules/.pnpm/@nuxt+nitro-server@4.7.0_54552e58eaf430a2b84a7e2a328a6ecc/node_modules/@nuxt/nitro-server/dist/augments.d.mts" />
/// <reference path="nuxtseo-nitro.d.ts" />
/// <reference path="nuxt-sitemap-augments.d.ts" />
/// <reference path="nuxt-robots-nitro.d.ts" />
/// <reference path="../module/nuxt-seo-utils.d.ts" />
/// <reference path="nitro-middleware.d.ts" />
/// <reference path="../schema/nuxt.schema.d.ts" />
/// <reference path="../module/nuxt-site-config.d.ts" />
/// <reference path="nitro-internal-api.d.ts" />

import type { RouteRuleConfigExtensions, RuntimeConfig, RuntimeConfigApp } from 'nuxt/schema'
import type { H3Event } from 'h3'
import type { DevServerLog, NuxtIslandContext, NuxtIslandResponse, NuxtRenderChunkContext, NuxtRenderCloseContext, NuxtRenderDocumentContext, NuxtRenderHTMLContext, NuxtRenderRouteContext } from '#app/types'

declare module 'nitropack' {
  interface NitroRuntimeConfig extends RuntimeConfig {}
  interface NitroRuntimeConfigApp extends RuntimeConfigApp {}
  interface NitroRouteConfig extends RouteRuleConfigExtensions {}
  interface NitroRouteConfig {
    ssr?: boolean
    streaming?: boolean
    noScripts?: boolean
    /** @deprecated Use `noScripts` instead */
    experimentalNoScripts?: boolean
  }
  interface NitroRouteRules {
    ssr?: boolean
    streaming?: boolean
    noScripts?: boolean
    /** @deprecated Use `noScripts` instead */
    experimentalNoScripts?: boolean
    appMiddleware?: Record<string, boolean>
    appLayout?: string | false
  }
  interface NitroRuntimeHooks {
    'dev:ssr-logs': (ctx: { logs: DevServerLog[], path: string }) => void | Promise<void>
    'render:html': (htmlContext: NuxtRenderHTMLContext, context: { event: H3Event, streaming?: boolean }) => void | Promise<void>
    'render:html:chunk': (chunkContext: NuxtRenderChunkContext, context: { event: H3Event }) => void | Promise<void>
    'render:html:close': (closeContext: NuxtRenderCloseContext, context: { event: H3Event }) => void | Promise<void>
    'render:document': (documentContext: NuxtRenderDocumentContext, context: { event: H3Event }) => void | Promise<void>
    'render:route': (renderRouteContext: NuxtRenderRouteContext, context: { event: H3Event }) => void | Promise<void>
    'render:island': (islandResponse: NuxtIslandResponse, context: { event: H3Event, islandContext: NuxtIslandContext }) => void | Promise<void>
  }
}
declare module 'nitropack/types' {
  interface NitroRuntimeConfig extends RuntimeConfig {}
  interface NitroRuntimeConfigApp extends RuntimeConfigApp {}
  interface NitroRouteConfig extends RouteRuleConfigExtensions {}
  interface NitroRouteConfig {
    ssr?: boolean
    streaming?: boolean
    noScripts?: boolean
    /** @deprecated Use `noScripts` instead */
    experimentalNoScripts?: boolean
  }
  interface NitroRouteRules {
    ssr?: boolean
    streaming?: boolean
    noScripts?: boolean
    /** @deprecated Use `noScripts` instead */
    experimentalNoScripts?: boolean
    appMiddleware?: Record<string, boolean>
    appLayout?: string | false
  }
  interface NitroRuntimeHooks {
    'dev:ssr-logs': (ctx: { logs: DevServerLog[], path: string }) => void | Promise<void>
    'render:html': (htmlContext: NuxtRenderHTMLContext, context: { event: H3Event, streaming?: boolean }) => void | Promise<void>
    'render:html:chunk': (chunkContext: NuxtRenderChunkContext, context: { event: H3Event }) => void | Promise<void>
    'render:html:close': (closeContext: NuxtRenderCloseContext, context: { event: H3Event }) => void | Promise<void>
    'render:route': (renderRouteContext: NuxtRenderRouteContext, context: { event: H3Event }) => void | Promise<void>
    'render:island': (islandResponse: NuxtIslandResponse, context: { event: H3Event, islandContext: NuxtIslandContext }) => void | Promise<void>
  }
}
