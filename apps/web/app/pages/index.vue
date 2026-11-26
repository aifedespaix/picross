<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import HeroBoard from '@/components/HeroBoard.vue';
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
    <!-- Hero -->
    <section
      class="overflow-hidden bg-gradient-to-b from-white to-pearl dark:from-slate-900 dark:to-ink"
    >
      <div class="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p
            class="mb-3 inline-block rounded-full bg-ink/5 px-3 py-1 text-sm font-medium text-ink dark:bg-pearl/10 dark:text-pearl"
          >
            {{ t('home.eyebrow') }}
          </p>
          <h1 class="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            {{ t('home.title') }}
          </h1>
          <p class="mt-4 max-w-xl text-lg text-slate-600 text-pretty dark:text-slate-300">
            {{ t('home.lead') }}
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink :to="localePath('play-id')" class="btn btn-primary min-h-12 px-6 text-base">
              <Icon name="pencil" /> {{ t('home.play') }}
            </NuxtLink>
            <NuxtLink :to="localePath('gallery')" class="btn min-h-12 px-6 text-base">
              <Icon name="grid" /> {{ t('home.gallery') }}
            </NuxtLink>
          </div>
        </div>
        <div class="flex justify-center md:justify-end"><HeroBoard /></div>
      </div>
    </section>

    <!-- Règles -->
    <section class="mx-auto max-w-6xl px-4 py-16" aria-labelledby="how">
      <h2 id="how" class="text-3xl font-bold">{{ t('home.howTitle') }}</h2>
      <p class="mt-2 text-slate-600 dark:text-slate-400">{{ t('home.howLead') }}</p>
      <ol class="mt-8 grid gap-4 md:grid-cols-3">
        <li v-for="(step, index) in steps" :key="step.title" class="card">
          <span
            class="mb-3 grid size-9 place-items-center rounded-full bg-ink font-bold text-pearl dark:bg-pearl dark:text-ink"
            aria-hidden="true"
          >
            {{ index + 1 }}
          </span>
          <h3 class="text-lg font-semibold">{{ step.title }}</h3>
          <p class="mt-1 text-slate-600 dark:text-slate-400">{{ step.text }}</p>
        </li>
      </ol>
    </section>

    <!-- Atouts -->
    <section class="bg-white py-16 dark:bg-slate-900" aria-labelledby="features">
      <div class="mx-auto max-w-6xl px-4">
        <h2 id="features" class="text-3xl font-bold">{{ t('home.featuresTitle') }}</h2>
        <ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="feature in features" :key="feature.title">
            <h3 class="font-semibold">{{ feature.title }}</h3>
            <p class="mt-1 text-slate-600 dark:text-slate-400">{{ feature.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mx-auto max-w-3xl px-4 py-16" aria-labelledby="faq">
      <h2 id="faq" class="text-3xl font-bold">{{ t('home.faqTitle') }}</h2>
      <div
        class="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900"
      >
        <details v-for="item in faq" :key="item.q" class="group p-4">
          <summary class="cursor-pointer list-none font-medium marker:hidden">
            <span class="flex items-center justify-between gap-4">
              {{ item.q }}
              <span
                class="text-slate-400 transition-transform group-open:rotate-45"
                aria-hidden="true"
                >+</span
              >
            </span>
          </summary>
          <p class="mt-2 text-slate-600 dark:text-slate-400">{{ item.a }}</p>
        </details>
      </div>
    </section>

    <!-- Appel à l'action final -->
    <section class="bg-ink py-14 text-center text-pearl">
      <div class="mx-auto max-w-2xl px-4">
        <h2 class="text-3xl font-bold">{{ t('home.ctaTitle') }}</h2>
        <p class="mt-2 text-pearl/70">{{ t('home.ctaText') }}</p>
        <NuxtLink
          :to="localePath('play-id')"
          class="btn mt-6 min-h-12 border-pearl bg-pearl px-6 text-base text-ink hover:bg-white"
        >
          <Icon name="pencil" /> {{ t('home.play') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
