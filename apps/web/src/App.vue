<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AppHeader from '@/components/AppHeader.vue';
import SettingsDialog from '@/components/SettingsDialog.vue';
import { useSettingsStore } from '@/stores/settings';

const { t } = useI18n();
useSettingsStore(); // applique thème et langue dès le démarrage
const settingsOpen = ref(false);
</script>

<template>
  <div class="flex min-h-full flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3 focus:shadow-lg dark:focus:bg-slate-900"
    >
      {{ t('app.skip') }}
    </a>
    <AppHeader @open-settings="settingsOpen = true" />
    <main id="main" class="flex-1">
      <RouterView />
    </main>
    <SettingsDialog :open="settingsOpen" @close="settingsOpen = false" />
  </div>
</template>
