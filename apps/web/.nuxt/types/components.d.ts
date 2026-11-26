
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

interface _GlobalComponents {
  AppFooter: typeof import("../../app/components/AppFooter.vue")['default']
  AppHeader: typeof import("../../app/components/AppHeader.vue")['default']
  AuthForm: typeof import("../../app/components/AuthForm.vue")['default']
  BaseDialog: typeof import("../../app/components/BaseDialog.vue")['default']
  Board: typeof import("../../app/components/Board.vue")['default']
  ClueLine: typeof import("../../app/components/ClueLine.vue")['default']
  HeroBoard: typeof import("../../app/components/HeroBoard.vue")['default']
  Icon: typeof import("../../app/components/Icon.vue")['default']
  PuzzleListItem: typeof import("../../app/components/PuzzleListItem.vue")['default']
  SettingsDialog: typeof import("../../app/components/SettingsDialog.vue")['default']
  /**
   * Displays the welcome screen used by new Nuxt projects.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
   */
  NuxtWelcome: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/welcome.vue")['default']
  /**
   * Renders the selected layout around pages or error content.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
   */
  NuxtLayout: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  /**
   * Catches errors from its default slot, on the server and the client, and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  NuxtErrorBoundary: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  /**
   * Catches errors from its default slot, on the server and the client, and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  NuxtErrorBoundary: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  /**
   * Renders its default slot only on the client, with an optional server fallback.
   *
   * @see https://nuxt.com/docs/4.x/api/components/client-only
   */
  ClientOnly: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/client-only")['default']
  /**
   * Renders its content only during development.
   *
   * @see https://nuxt.com/docs/4.x/api/components/dev-only
   */
  DevOnly: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/server-placeholder")['default']
  /**
   * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
   */
  NuxtLink: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-link")['default']
  /**
   * Displays a progress bar during page navigation.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
   */
  NuxtLoadingIndicator: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  /**
   * Formats dates and times consistently across server and client using the user's locale.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
   */
  NuxtTime: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  /**
   * Announces route changes to assistive technologies using the current page title.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
   */
  NuxtRouteAnnouncer: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  /**
   * Announces dynamic content changes to assistive technologies.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
   */
  NuxtAnnouncer: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
  /**
   * Renders an optimized image through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
   */
  NuxtImg: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  /**
   * Renders responsive optimized images through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
   */
  NuxtPicture: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  NuxtLinkLocale: typeof import("../../../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
  SwitchLocalePathLink: typeof import("../../../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
  SchemaOrgArticle: typeof import("#build/schema-org/components")['SchemaOrgArticle']
  SchemaOrgBreadcrumb: typeof import("#build/schema-org/components")['SchemaOrgBreadcrumb']
  SchemaOrgComment: typeof import("#build/schema-org/components")['SchemaOrgComment']
  SchemaOrgDiscussionForumPosting: typeof import("#build/schema-org/components")['SchemaOrgDiscussionForumPosting']
  SchemaOrgEmployerAggregateRating: typeof import("#build/schema-org/components")['SchemaOrgEmployerAggregateRating']
  SchemaOrgEvent: typeof import("#build/schema-org/components")['SchemaOrgEvent']
  SchemaOrgFoodEstablishment: typeof import("#build/schema-org/components")['SchemaOrgFoodEstablishment']
  SchemaOrgHowTo: typeof import("#build/schema-org/components")['SchemaOrgHowTo']
  SchemaOrgImage: typeof import("#build/schema-org/components")['SchemaOrgImage']
  SchemaOrgJobPosting: typeof import("#build/schema-org/components")['SchemaOrgJobPosting']
  SchemaOrgLocalBusiness: typeof import("#build/schema-org/components")['SchemaOrgLocalBusiness']
  SchemaOrgMathSolver: typeof import("#build/schema-org/components")['SchemaOrgMathSolver']
  SchemaOrgOrganization: typeof import("#build/schema-org/components")['SchemaOrgOrganization']
  SchemaOrgPerson: typeof import("#build/schema-org/components")['SchemaOrgPerson']
  SchemaOrgProduct: typeof import("#build/schema-org/components")['SchemaOrgProduct']
  SchemaOrgQuestion: typeof import("#build/schema-org/components")['SchemaOrgQuestion']
  SchemaOrgQuiz: typeof import("#build/schema-org/components")['SchemaOrgQuiz']
  SchemaOrgRecipe: typeof import("#build/schema-org/components")['SchemaOrgRecipe']
  SchemaOrgReview: typeof import("#build/schema-org/components")['SchemaOrgReview']
  SchemaOrgVideo: typeof import("#build/schema-org/components")['SchemaOrgVideo']
  SchemaOrgVacationRental: typeof import("#build/schema-org/components")['SchemaOrgVacationRental']
  SchemaOrgWebPage: typeof import("#build/schema-org/components")['SchemaOrgWebPage']
  SchemaOrgWebSite: typeof import("#build/schema-org/components")['SchemaOrgWebSite']
  SchemaOrgMovie: typeof import("#build/schema-org/components")['SchemaOrgMovie']
  SchemaOrgCourse: typeof import("#build/schema-org/components")['SchemaOrgCourse']
  SchemaOrgItemList: typeof import("#build/schema-org/components")['SchemaOrgItemList']
  SchemaOrgBook: typeof import("#build/schema-org/components")['SchemaOrgBook']
  SchemaOrgSoftwareApp: typeof import("#build/schema-org/components")['SchemaOrgSoftwareApp']
  /**
   * Renders the current page from the `pages/` directory.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
   */
  NuxtPage: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Body']
  /**
   * Renders a non-interactive server component without shipping client-side JavaScript.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
   */
  NuxtIsland: typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAppFooter: LazyComponent<typeof import("../../app/components/AppFooter.vue")['default']>
  LazyAppHeader: LazyComponent<typeof import("../../app/components/AppHeader.vue")['default']>
  LazyAuthForm: LazyComponent<typeof import("../../app/components/AuthForm.vue")['default']>
  LazyBaseDialog: LazyComponent<typeof import("../../app/components/BaseDialog.vue")['default']>
  LazyBoard: LazyComponent<typeof import("../../app/components/Board.vue")['default']>
  LazyClueLine: LazyComponent<typeof import("../../app/components/ClueLine.vue")['default']>
  LazyHeroBoard: LazyComponent<typeof import("../../app/components/HeroBoard.vue")['default']>
  LazyIcon: LazyComponent<typeof import("../../app/components/Icon.vue")['default']>
  LazyPuzzleListItem: LazyComponent<typeof import("../../app/components/PuzzleListItem.vue")['default']>
  LazySettingsDialog: LazyComponent<typeof import("../../app/components/SettingsDialog.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtWelcome>`.
   *
   * Displays the welcome screen used by new Nuxt projects.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
   */
  LazyNuxtWelcome: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtLayout>`.
   *
   * Renders the selected layout around pages or error content.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
   */
  LazyNuxtLayout: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  /**
   * Lazy-loaded version of `<NuxtErrorBoundary>`.
   *
   * Catches errors from its default slot, on the server and the client, and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtErrorBoundary>`.
   *
   * Catches errors from its default slot, on the server and the client, and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  /**
   * Lazy-loaded version of `<ClientOnly>`.
   *
   * Renders its default slot only on the client, with an optional server fallback.
   *
   * @see https://nuxt.com/docs/4.x/api/components/client-only
   */
  LazyClientOnly: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/client-only")['default']>
  /**
   * Lazy-loaded version of `<DevOnly>`.
   *
   * Renders its content only during development.
   *
   * @see https://nuxt.com/docs/4.x/api/components/dev-only
   */
  LazyDevOnly: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  /**
   * Lazy-loaded version of `<NuxtLink>`.
   *
   * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
   */
  LazyNuxtLink: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  /**
   * Lazy-loaded version of `<NuxtLoadingIndicator>`.
   *
   * Displays a progress bar during page navigation.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
   */
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  /**
   * Lazy-loaded version of `<NuxtTime>`.
   *
   * Formats dates and times consistently across server and client using the user's locale.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
   */
  LazyNuxtTime: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtRouteAnnouncer>`.
   *
   * Announces route changes to assistive technologies using the current page title.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
   */
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  /**
   * Lazy-loaded version of `<NuxtAnnouncer>`.
   *
   * Announces dynamic content changes to assistive technologies.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
   */
  LazyNuxtAnnouncer: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
  /**
   * Lazy-loaded version of `<NuxtImg>`.
   *
   * Renders an optimized image through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
   */
  LazyNuxtImg: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  /**
   * Lazy-loaded version of `<NuxtPicture>`.
   *
   * Renders responsive optimized images through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
   */
  LazyNuxtPicture: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyNuxtLinkLocale: LazyComponent<typeof import("../../../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
  LazySwitchLocalePathLink: LazyComponent<typeof import("../../../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
  LazySchemaOrgArticle: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgArticle']>
  LazySchemaOrgBreadcrumb: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgBreadcrumb']>
  LazySchemaOrgComment: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgComment']>
  LazySchemaOrgDiscussionForumPosting: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgDiscussionForumPosting']>
  LazySchemaOrgEmployerAggregateRating: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgEmployerAggregateRating']>
  LazySchemaOrgEvent: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgEvent']>
  LazySchemaOrgFoodEstablishment: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgFoodEstablishment']>
  LazySchemaOrgHowTo: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgHowTo']>
  LazySchemaOrgImage: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgImage']>
  LazySchemaOrgJobPosting: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgJobPosting']>
  LazySchemaOrgLocalBusiness: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgLocalBusiness']>
  LazySchemaOrgMathSolver: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgMathSolver']>
  LazySchemaOrgOrganization: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgOrganization']>
  LazySchemaOrgPerson: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgPerson']>
  LazySchemaOrgProduct: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgProduct']>
  LazySchemaOrgQuestion: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgQuestion']>
  LazySchemaOrgQuiz: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgQuiz']>
  LazySchemaOrgRecipe: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgRecipe']>
  LazySchemaOrgReview: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgReview']>
  LazySchemaOrgVideo: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgVideo']>
  LazySchemaOrgVacationRental: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgVacationRental']>
  LazySchemaOrgWebPage: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgWebPage']>
  LazySchemaOrgWebSite: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgWebSite']>
  LazySchemaOrgMovie: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgMovie']>
  LazySchemaOrgCourse: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgCourse']>
  LazySchemaOrgItemList: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgItemList']>
  LazySchemaOrgBook: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgBook']>
  LazySchemaOrgSoftwareApp: LazyComponent<typeof import("#build/schema-org/components")['SchemaOrgSoftwareApp']>
  /**
   * Lazy-loaded version of `<NuxtPage>`.
   *
   * Renders the current page from the `pages/` directory.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
   */
  LazyNuxtPage: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/components")['Body']>
  /**
   * Lazy-loaded version of `<NuxtIsland>`.
   *
   * Renders a non-interactive server component without shipping client-side JavaScript.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
   */
  LazyNuxtIsland: LazyComponent<typeof import("../../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
