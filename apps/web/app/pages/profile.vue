<script setup lang="ts">
import type { PicrossSummary } from '@picross/shared';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ApiError } from '@/api/client';
import Icon from '@/components/Icon.vue';
import EmptyGrid from '@/components/EmptyGrid.vue';
import PuzzleListItem from '@/components/PuzzleListItem.vue';
import { useAuthStore } from '@/stores/auth';

const { t } = useI18n();
const api = useApi();
const auth = useAuthStore();
const localePath = useLocalePath();
const items = ref<PicrossSummary[]>([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    items.value = (await api.myPicrosses()).items;
  } catch (e) {
    error.value = t(e instanceof ApiError && e.isNetwork ? 'errors.network' : 'errors.unknown');
  } finally {
    loading.value = false;
  }
});

async function remove(puzzle: PicrossSummary) {
  if (!window.confirm(t('profile.confirmDelete', { title: puzzle.title }))) return;
  try {
    await api.deletePicross(puzzle.id);
    items.value = items.value.filter((item) => item.id !== puzzle.id);
  } catch {
    error.value = t('errors.unknown');
  }
}

async function logout() {
  await auth.logout();
  await navigateTo(localePath('index'));
}

definePageMeta({ middleware: 'auth' });
useSeoMeta({ title: () => t('profile.title'), robots: 'noindex, nofollow' });
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-6 p-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="display text-3xl sm:text-4xl">
          {{ t('profile.hello', { name: auth.user?.name }) }}
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ auth.user?.email }}</p>
      </div>
      <button type="button" class="btn" @click="logout">
        <Icon name="logout" /> {{ t('nav.logout') }}
      </button>
    </div>

    <section aria-labelledby="mine">
      <div class="mb-3 flex items-center justify-between">
        <h2 id="mine" class="text-lg font-semibold">{{ t('profile.mine') }}</h2>
        <NuxtLink :to="localePath('create')" class="btn btn-primary"
          ><Icon name="plus" /> {{ t('nav.create') }}</NuxtLink
        >
      </div>
      <p v-if="error" class="field-error" role="alert">{{ error }}</p>
      <p v-if="loading" role="status" class="text-slate-500">{{ t('common.loading') }}</p>
      <div
        v-else-if="!items.length && !error"
        class="flex flex-col items-center gap-4 py-10 text-center text-slate-500"
      >
        <EmptyGrid />
        <p>{{ t('profile.none') }}</p>
      </div>
      <ul class="space-y-2">
        <PuzzleListItem v-for="puzzle in items" :key="puzzle.id" :puzzle="puzzle" show-status>
          <NuxtLink :to="localePath({ name: 'play-id', params: { id: puzzle.id } })" class="btn">{{
            t('gallery.play')
          }}</NuxtLink>
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
    </section>
  </div>
</template>
