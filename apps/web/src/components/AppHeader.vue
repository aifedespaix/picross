<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import logoUrl from '@/assets/picross-icon.svg';
import { useAuthStore } from '@/stores/auth';
import Icon, { type IconName } from './Icon.vue';

defineEmits<{ openSettings: [] }>();
const { t } = useI18n();
const auth = useAuthStore();

interface NavItem {
  to: string;
  label: string;
  icon: IconName;
}
</script>

<template>
  <header
    class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90"
  >
    <div class="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3">
      <RouterLink
        to="/"
        class="mr-2 flex items-center gap-2 rounded-lg"
        :aria-label="t('app.name')"
      >
        <img :src="logoUrl" alt="" class="size-8" width="32" height="32" />
        <span class="hidden text-lg font-bold sm:inline">{{ t('app.name') }}</span>
      </RouterLink>

      <nav :aria-label="t('nav.main')" class="flex flex-1 items-center gap-1">
        <RouterLink
          v-for="item in [
            { to: '/', label: t('nav.play'), icon: 'pencil' },
            { to: '/gallery', label: t('nav.gallery'), icon: 'grid' },
            { to: '/create', label: t('nav.create'), icon: 'plus' },
          ] satisfies NavItem[]"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :aria-label="item.label"
        >
          <Icon :name="item.icon" />
          <span class="hidden sm:inline">{{ item.label }}</span>
        </RouterLink>
        <RouterLink v-if="auth.isAdmin" to="/admin" class="nav-link" :aria-label="t('nav.admin')">
          <Icon name="shield" />
          <span class="hidden sm:inline">{{ t('nav.admin') }}</span>
        </RouterLink>
      </nav>

      <button
        type="button"
        class="btn btn-icon border-transparent bg-transparent shadow-none"
        :aria-label="t('nav.settings')"
        @click="$emit('openSettings')"
      >
        <Icon name="sliders" />
      </button>

      <RouterLink v-if="auth.user" to="/profile" class="nav-link" :aria-label="t('nav.profile')">
        <Icon name="user" />
        <span class="hidden max-w-28 truncate md:inline">{{ auth.user.name }}</span>
      </RouterLink>
      <RouterLink v-else to="/login" class="btn btn-primary" :aria-label="t('nav.login')">
        <Icon name="user" class="sm:hidden" />
        <span class="hidden sm:inline">{{ t('nav.login') }}</span>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
@reference '../style.css';
.nav-link {
  @apply inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white;
}
.nav-link.router-link-exact-active,
.nav-link[aria-current='page'] {
  @apply bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-blue-300;
}
</style>
