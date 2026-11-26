<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <div class="mx-auto max-w-md p-8 text-center">
    <p class="text-6xl font-bold text-slate-300 dark:text-slate-700">404</p>
    <p class="mt-4">{{ t('errors.notFoundPage') }}</p>
    <RouterLink to="/" class="btn btn-primary mt-6">{{ t('nav.play') }}</RouterLink>
  </div>
</template>
