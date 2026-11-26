<script setup lang="ts">
import type { PicrossSummary } from '@picross/shared';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ApiError } from '@/api/client';
import Icon from '@/components/Icon.vue';
import PuzzleListItem from '@/components/PuzzleListItem.vue';

const { t } = useI18n();
const api = useApi();
const localePath = useLocalePath();
const status = ref<'pending' | 'all'>('pending');
const items = ref<PicrossSummary[]>([]);
const loading = ref(true);
const error = ref('');

async function load() {
  loading.value = true;
  error.value = '';
  try {
    items.value = (
      await api.listPicrosses({ status: status.value, limit: 50, sort: 'recent' })
    ).items;
  } catch (e) {
    error.value = t(e instanceof ApiError && e.isNetwork ? 'errors.network' : 'errors.forbidden');
  } finally {
    loading.value = false;
  }
}

async function setValidated(puzzle: PicrossSummary, validated: boolean) {
  try {
    const updated = await api.validatePicross(puzzle.id, validated);
    items.value =
      status.value === 'pending'
        ? items.value.filter((item) => item.id !== puzzle.id)
        : items.value.map((item) => (item.id === puzzle.id ? updated : item));
  } catch {
    error.value = t('errors.unknown');
  }
}

async function remove(puzzle: PicrossSummary) {
  if (!window.confirm(t('profile.confirmDelete', { title: puzzle.title }))) return;
  try {
    await api.deletePicross(puzzle.id);
    items.value = items.value.filter((item) => item.id !== puzzle.id);
  } catch {
    error.value = t('errors.unknown');
  }
}

onMounted(load);
watch(status, load);

definePageMeta({ middleware: ['auth', 'admin'] });
useSeoMeta({ title: () => t('admin.title'), robots: 'noindex, nofollow' });
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-4 p-4">
    <h1 class="text-2xl font-bold">{{ t('admin.title') }}</h1>

    <div
      role="radiogroup"
      class="inline-grid grid-cols-2 gap-1 rounded-xl bg-slate-200 p-1 dark:bg-slate-800"
    >
      <button
        v-for="option in ['pending', 'all'] as const"
        :key="option"
        type="button"
        role="radio"
        :aria-checked="status === option"
        class="min-h-10 rounded-lg px-4 text-sm font-medium"
        :class="
          status === option
            ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-600 dark:text-white'
            : 'text-slate-600 dark:text-slate-300'
        "
        @click="status = option"
      >
        {{ t(`admin.${option}`) }}
      </button>
    </div>

    <p v-if="error" class="field-error" role="alert">{{ error }}</p>
    <p v-if="loading" role="status" class="text-slate-500">{{ t('common.loading') }}</p>
    <p v-else-if="!items.length && !error" class="text-slate-500">{{ t('admin.none') }}</p>

    <ul class="space-y-2">
      <PuzzleListItem v-for="puzzle in items" :key="puzzle.id" :puzzle="puzzle" show-status>
        <NuxtLink :to="localePath({ name: 'play-id', params: { id: puzzle.id } })" class="btn">{{
          t('admin.preview')
        }}</NuxtLink>
        <button
          v-if="!puzzle.validated"
          type="button"
          class="btn btn-primary"
          @click="setValidated(puzzle, true)"
        >
          <Icon name="check" /> {{ t('admin.validate') }}
        </button>
        <button v-else type="button" class="btn" @click="setValidated(puzzle, false)">
          {{ t('admin.unvalidate') }}
        </button>
        <button
          type="button"
          class="btn btn-icon btn-danger"
          :aria-label="t('common.delete')"
          @click="remove(puzzle)"
        >
          <Icon name="trash" />
        </button>
      </PuzzleListItem>
    </ul>
  </div>
</template>
