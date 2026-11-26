<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, locale, locales, setLocale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <footer
    class="border-t border-slate-200 bg-white pt-6 pb-[calc(1.5rem+var(--tabbar-h))] text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
  >
    <div
      class="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p>© {{ new Date().getFullYear() }} {{ t('app.name') }} — {{ t('footer.tagline') }}</p>
      <nav :aria-label="t('footer.nav')" class="flex flex-wrap items-center gap-x-5 gap-y-2">
        <NuxtLink :to="localePath('play-id')" class="hover:underline">{{ t('nav.play') }}</NuxtLink>
        <NuxtLink :to="localePath('gallery')" class="hover:underline">{{
          t('nav.gallery')
        }}</NuxtLink>
        <a href="https://github.com/aifedespaix/picross" rel="noopener" class="hover:underline"
          >GitHub</a
        >
        <ul class="flex items-center gap-2" :aria-label="t('settings.language')">
          <li v-for="item in locales" :key="item.code">
            <NuxtLink
              :to="switchLocalePath(item.code)"
              :hreflang="item.code"
              :lang="item.code"
              :aria-current="item.code === locale ? 'true' : undefined"
              class="rounded px-1.5 py-0.5 font-medium uppercase hover:underline"
              :class="
                item.code === locale
                  ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white'
                  : ''
              "
              @click.prevent="setLocale(item.code)"
            >
              {{ item.code }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
