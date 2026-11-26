<script setup lang="ts">
import type { PicrossSummary } from '@picross/shared';
import { useI18n } from 'vue-i18n';
import DifficultyBadge from './DifficultyBadge.vue';
import Icon from './Icon.vue';

defineProps<{ puzzle: PicrossSummary; showStatus?: boolean }>();
const { t, n } = useI18n();
</script>

<template>
  <li class="card flex flex-wrap items-center gap-x-4 gap-y-2">
    <div class="min-w-0 flex-1">
      <h3 class="truncate font-semibold">{{ puzzle.title }}</h3>
      <p class="flex flex-wrap items-center gap-x-2 text-sm text-slate-500 dark:text-slate-400">
        <span>{{ t('common.size', { width: puzzle.width, height: puzzle.height }) }}</span>
        <span aria-hidden="true">·</span>
        <span>{{
          puzzle.author ? t('common.by', { author: puzzle.author }) : t('common.builtin')
        }}</span>
        <span aria-hidden="true">·</span>
        <DifficultyBadge :level="puzzle.difficulty" />
        <span aria-hidden="true">·</span>
        <span class="inline-flex items-center gap-1">
          <Icon
            name="heart"
            class="size-4"
            :filled="puzzle.likedByMe"
            :class="puzzle.likedByMe ? 'text-red-500' : ''"
          />
          {{ n(puzzle.likes) }}
        </span>
      </p>
      <p
        v-if="showStatus"
        class="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium"
        :class="
          puzzle.validated
            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
            : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
        "
      >
        {{ puzzle.validated ? t('profile.published') : t('profile.pending') }}
      </p>
    </div>
    <div class="flex items-center gap-2"><slot /></div>
  </li>
</template>
