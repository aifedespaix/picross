<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import AppTabBar from '@/components/AppTabBar.vue';
import AppHeader from '@/components/AppHeader.vue';
import SettingsDialog from '@/components/SettingsDialog.vue';

const { t } = useI18n();
const settingsOpen = ref(false);
const corruption = useCorruptionStore();
</script>

<template>
  <div class="flex min-h-full flex-col" :style="{ '--corruption': corruption.level }">
    <!-- Voile du démon : invisible tant que tout va bien, il rougit avec les erreurs. -->
    <div class="demon-veil" aria-hidden="true" />
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3 focus:shadow-lg dark:focus:bg-slate-900"
    >
      {{ t('app.skip') }}
    </a>
    <AppHeader @open-settings="settingsOpen = true" />
    <main id="main" class="flex-1"><slot /></main>
    <AppFooter />
    <AppTabBar />
    <SettingsDialog :open="settingsOpen" @close="settingsOpen = false" />
  </div>
</template>
