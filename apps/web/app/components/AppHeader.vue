<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import logoUrl from '@/assets/picross-icon.svg';
import { useAuthStore } from '@/stores/auth';
import Icon, { type IconName } from './Icon.vue';

defineEmits<{ openSettings: [] }>();
const { t } = useI18n();
const localePath = useLocalePath();
const auth = useAuthStore();

interface NavItem {
  to: string;
  label: string;
  icon: IconName;
}

const items = computed<NavItem[]>(() => [
  { to: localePath('play-id'), label: t('nav.play'), icon: 'pencil' },
  { to: localePath('gallery'), label: t('nav.gallery'), icon: 'grid' },
  { to: localePath('create'), label: t('nav.create'), icon: 'plus' },
]);
</script>

<template>
  <header
    class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90"
  >
    <div class="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3">
      <NuxtLink
        :to="localePath('index')"
        class="mr-2 flex items-center gap-2 rounded-lg"
        :aria-label="t('app.name')"
      >
        <img :src="logoUrl" alt="" class="size-8" width="32" height="32" />
        <span class="text-lg font-bold">{{ t('app.name') }}</span>
      </NuxtLink>

      <nav :aria-label="t('nav.main')" class="hidden flex-1 items-center gap-1 sm:flex">
        <NuxtLink
          v-for="item in items"
          :key="item.icon"
          :to="item.to"
          class="nav-link"
          :aria-label="item.label"
        >
          <Icon :name="item.icon" />
          <span class="hidden sm:inline">{{ item.label }}</span>
        </NuxtLink>
        <NuxtLink
          v-if="auth.isAdmin"
          :to="localePath('admin')"
          class="nav-link"
          :aria-label="t('nav.admin')"
        >
          <Icon name="shield" />
          <span class="hidden sm:inline">{{ t('nav.admin') }}</span>
        </NuxtLink>
      </nav>

      <span class="flex-1 sm:hidden" aria-hidden="true" />
      <button
        type="button"
        class="btn btn-icon border-transparent bg-transparent shadow-none"
        :aria-label="t('nav.settings')"
        @click="$emit('openSettings')"
      >
        <Icon name="sliders" />
      </button>

      <NuxtLink
        v-if="auth.user"
        :to="localePath('profile')"
        class="nav-link hidden sm:inline-flex"
        :aria-label="t('nav.profile')"
      >
        <Icon name="user" />
        <span class="hidden max-w-28 truncate md:inline">{{ auth.user.name }}</span>
      </NuxtLink>
      <NuxtLink
        v-else
        :to="localePath('login')"
        class="btn btn-primary hidden sm:inline-flex"
        :aria-label="t('nav.login')"
      >
        {{ t('nav.login') }}
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
@reference '../assets/css/main.css';
.nav-link {
  @apply inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white;
}
.nav-link.router-link-exact-active,
.nav-link[aria-current='page'] {
  @apply bg-ink/5 text-ink dark:bg-pearl/10 dark:text-pearl;
}
</style>
