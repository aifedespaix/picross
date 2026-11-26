
import type { DefineComponent, SlotsType, VNodeProps } from 'vue'

type IslandSerialized<T> = T extends string | number | boolean | null | undefined
  ? T
  : T extends ((...args: any[]) => any) | Date | Map<any, any> | Set<any> | RegExp | bigint | symbol
    ? never
    : T extends object
      ? { [K in keyof T]: IslandSerialized<T[K]> }
      : T
type IslandProps<T> = T extends new (...args: any) => { $props: infer P }
  ? new () => { $props: { [K in keyof P]: K extends `on${Capitalize<string>}` | keyof VNodeProps ? P[K] : P[K] & IslandSerialized<P[K]> } }
  : unknown
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T & IslandProps<T>


type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AppFooter: typeof import("../app/components/AppFooter.vue")['default']
export const AppHeader: typeof import("../app/components/AppHeader.vue")['default']
export const AuthForm: typeof import("../app/components/AuthForm.vue")['default']
export const BaseDialog: typeof import("../app/components/BaseDialog.vue")['default']
export const Board: typeof import("../app/components/Board.vue")['default']
export const ClueLine: typeof import("../app/components/ClueLine.vue")['default']
export const HeroBoard: typeof import("../app/components/HeroBoard.vue")['default']
export const Icon: typeof import("../app/components/Icon.vue")['default']
export const PuzzleListItem: typeof import("../app/components/PuzzleListItem.vue")['default']
export const SettingsDialog: typeof import("../app/components/SettingsDialog.vue")['default']
/**
 * Displays the welcome screen used by new Nuxt projects.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
 */
export const NuxtWelcome: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/welcome.vue")['default']
/**
 * Renders the selected layout around pages or error content.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
 */
export const NuxtLayout: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
/**
 * Catches errors from its default slot, on the server and the client, and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const NuxtErrorBoundary: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
/**
 * Catches errors from its default slot, on the server and the client, and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const NuxtErrorBoundary: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
/**
 * Renders its default slot only on the client, with an optional server fallback.
 *
 * @see https://nuxt.com/docs/4.x/api/components/client-only
 */
export const ClientOnly: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/client-only")['default']
/**
 * Renders its content only during development.
 *
 * @see https://nuxt.com/docs/4.x/api/components/dev-only
 */
export const DevOnly: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/server-placeholder")['default']
/**
 * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
 */
export const NuxtLink: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-link")['default']
/**
 * Displays a progress bar during page navigation.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
 */
export const NuxtLoadingIndicator: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
/**
 * Formats dates and times consistently across server and client using the user's locale.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
 */
export const NuxtTime: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
/**
 * Announces route changes to assistive technologies using the current page title.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
 */
export const NuxtRouteAnnouncer: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
/**
 * Announces dynamic content changes to assistive technologies.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
 */
export const NuxtAnnouncer: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
/**
 * Renders an optimized image through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
 */
export const NuxtImg: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
/**
 * Renders responsive optimized images through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
 */
export const NuxtPicture: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtLinkLocale: typeof import("../../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
export const SwitchLocalePathLink: typeof import("../../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
export const SchemaOrgArticle: typeof import("#build/schema-org/components")['SchemaOrgArticle']
export const SchemaOrgBreadcrumb: typeof import("#build/schema-org/components")['SchemaOrgBreadcrumb']
export const SchemaOrgComment: typeof import("#build/schema-org/components")['SchemaOrgComment']
export const SchemaOrgDiscussionForumPosting: typeof import("#build/schema-org/components")['SchemaOrgDiscussionForumPosting']
export const SchemaOrgEmployerAggregateRating: typeof import("#build/schema-org/components")['SchemaOrgEmployerAggregateRating']
export const SchemaOrgEvent: typeof import("#build/schema-org/components")['SchemaOrgEvent']
export const SchemaOrgFoodEstablishment: typeof import("#build/schema-org/components")['SchemaOrgFoodEstablishment']
export const SchemaOrgHowTo: typeof import("#build/schema-org/components")['SchemaOrgHowTo']
export const SchemaOrgImage: typeof import("#build/schema-org/components")['SchemaOrgImage']
export const SchemaOrgJobPosting: typeof import("#build/schema-org/components")['SchemaOrgJobPosting']
export const SchemaOrgLocalBusiness: typeof import("#build/schema-org/components")['SchemaOrgLocalBusiness']
export const SchemaOrgMathSolver: typeof import("#build/schema-org/components")['SchemaOrgMathSolver']
export const SchemaOrgOrganization: typeof import("#build/schema-org/components")['SchemaOrgOrganization']
export const SchemaOrgPerson: typeof import("#build/schema-org/components")['SchemaOrgPerson']
export const SchemaOrgProduct: typeof import("#build/schema-org/components")['SchemaOrgProduct']
export const SchemaOrgQuestion: typeof import("#build/schema-org/components")['SchemaOrgQuestion']
export const SchemaOrgQuiz: typeof import("#build/schema-org/components")['SchemaOrgQuiz']
export const SchemaOrgRecipe: typeof import("#build/schema-org/components")['SchemaOrgRecipe']
export const SchemaOrgReview: typeof import("#build/schema-org/components")['SchemaOrgReview']
export const SchemaOrgVideo: typeof import("#build/schema-org/components")['SchemaOrgVideo']
export const SchemaOrgVacationRental: typeof import("#build/schema-org/components")['SchemaOrgVacationRental']
export const SchemaOrgWebPage: typeof import("#build/schema-org/components")['SchemaOrgWebPage']
export const SchemaOrgWebSite: typeof import("#build/schema-org/components")['SchemaOrgWebSite']
export const SchemaOrgMovie: typeof import("#build/schema-org/components")['SchemaOrgMovie']
export const SchemaOrgCourse: typeof import("#build/schema-org/components")['SchemaOrgCourse']
export const SchemaOrgItemList: typeof import("#build/schema-org/components")['SchemaOrgItemList']
export const SchemaOrgBook: typeof import("#build/schema-org/components")['SchemaOrgBook']
export const SchemaOrgSoftwareApp: typeof import("#build/schema-org/components")['SchemaOrgSoftwareApp']
/**
 * Renders the current page from the `pages/` directory.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
 */
export const NuxtPage: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Body']
/**
 * Renders a non-interactive server component without shipping client-side JavaScript.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
 */
export const NuxtIsland: typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAppFooter: LazyComponent<typeof import("../app/components/AppFooter.vue")['default']>
export const LazyAppHeader: LazyComponent<typeof import("../app/components/AppHeader.vue")['default']>
export const LazyAuthForm: LazyComponent<typeof import("../app/components/AuthForm.vue")['default']>
export const LazyBaseDialog: LazyComponent<typeof import("../app/components/BaseDialog.vue")['default']>
export const LazyBoard: LazyComponent<typeof import("../app/components/Board.vue")['default']>
export const LazyClueLine: LazyComponent<typeof import("../app/components/ClueLine.vue")['default']>
export const LazyHeroBoard: LazyComponent<typeof import("../app/components/HeroBoard.vue")['default']>
export const LazyIcon: LazyComponent<typeof import("../app/components/Icon.vue")['default']>
export const LazyPuzzleListItem: LazyComponent<typeof import("../app/components/PuzzleListItem.vue")['default']>
export const LazySettingsDialog: LazyComponent<typeof import("../app/components/SettingsDialog.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtWelcome>`.
 *
 * Displays the welcome screen used by new Nuxt projects.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
 */
export const LazyNuxtWelcome: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtLayout>`.
 *
 * Renders the selected layout around pages or error content.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
 */
export const LazyNuxtLayout: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
/**
 * Lazy-loaded version of `<NuxtErrorBoundary>`.
 *
 * Catches errors from its default slot, on the server and the client, and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtErrorBoundary>`.
 *
 * Catches errors from its default slot, on the server and the client, and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
/**
 * Lazy-loaded version of `<ClientOnly>`.
 *
 * Renders its default slot only on the client, with an optional server fallback.
 *
 * @see https://nuxt.com/docs/4.x/api/components/client-only
 */
export const LazyClientOnly: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/client-only")['default']>
/**
 * Lazy-loaded version of `<DevOnly>`.
 *
 * Renders its content only during development.
 *
 * @see https://nuxt.com/docs/4.x/api/components/dev-only
 */
export const LazyDevOnly: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
/**
 * Lazy-loaded version of `<NuxtLink>`.
 *
 * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
 */
export const LazyNuxtLink: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
/**
 * Lazy-loaded version of `<NuxtLoadingIndicator>`.
 *
 * Displays a progress bar during page navigation.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
 */
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
/**
 * Lazy-loaded version of `<NuxtTime>`.
 *
 * Formats dates and times consistently across server and client using the user's locale.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
 */
export const LazyNuxtTime: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtRouteAnnouncer>`.
 *
 * Announces route changes to assistive technologies using the current page title.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
 */
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
/**
 * Lazy-loaded version of `<NuxtAnnouncer>`.
 *
 * Announces dynamic content changes to assistive technologies.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
 */
export const LazyNuxtAnnouncer: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
/**
 * Lazy-loaded version of `<NuxtImg>`.
 *
 * Renders an optimized image through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
 */
export const LazyNuxtImg: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
/**
 * Lazy-loaded version of `<NuxtPicture>`.
 *
 * Renders responsive optimized images through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
 */
export const LazyNuxtPicture: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtLinkLocale: LazyComponent<typeof import("../../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
export const LazySwitchLocalePathLink: LazyComponent<typeof import("../../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
export const LazySchemaOrgArticle: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgArticle']>
export const LazySchemaOrgBreadcrumb: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgBreadcrumb']>
export const LazySchemaOrgComment: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgComment']>
export const LazySchemaOrgDiscussionForumPosting: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgDiscussionForumPosting']>
export const LazySchemaOrgEmployerAggregateRating: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgEmployerAggregateRating']>
export const LazySchemaOrgEvent: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgEvent']>
export const LazySchemaOrgFoodEstablishment: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgFoodEstablishment']>
export const LazySchemaOrgHowTo: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgHowTo']>
export const LazySchemaOrgImage: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgImage']>
export const LazySchemaOrgJobPosting: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgJobPosting']>
export const LazySchemaOrgLocalBusiness: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgLocalBusiness']>
export const LazySchemaOrgMathSolver: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgMathSolver']>
export const LazySchemaOrgOrganization: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgOrganization']>
export const LazySchemaOrgPerson: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgPerson']>
export const LazySchemaOrgProduct: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgProduct']>
export const LazySchemaOrgQuestion: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgQuestion']>
export const LazySchemaOrgQuiz: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgQuiz']>
export const LazySchemaOrgRecipe: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgRecipe']>
export const LazySchemaOrgReview: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgReview']>
export const LazySchemaOrgVideo: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgVideo']>
export const LazySchemaOrgVacationRental: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgVacationRental']>
export const LazySchemaOrgWebPage: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgWebPage']>
export const LazySchemaOrgWebSite: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgWebSite']>
export const LazySchemaOrgMovie: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgMovie']>
export const LazySchemaOrgCourse: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgCourse']>
export const LazySchemaOrgItemList: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgItemList']>
export const LazySchemaOrgBook: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgBook']>
export const LazySchemaOrgSoftwareApp: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgSoftwareApp']>
/**
 * Lazy-loaded version of `<NuxtPage>`.
 *
 * Renders the current page from the `pages/` directory.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
 */
export const LazyNuxtPage: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Body']>
/**
 * Lazy-loaded version of `<NuxtIsland>`.
 *
 * Renders a non-interactive server component without shipping client-side JavaScript.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
 */
export const LazyNuxtIsland: LazyComponent<typeof import("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
