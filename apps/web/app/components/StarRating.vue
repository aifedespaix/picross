<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Icon from './Icon.vue';

defineProps<{ stars: number; size?: string }>();
const { t } = useI18n();
</script>

<template>
  <span
    class="inline-flex items-center gap-0.5"
    role="img"
    :aria-label="t('journey.starsOf', { n: stars })"
  >
    <Icon
      v-for="n in 3"
      :key="n"
      name="star"
      :filled="n <= stars"
      :class="[
        size ?? 'size-4',
        n <= stars ? 'text-ink dark:text-pearl' : 'text-slate-300 dark:text-slate-600',
      ]"
    />
  </span>
</template>
