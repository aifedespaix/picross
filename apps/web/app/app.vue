<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';

const settings = useSettingsStore();

/**
 * Thème : avec un choix explicite (cookie), la classe `dark` est déjà dans le HTML rendu par le
 * serveur. En mode « système », ce petit script (exécuté avant le premier affichage) la pose
 * d'après les préférences de l'OS, ce qui évite tout flash blanc.
 */
const THEME_INIT =
  "(function(){try{var m=document.cookie.match(/(?:^|; )picross_theme=([^;]*)/),t=m?decodeURIComponent(m[1]):'system';if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()";

// Balises <link rel="alternate" hreflang="…"> (+ x-default) entre les versions FR et EN de chaque page.
// hreflang exige des URL absolues : on préfixe avec l'URL publique (lue au runtime).
const { locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const siteConfig = useSiteConfig();
const absolute = (path: string) => `${siteConfig.url.replace(/\/$/, '')}${path}`;
const alternates = computed(() => {
  const links = locales.value.map((l) => ({
    rel: 'alternate' as const,
    hreflang: l.code,
    href: absolute(switchLocalePath(l.code)),
  }));
  return [
    ...links,
    { rel: 'alternate' as const, hreflang: 'x-default', href: absolute(switchLocalePath('fr')) },
  ];
});

useHead(() => ({ link: alternates.value }));

useHead({
  htmlAttrs: {
    class: computed(() =>
      (import.meta.server ? settings.theme === 'dark' : settings.isDark) ? 'dark' : '',
    ),
  },
  script: [{ innerHTML: THEME_INIT, tagPosition: 'head', tagPriority: 'critical' }],
});

// Aperçu des liens partagés (Open Graph / X) : image 1200×630 servie depuis /public.
useSeoMeta({
  ogSiteName: 'Picross',
  ogImage: () => `${siteConfig.url}/og.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Picross',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
