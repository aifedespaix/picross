<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import BaseDialog from '@/components/BaseDialog.vue';
import DifficultyBadge from '@/components/DifficultyBadge.vue';
import Icon from '@/components/Icon.vue';
import JourneyChapter from '@/components/JourneyChapter.vue';
import PixelThumb from '@/components/PixelThumb.vue';
import StarRating from '@/components/StarRating.vue';
import { useJourney } from '@/composables/useJourney';
import { chapterDone, firstToPlay, levelStatus, type Level, type StepView } from '@/domain/journey';
import { formatDuration } from '@/utils/format';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const journey = useJourney();
const { chapters, progress, views, current, summary, ready } = journey;

const selected = ref<{ level: Level; view: StepView } | null>(null);
const confirmReset = ref(false);

const nameOf = (level: Level) => (locale.value === 'en' ? level.names.en : level.names.fr);
const viewsOf = (chapter: number) => views.value.filter((view) => view.chapter === chapter);
/** Un chapitre est ouvert dès que sa première étape l'est ; sinon on n'affiche que son en-tête. */
const isOpen = (chapter: number) => viewsOf(chapter)[0]?.status !== 'locked';
const chapterStars = (chapter: number) =>
  viewsOf(chapter)
    .flatMap((view) => view.step.levels)
    .reduce((sum, level) => sum + (progress.value[level.slug]?.stars ?? 0), 0);
const chapterMax = (chapter: number) =>
  viewsOf(chapter).reduce((sum, view) => sum + view.step.levels.length * 3, 0);
const finished = computed(() => ready.value && !current.value);

const currentLevel = computed(() =>
  current.value ? firstToPlay(current.value, progress.value) : null,
);

function play(level: Level) {
  selected.value = null;
  return navigateTo(
    localePath({
      name: 'play-id',
      params: { id: `local-${level.slug}` },
      query: { parcours: '1' },
    }),
  );
}

const selectedStatus = computed(() =>
  selected.value
    ? levelStatus(selected.value.view, selected.value.level, progress.value)
    : 'locked',
);
const selectedResult = computed(() =>
  selected.value ? progress.value[selected.value.level.slug] : undefined,
);

function doReset() {
  journey.reset();
  confirmReset.value = false;
  if (import.meta.client) window.scrollTo({ top: 0 });
}

onMounted(() => {
  journey.load();
  const view = current.value;
  const slug = currentLevel.value?.slug;
  if (!view || view.position === 0 || !slug) return;
  // Après la transition de page : le routeur remet sinon la page en haut.
  setTimeout(
    () => document.getElementById(`node-${slug}`)?.scrollIntoView({ block: 'center' }),
    350,
  );
});

useSeoMeta({
  title: () => t('seo.journey.title'),
  description: () => t('seo.journey.description'),
  ogTitle: () => t('seo.journey.title'),
  ogDescription: () => t('seo.journey.description'),
});
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 pt-8 pb-16">
    <!-- En-tête : où j'en suis, et un seul bouton pour reprendre. -->
    <header class="text-center">
      <h1 class="display text-4xl sm:text-5xl">
        {{ t('journey.title') }}<span class="text-demon">.</span>
      </h1>
      <p class="mx-auto mt-3 max-w-md text-slate-600 dark:text-slate-400">
        {{ t('journey.lead') }}
      </p>

      <div v-if="ready" class="card mx-auto mt-6 max-w-sm text-left">
        <div class="flex items-baseline justify-between gap-4">
          <p class="flex items-center gap-1.5 text-lg font-semibold tabular-nums">
            <Icon name="star" filled class="size-5" />
            {{ summary.stars
            }}<span class="font-normal text-slate-500"> / {{ summary.maxStars }}</span>
          </p>
          <p class="text-sm text-slate-500 tabular-nums dark:text-slate-400">
            {{ t('journey.levelsDone', { done: summary.done, total: summary.total }) }}
          </p>
        </div>
        <div
          class="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
          role="progressbar"
          :aria-valuenow="summary.done"
          aria-valuemin="0"
          :aria-valuemax="summary.total"
          :aria-label="t('journey.title')"
        >
          <div
            class="h-full rounded-full bg-ink transition-[width] duration-500 dark:bg-pearl"
            :style="{ width: `${(summary.done / summary.total) * 100}%` }"
          />
        </div>
        <button
          v-if="currentLevel"
          type="button"
          class="btn btn-primary mt-4 w-full"
          @click="play(currentLevel)"
        >
          <Icon name="pencil" />
          {{ summary.done === 0 ? t('journey.start') : t('journey.continue') }}
        </button>
      </div>
      <p class="mt-4 text-sm">
        <NuxtLink :to="localePath('gallery')" class="underline underline-offset-4">
          {{ t('journey.library') }}
        </NuxtLink>
        <span class="text-slate-500 dark:text-slate-400"> — {{ t('journey.libraryHint') }}</span>
      </p>
    </header>

    <p v-if="!ready" class="py-16 text-center text-slate-500" role="status">
      {{ t('common.loading') }}
    </p>

    <template v-else>
      <section
        v-for="chapter in chapters"
        :key="chapter.id"
        :aria-labelledby="`chapter-${chapter.id}`"
        class="mt-14"
      >
        <header class="mb-6 text-center">
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
            {{ t('journey.chapter', { n: chapter.index + 1 }) }}
          </p>
          <h2 :id="`chapter-${chapter.id}`" class="display text-3xl">
            {{ t(`journey.chapters.${chapter.id}.title`) }}
          </h2>
          <p class="mx-auto mt-1 max-w-xs text-sm text-slate-600 dark:text-slate-400">
            {{ t(`journey.chapters.${chapter.id}.text`) }}
          </p>
          <p
            v-if="isOpen(chapter.index)"
            class="mt-2 inline-flex items-center gap-1.5 text-sm tabular-nums text-slate-600 dark:text-slate-300"
          >
            <Icon name="star" filled class="size-4" />
            {{ chapterStars(chapter.index) }} / {{ chapterMax(chapter.index) }}
            <span
              v-if="chapterDone(chapter, progress)"
              class="rounded-full bg-ink px-2 py-0.5 text-xs font-medium text-pearl dark:bg-pearl dark:text-ink"
            >
              {{ t('journey.chapterDone') }}
            </span>
          </p>
        </header>

        <JourneyChapter
          v-if="isOpen(chapter.index)"
          :views="viewsOf(chapter.index)"
          :progress="progress"
          :current-slug="currentLevel?.slug"
          @select="(level, view) => (selected = { level, view })"
        />
        <div
          v-else
          class="mx-auto flex max-w-sm flex-col items-center gap-2 rounded-3xl border border-dashed border-slate-300 py-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400"
        >
          <Icon name="lock" class="size-6" />
          <p class="max-w-56 text-sm">
            {{
              t('journey.locked', {
                previous: t(`journey.chapters.${chapters[chapter.index - 1]!.id}.title`),
              })
            }}
          </p>
        </div>
      </section>

      <section v-if="finished" class="card mt-14 text-center">
        <h2 class="display text-3xl">{{ t('journey.finaleTitle') }}</h2>
        <p class="mx-auto mt-2 max-w-sm text-slate-600 dark:text-slate-400">
          {{ t('journey.finaleText', { stars: summary.stars, max: summary.maxStars }) }}
        </p>
      </section>

      <p class="mt-14 text-center">
        <button
          type="button"
          class="text-sm text-slate-500 underline underline-offset-4 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          @click="confirmReset = true"
        >
          {{ t('journey.reset') }}
        </button>
      </p>
    </template>

    <!-- Fiche d'une grille -->
    <BaseDialog
      :open="selected !== null"
      :title="selected ? t('journey.level', { n: selected.view.position + 1 }) : ''"
      @close="selected = null"
    >
      <template v-if="selected">
        <div class="mb-4 flex items-center gap-4">
          <div
            class="size-24 shrink-0 rounded-2xl bg-slate-100 p-3 text-ink dark:bg-slate-800 dark:text-pearl"
          >
            <PixelThumb :bits="selected.level.bits" :ghost="selectedStatus !== 'done'" />
          </div>
          <div class="min-w-0 space-y-1">
            <p class="truncate text-lg font-semibold">
              {{ selectedStatus === 'done' ? nameOf(selected.level) : t('journey.mystery') }}
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              {{ t('common.size', { width: selected.level.width, height: selected.level.height }) }}
              <template v-if="selected.view.step.kind === 'boss'">
                · {{ t('journey.boss') }}</template
              >
            </p>
            <DifficultyBadge :level="selected.level.difficulty" />
            <p v-if="selectedResult" class="flex items-center gap-2 text-sm tabular-nums">
              <StarRating :stars="selectedResult.stars" />
              <span class="text-slate-500 dark:text-slate-400">{{
                formatDuration(selectedResult.time)
              }}</span>
            </p>
          </div>
        </div>
        <p
          v-if="selected.view.step.kind === 'fork'"
          class="mb-4 rounded-xl bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          {{ t('journey.fork') }}
        </p>
        <p
          v-if="selectedStatus === 'locked'"
          class="mb-4 text-sm text-slate-600 dark:text-slate-300"
        >
          {{ t('journey.lockedHint') }}
        </p>
        <button
          type="button"
          class="btn btn-primary w-full"
          :disabled="selectedStatus === 'locked'"
          autofocus
          @click="play(selected.level)"
        >
          <Icon :name="selectedStatus === 'locked' ? 'lock' : 'pencil'" />
          {{ selectedStatus === 'done' ? t('journey.replay') : t('journey.play') }}
        </button>
      </template>
    </BaseDialog>

    <BaseDialog :open="confirmReset" :title="t('journey.reset')" @close="confirmReset = false">
      <p class="mb-5 text-sm text-slate-600 dark:text-slate-300">{{ t('journey.resetText') }}</p>
      <div class="grid grid-cols-2 gap-2">
        <button type="button" class="btn" @click="confirmReset = false">
          {{ t('common.cancel') }}
        </button>
        <button type="button" class="btn btn-danger" @click="doReset">
          {{ t('journey.resetConfirm') }}
        </button>
      </div>
    </BaseDialog>
  </div>
</template>
