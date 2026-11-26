<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();
const { t } = useI18n();
const localePath = useLocalePath();
const notFound = computed(() => props.error.statusCode === 404);

useSeoMeta({
  title: () => (notFound.value ? t('errors.notFoundPage') : t('errors.unknown')),
  robots: 'noindex',
});
</script>

<template>
  <NuxtLayout>
    <div class="mx-auto max-w-md p-8 py-20 text-center">
      <p class="text-6xl font-bold text-slate-300 dark:text-slate-700">{{ error.statusCode }}</p>
      <p class="mt-4">{{ notFound ? t('errors.notFoundPage') : t('errors.unknown') }}</p>
      <NuxtLink :to="localePath('index')" class="btn btn-primary mt-6" @click="clearError()">{{
        t('nav.play')
      }}</NuxtLink>
    </div>
  </NuxtLayout>
</template>
