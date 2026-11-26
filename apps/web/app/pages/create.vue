<script setup lang="ts">
import {
  computeClues,
  createPicrossSchema,
  MAX_SIZE,
  MIN_FILL_RATIO,
  MIN_SIZE,
  TITLE_MAX,
  type PicrossSummary,
} from '@picross/shared';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Board from '@/components/Board.vue';
import Icon from '@/components/Icon.vue';
import { useBoard } from '@/composables/useBoard';
import { useFormErrors } from '@/composables/useFormErrors';
import { countFilled, createGrid, resizeGrid, toBits, toSolution } from '@/domain/grid';

const { t } = useI18n();
const api = useApi();
const localePath = useLocalePath();
const { fields, formError, validate, handleApiError } = useFormErrors();

const board = useBoard(createGrid(10, 10));
const title = ref('');
const linked = ref(true);
const submitting = ref(false);
const created = ref<PicrossSummary | null>(null);

const width = computed(() => board.cells.value[0]?.length ?? 0);
const height = computed(() => board.cells.value.length);
const clues = computed(() => computeClues(toSolution(board.cells.value)));
const filled = computed(() => countFilled(board.cells.value));
const minFilled = computed(() => Math.floor(width.value * height.value * MIN_FILL_RATIO) + 1);
const enough = computed(() => filled.value >= minFilled.value);

function setSize(nextWidth: number, nextHeight: number) {
  const clamp = (n: number) => Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(n) || MIN_SIZE));
  const w = clamp(nextWidth);
  const h = clamp(nextHeight);
  if (w === width.value && h === height.value) return;
  board.checkpoint(); // le redimensionnement s'annule avec « Annuler »
  board.load(resizeGrid(board.cells.value, w, h), { keepHistory: true });
}

function onSizeInput(axis: 'width' | 'height', event: Event) {
  const value = Number((event.target as HTMLInputElement).value);
  if (linked.value) setSize(value, value);
  else setSize(axis === 'width' ? value : width.value, axis === 'height' ? value : height.value);
  // Réaffiche la valeur effective (bornée) si la saisie était hors limites.
  (event.target as HTMLInputElement).value = String(axis === 'width' ? width.value : height.value);
}

function toggleLink() {
  linked.value = !linked.value;
  if (linked.value) {
    const side = Math.max(width.value, height.value);
    setSize(side, side);
  }
}

function clearAll() {
  board.checkpoint();
  board.load(createGrid(width.value, height.value), { keepHistory: true });
}

async function submit() {
  const input = validate(createPicrossSchema, {
    title: title.value,
    map: toBits(board.cells.value),
  });
  if (!input) {
    // Les erreurs de grille (trop vide…) sont affichées par le bandeau dédié.
    return;
  }
  submitting.value = true;
  try {
    created.value = await api.createPicross(input);
  } catch (error) {
    handleApiError(error);
  } finally {
    submitting.value = false;
  }
}

function startOver() {
  created.value = null;
  title.value = '';
  board.load(createGrid(10, 10));
}

definePageMeta({ middleware: 'auth' });
useSeoMeta({ title: () => t('nav.create'), robots: 'noindex, nofollow' });
</script>

<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-3 p-3 lg:flex-row lg:items-start lg:gap-8">
    <aside class="order-1 w-full space-y-4 lg:order-2 lg:w-80 lg:shrink-0 lg:pt-4">
      <template v-if="!created">
        <div>
          <h1 class="display text-3xl">{{ t('create.title') }}</h1>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('create.intro') }}</p>
        </div>

        <form class="space-y-4" novalidate @submit.prevent="submit">
          <div>
            <label for="title" class="field-label">{{ t('create.name') }}</label>
            <input
              id="title"
              v-model="title"
              class="field-input"
              type="text"
              :maxlength="TITLE_MAX"
              :aria-invalid="!!fields.title"
              :aria-describedby="fields.title ? 'title-error' : undefined"
              autocomplete="off"
            />
            <p v-if="fields.title" id="title-error" class="field-error">{{ fields.title }}</p>
          </div>

          <div class="flex items-end gap-2">
            <div class="flex-1">
              <label for="cols" class="field-label">{{ t('create.cols') }}</label>
              <input
                id="cols"
                class="field-input"
                type="number"
                inputmode="numeric"
                :min="MIN_SIZE"
                :max="MAX_SIZE"
                :value="width"
                @change="onSizeInput('width', $event)"
              />
            </div>
            <button
              type="button"
              class="btn btn-icon mb-0.5"
              :class="
                linked
                  ? 'border-ink bg-slate-100 text-ink dark:border-pearl dark:bg-slate-700 dark:text-pearl'
                  : ''
              "
              :aria-pressed="linked"
              :aria-label="t('create.link')"
              :title="t('create.link')"
              @click="toggleLink"
            >
              <Icon name="link" />
            </button>
            <div class="flex-1">
              <label for="rows" class="field-label">{{ t('create.rows') }}</label>
              <input
                id="rows"
                class="field-input"
                type="number"
                inputmode="numeric"
                :min="MIN_SIZE"
                :max="MAX_SIZE"
                :value="height"
                @change="onSizeInput('height', $event)"
              />
            </div>
          </div>

          <p
            class="rounded-lg px-3 py-2 text-sm"
            :class="
              enough
                ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                : 'bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
            "
            role="status"
          >
            <template v-if="enough">{{ filled }} / {{ width * height }}</template>
            <template v-else>{{ t('create.tooEmpty', { done: filled, min: minFilled }) }}</template>
          </p>

          <p v-if="formError" class="field-error" role="alert">{{ formError }}</p>
          <p v-if="fields.map" class="field-error" role="alert">{{ fields.map }}</p>

          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="btn flex-1"
              :disabled="!board.canUndo.value"
              @click="board.undo()"
            >
              <Icon name="undo" /> {{ t('game.undo') }}
            </button>
            <button type="button" class="btn flex-1" @click="clearAll">
              <Icon name="trash" /> {{ t('create.clear') }}
            </button>
            <button type="submit" class="btn btn-primary w-full" :disabled="!enough || submitting">
              <Icon name="check" /> {{ t('create.submit') }}
            </button>
          </div>
        </form>
      </template>

      <div v-else class="card space-y-3" role="status">
        <h1 class="display text-3xl">{{ t('create.sent') }}</h1>
        <p class="text-sm">
          {{ created.validated ? t('create.sentPublic') : t('create.sentPending') }}
        </p>
        <div class="flex flex-col gap-2">
          <NuxtLink
            :to="localePath({ name: 'play-id', params: { id: created.id } })"
            class="btn btn-primary"
            >{{ t('gallery.play') }}</NuxtLink
          >
          <NuxtLink :to="localePath('profile')" class="btn">{{ t('create.seeProfile') }}</NuxtLink>
          <button type="button" class="btn" @click="startOver">{{ t('create.again') }}</button>
        </div>
      </div>
    </aside>

    <section
      class="order-2 h-[min(calc(100vw-1.5rem),calc(100svh-24rem))] min-h-72 w-full lg:order-1 lg:h-[calc(100svh-5.5rem)] lg:flex-1"
    >
      <Board
        :cells="board.cells.value"
        :row-clues="clues.rows"
        :col-clues="clues.cols"
        tool="filled"
        :interactive="!created"
        :allow-cross="false"
        :show-progress="false"
        @stroke-start="(pos, tool) => board.begin(pos, tool)"
        @stroke-move="board.move"
        @stroke-end="board.end"
        @stroke-cancel="board.cancel()"
        @cell-action="(pos, tool) => board.toggleAt(pos, tool)"
        @undo="board.undo()"
      />
    </section>
  </div>
</template>
