<script setup lang="ts">
import type { PicrossSummary } from '@picross/shared';
import { refDebounced } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { api, ApiError } from '@/api/client';
import PuzzleListItem from '@/components/PuzzleListItem.vue';

const PAGE = 24;
const { t } = useI18n();

const search = ref('');
const debouncedSearch = refDebounced(search, 300);
const sort = ref<'recent' | 'popular'>('recent');
const items = ref<PicrossSummary[]>([]);
const total = ref(0);
const loading = ref(false);
const error = ref('');
let requestId = 0;

async function load(reset: boolean) {
  const current = ++requestId; // ignore les réponses périmées (frappe rapide)
  loading.value = true;
  error.value = '';
  try {
    const page = await api.listPicrosses({
      search: debouncedSearch.value.trim(),
      sort: sort.value,
      limit: PAGE,
      offset: reset ? 0 : items.value.length,
    });
    if (current !== requestId) return;
    items.value = reset ? page.items : [...items.value, ...page.items];
    total.value = page.total;
  } catch (e) {
    if (current !== requestId) return;
    error.value = t(e instanceof ApiError && e.isNetwork ? 'errors.network' : 'errors.unknown');
  } finally {
    if (current === requestId) loading.value = false;
  }
}

onMounted(() => load(true));
watch([debouncedSearch, sort], () => load(true));
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-4 p-4">
    <div class="flex items-baseline justify-between gap-4">
      <h1 class="text-2xl font-bold">{{ t('gallery.title') }}</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
        {{ t('gallery.count', total) }}
      </p>
    </div>

    <div class="grid gap-3 sm:grid-cols-[1fr_auto]">
      <div>
        <label for="search" class="sr-only">{{ t('gallery.search') }}</label>
        <input
          id="search"
          v-model="search"
          class="field-input"
          type="search"
          :placeholder="t('gallery.search')"
          maxlength="60"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="sort" class="sr-only">{{ t('gallery.sort') }}</label>
        <select id="sort" v-model="sort" class="field-input">
          <option value="recent">{{ t('gallery.recent') }}</option>
          <option value="popular">{{ t('gallery.popular') }}</option>
        </select>
      </div>
    </div>

    <p v-if="error" class="field-error" role="alert">{{ error }}</p>

    <ul v-if="items.length" class="space-y-2">
      <PuzzleListItem v-for="puzzle in items" :key="puzzle.id" :puzzle="puzzle">
        <RouterLink :to="`/play/${puzzle.id}`" class="btn btn-primary">{{
          t('gallery.play')
        }}</RouterLink>
      </PuzzleListItem>
    </ul>
    <p v-else-if="!loading && !error" class="py-8 text-center text-slate-500">
      {{ t('gallery.empty') }}
    </p>
    <p v-if="loading" class="py-4 text-center text-slate-500" role="status">
      {{ t('common.loading') }}
    </p>

    <div v-if="items.length < total && !loading" class="text-center">
      <button type="button" class="btn" @click="load(false)">{{ t('common.more') }}</button>
    </div>
  </div>
</template>
