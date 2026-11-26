<script setup lang="ts">
import { DIFFICULTIES, type Difficulty } from '@picross/shared';
import { useI18n } from 'vue-i18n';

const props = defineProps<{ level: Difficulty }>();
const { t } = useI18n();
const rank = computed(() => DIFFICULTIES.indexOf(props.level) + 1);
</script>

<template>
  <!-- Quatre pastilles (1 à 4 pleines) + libellé : l'information ne repose pas sur la seule couleur. -->
  <span class="inline-flex items-center gap-1.5 text-sm" :title="t(`difficulty.${level}`)">
    <span class="inline-flex gap-0.5" aria-hidden="true">
      <span
        v-for="n in DIFFICULTIES.length"
        :key="n"
        class="size-2 rounded-full"
        :class="n <= rank ? 'bg-slate-900 dark:bg-slate-100' : 'bg-slate-300 dark:bg-slate-700'"
      />
    </span>
    <span>{{ t(`difficulty.${level}`) }}</span>
  </span>
</template>
