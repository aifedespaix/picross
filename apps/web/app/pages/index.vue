<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import HeroBoard from '@/components/HeroBoard.vue';
import DemonEyes from '@/components/DemonEyes.vue';
import Icon from '@/components/Icon.vue';

interface Step {
  title: string;
  text: string;
}
interface Faq {
  q: string;
  a: string;
}

const { t, tm, rt, locale } = useI18n();
const localePath = useLocalePath();
const site = useSiteConfig();

// Les listes (étapes, atouts, FAQ) sont des tableaux dans les fichiers de traduction.
const list = <T extends object>(key: string, fields: (keyof T)[]): T[] =>
  (tm(key) as Record<string, unknown>[]).map((item) =>
    Object.fromEntries(fields.map((f) => [f, rt(item[f as string] as never)])),
  ) as T[];
const steps = computed(() => list<Step>('home.steps', ['title', 'text']));
const features = computed(() => list<Step>('home.features', ['title', 'text']));
const faq = computed(() => list<Faq>('home.faq', ['q', 'a']));

useSeoMeta({
  title: () => t('seo.home.title'),
  titleTemplate: '%s',
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.description'),
});

// Données structurées : site, application jouable gratuite et FAQ (rich results Google).
useSchemaOrg([
  defineWebSite({ name: 'Picross', inLanguage: locale.value }),
  defineWebPage({ name: () => t('seo.home.title'), description: () => t('seo.home.description') }),
  {
    '@type': 'WebApplication',
    name: 'Picross',
    url: site.url,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    inLanguage: ['fr', 'en'],
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
  },
  {
    '@type': 'FAQPage',
    mainEntity: faq.value.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  },
]);
</script>

<template>
  <div>
    <!-- Hero : beaucoup de vide, un titre, une grille. Le rouge tient dans un point. -->
    <section
      class="overflow-hidden bg-gradient-to-b from-white to-pearl dark:from-slate-900 dark:to-ink"
    >
      <div class="mx-auto max-w-4xl px-4 pt-14 pb-10 text-center md:pt-24">
        <p
          class="mb-6 inline-block rounded-full bg-ink/5 px-3 py-1 text-sm font-medium text-ink dark:bg-pearl/10 dark:text-pearl"
        >
          {{ t('home.eyebrow') }}
        </p>
        <h1 class="display text-5xl text-balance sm:text-7xl">
          {{ t('home.title') }}<span class="text-demon">.</span>
        </h1>
        <p
          class="mx-auto mt-6 max-w-xl text-lg text-slate-600 text-pretty sm:text-xl dark:text-slate-300"
        >
          {{ t('home.lead') }}
        </p>
        <div class="mt-9 flex flex-wrap justify-center gap-3">
          <NuxtLink
            :to="localePath('play-id')"
            class="btn btn-primary min-h-12 rounded-full px-7 text-base"
          >
            <Icon name="pencil" /> {{ t('home.play') }}
          </NuxtLink>
          <NuxtLink :to="localePath('gallery')" class="btn min-h-12 rounded-full px-7 text-base">
            <Icon name="grid" /> {{ t('home.gallery') }}
          </NuxtLink>
        </div>
      </div>
      <div class="flex justify-center px-4 pb-20 md:pb-28"><HeroBoard /></div>
    </section>

    <!-- Règles -->
    <section class="mx-auto max-w-5xl px-4 py-20 md:py-28" aria-labelledby="how">
      <h2 id="how" class="display text-center text-4xl sm:text-5xl">{{ t('home.howTitle') }}</h2>
      <p class="mt-3 text-center text-lg text-slate-600 dark:text-slate-400">
        {{ t('home.howLead') }}
      </p>
      <ol class="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        <li v-for="(step, index) in steps" :key="step.title" class="text-center md:text-left">
          <!-- Chaque numéro est un pixel : le dernier est le pixel rond, rouge. -->
          <span
            class="mb-4 inline-grid size-11 place-items-center font-semibold"
            :class="
              index === steps.length - 1
                ? 'rounded-full bg-demon text-white'
                : 'rounded-md bg-ink text-pearl dark:bg-pearl dark:text-ink'
            "
            aria-hidden="true"
          >
            {{ index + 1 }}
          </span>
          <h3 class="text-xl font-semibold">{{ step.title }}</h3>
          <p class="mt-2 text-slate-600 dark:text-slate-400">{{ step.text }}</p>
        </li>
      </ol>
    </section>

    <!-- Atouts : mosaïque -->
    <section class="mx-auto max-w-6xl px-4 pb-20 md:pb-28" aria-labelledby="features">
      <h2 id="features" class="display text-center text-4xl sm:text-5xl">
        {{ t('home.featuresTitle') }}
      </h2>
      <ul class="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
        <li
          v-for="feature in features"
          :key="feature.title"
          class="rounded-3xl bg-white p-7 shadow-xs ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10"
        >
          <h3 class="text-xl font-semibold">{{ feature.title }}</h3>
          <p class="mt-2 text-slate-600 dark:text-slate-400">{{ feature.text }}</p>
        </li>
      </ul>
    </section>

    <!-- FAQ -->
    <section class="mx-auto max-w-3xl px-4 pb-20 md:pb-28" aria-labelledby="faq">
      <h2 id="faq" class="display text-center text-4xl sm:text-5xl">{{ t('home.faqTitle') }}</h2>
      <div
        class="mt-10 divide-y divide-slate-200 overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 dark:divide-slate-800 dark:bg-slate-900 dark:ring-white/10"
      >
        <details v-for="item in faq" :key="item.q" class="group px-6 py-5">
          <summary class="cursor-pointer list-none text-lg font-medium marker:hidden">
            <span class="flex items-center justify-between gap-4">
              {{ item.q }}
              <span
                class="text-slate-400 transition-transform group-open:rotate-45"
                aria-hidden="true"
                >+</span
              >
            </span>
          </summary>
          <p class="mt-3 text-slate-600 dark:text-slate-400">{{ item.a }}</p>
        </details>
      </div>
    </section>

    <!-- Appel à l'action final : l'envers du décor -->
    <section class="relative bg-ink px-4 pt-20 pb-24 text-center text-pearl">
      <div class="mx-auto max-w-2xl">
        <h2 class="display text-4xl sm:text-5xl">{{ t('home.ctaTitle') }}</h2>
        <p class="mt-3 text-lg text-pearl/70">{{ t('home.ctaText') }}</p>
        <NuxtLink
          :to="localePath('play-id')"
          class="btn mt-8 min-h-12 rounded-full border-pearl bg-pearl px-7 text-base text-ink hover:bg-white"
        >
          <Icon name="pencil" /> {{ t('home.play') }}
        </NuxtLink>
      </div>
      <DemonEyes class="absolute bottom-6 left-1/2 -translate-x-1/2" />
    </section>
  </div>
</template>
