<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import Icon, { type IconName } from './Icon.vue';

/** Barre d'onglets du bas : la navigation principale sur mobile (zone du pouce). */
const { t } = useI18n();
const localePath = useLocalePath();
const auth = useAuthStore();

interface Tab {
  to: string;
  label: string;
  icon: IconName;
}

const tabs = computed<Tab[]>(() => [
  { to: localePath('play-id'), label: t('nav.play'), icon: 'pencil' },
  { to: localePath('gallery'), label: t('nav.gallery'), icon: 'grid' },
  { to: localePath('create'), label: t('nav.create'), icon: 'plus' },
  ...(auth.isAdmin
    ? [{ to: localePath('admin'), label: t('nav.admin'), icon: 'shield' as const }]
    : []),
  auth.user
    ? { to: localePath('profile'), label: t('nav.profile'), icon: 'user' as const }
    : { to: localePath('login'), label: t('nav.login'), icon: 'user' as const },
]);
</script>

<template>
  <nav
    :aria-label="t('nav.main')"
    class="tabbar fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 sm:hidden"
  >
    <ul class="flex items-stretch justify-around">
      <li v-for="tab in tabs" :key="tab.icon" class="flex-1">
        <NuxtLink :to="tab.to" class="tab">
          <Icon :name="tab.icon" class="size-6" />
          <span class="tab-label">{{ tab.label }}</span>
          <!-- Le « pixel rond » du logo : l'unique détail rouge de la barre. -->
          <span class="tab-dot" aria-hidden="true" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
@reference '../assets/css/main.css';
.tabbar {
  @apply rounded-3xl border border-black/5 bg-white/80 p-1 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/50;
}
.tab {
  @apply relative flex h-14 flex-col items-center justify-center gap-0.5 rounded-2xl text-[0.6875rem] font-medium text-slate-500 transition-colors dark:text-slate-400;
}
.tab.router-link-active,
.tab[aria-current='page'] {
  @apply text-ink dark:text-pearl;
}
.tab-dot {
  @apply absolute bottom-0.5 size-1.5 scale-0 rounded-full bg-demon opacity-0 transition duration-300 ease-out;
}
.tab[aria-current='page'] .tab-dot {
  @apply scale-100 opacity-100;
}
/* Le pixel bat de plus en plus vite quand la corruption monte. */
@media (prefers-reduced-motion: no-preference) {
  .tab[aria-current='page'] .tab-dot {
    animation: beat calc(3s - var(--corruption, 0) * 2.2s) ease-in-out infinite;
  }
}
@keyframes beat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(calc(1.15 + var(--corruption, 0) * 0.6));
  }
}
@media (prefers-reduced-motion: reduce) {
  .tab-dot {
    transition: none;
  }
}
</style>
