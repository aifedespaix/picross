<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ApiError } from '@/api/client';
import BaseDialog from '@/components/BaseDialog.vue';
import Board from '@/components/Board.vue';
import DifficultyBadge from '@/components/DifficultyBadge.vue';
import Icon from '@/components/Icon.vue';
import WinReveal from '@/components/WinReveal.vue';
import { localPuzzle, usePlayableGame, type PlayablePuzzle } from '@/composables/usePlayableGame';
import { useAuthStore } from '@/stores/auth';
import { useCorruptionStore } from '@/stores/corruption';
import { formatDuration } from '@/utils/format';

const { t, locale } = useI18n();
const api = useApi();
const route = useRoute();
const localePath = useLocalePath();
const auth = useAuthStore();
const game = usePlayableGame();
const corruption = useCorruptionStore();
const whisper = computed(() => (corruption.stage === 'pure' ? null : corruption.stage));

const status = ref<'loading' | 'ready' | 'error'>('ready');
const offline = ref(false);
const winOpen = ref(false);
const liking = ref(false);
const isTouch = ref(false);

const puzzle = computed(() => game.puzzle.value);
const routeId = computed(() => (typeof route.params.id === 'string' ? route.params.id : undefined));

interface Fetched {
  puzzle: PlayablePuzzle | null;
  offline: boolean;
}

/** Récupère une grille ; bascule sur une grille locale si l'API est injoignable ou vide. */
async function fetchPuzzle(id?: string, exclude?: string): Promise<Fetched> {
  try {
    return {
      puzzle: id ? await api.getPicross(id) : await api.randomPicross(exclude),
      offline: false,
    };
  } catch (error) {
    const unreachable = error instanceof ApiError && error.isNetwork;
    const noPuzzleYet = !id && error instanceof ApiError && error.status === 404;
    if (!unreachable && !noPuzzleYet) return { puzzle: null, offline: false };
    return {
      puzzle: localPuzzle(exclude, locale.value === 'en' ? 'en' : 'fr'),
      offline: unreachable,
    };
  }
}

function apply(result: Fetched) {
  offline.value = result.offline;
  winOpen.value = false;
  if (!result.puzzle) {
    status.value = 'error';
    return;
  }
  game.start(result.puzzle);
  status.value = 'ready';
}

/** Chargements suivants (grille suivante, navigation) : côté client. */
async function load(id?: string, exclude?: string) {
  status.value = 'loading';
  apply(await fetchPuzzle(id, exclude));
  // L'URL pointe vers la grille jouée : on peut la partager ou rafraîchir la page.
  if (!id && puzzle.value && !puzzle.value.local) {
    await navigateTo(
      { path: localePath({ name: 'play-id', params: { id: puzzle.value.id } }) },
      { replace: true },
    );
  }
}

// Premier rendu : la grille est chargée côté serveur (HTML complet pour le SEO), puis hydratée.
const { data: initial } = await useAsyncData(`puzzle:${routeId.value ?? 'random'}`, () =>
  fetchPuzzle(routeId.value),
);
if (initial.value) apply(initial.value);

onMounted(async () => {
  isTouch.value = matchMedia('(pointer: coarse)').matches;
  if (!routeId.value && puzzle.value && !puzzle.value.local) {
    await navigateTo(
      { path: localePath({ name: 'play-id', params: { id: puzzle.value.id } }) },
      { replace: true },
    );
  }
});

watch(routeId, (id) => {
  if (id && id !== puzzle.value?.id) load(id);
  if (!id) load();
});

watch(
  () => game.won.value,
  (won) => {
    if (won) winOpen.value = true;
  },
);

const next = () => load(undefined, puzzle.value?.id);

async function toggleLike() {
  const current = puzzle.value;
  if (!current || current.local || !auth.isLoggedIn || liking.value) return;
  liking.value = true;
  try {
    const updated = await api.likePicross(current.id, !current.likedByMe);
    game.puzzle.value = { ...current, likes: updated.likes, likedByMe: updated.likedByMe };
  } finally {
    liking.value = false;
  }
}

const tools = [
  { id: 'filled', icon: 'pencil', label: 'game.fill' },
  { id: 'crossed', icon: 'x', label: 'game.cross' },
] as const;
// Une page par grille (indexable) ; la page « au hasard » sans identifiant ne l'est pas.
definePageMeta({ key: 'play' });
useSeoMeta({
  titleTemplate: '%s',
  title: () =>
    puzzle.value
      ? t('seo.play.title', {
          title: puzzle.value.title,
          width: puzzle.value.map[0]?.length,
          height: puzzle.value.map.length,
        })
      : t('nav.play'),
  description: () =>
    t('seo.play.description', {
      title: puzzle.value?.title ?? '',
      width: puzzle.value?.map[0]?.length ?? 0,
      height: puzzle.value?.map.length ?? 0,
    }),
  ogType: 'website',
  robots: () => (routeId.value ? 'index, follow' : 'noindex, follow'),
});
</script>

<template>
  <div
    class="mx-auto grid max-w-6xl gap-3 p-3 lg:grid-cols-[1fr_18rem] lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-4"
  >
    <!-- Infos -->
    <div class="space-y-2 lg:col-start-2 lg:row-start-1 lg:pt-4">
      <template v-if="puzzle">
        <div>
          <h1 class="truncate text-xl font-bold">{{ puzzle.title }}</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {{ t('common.size', { width: puzzle.map[0]?.length, height: puzzle.map.length }) }}
            ·
            {{ puzzle.author ? t('common.by', { author: puzzle.author }) : t('common.builtin') }}
          </p>
          <p class="mt-1 text-slate-600 dark:text-slate-300">
            <DifficultyBadge :level="puzzle.difficulty" />
          </p>
        </div>
        <dl class="grid grid-cols-2 gap-2 text-sm">
          <div class="card flex items-baseline justify-between gap-2 px-3 py-2 lg:block">
            <dt class="text-slate-500 dark:text-slate-400">{{ t('game.time') }}</dt>
            <dd class="text-lg font-semibold tabular-nums">
              {{ formatDuration(game.elapsed.value) }}
            </dd>
          </div>
          <div class="card flex items-baseline justify-between gap-2 px-3 py-2 lg:block">
            <dt class="text-slate-500 dark:text-slate-400">{{ t('game.cells') }}</dt>
            <dd class="text-lg font-semibold tabular-nums">
              {{ game.filled.value }} / {{ game.target.value }}
            </dd>
          </div>
        </dl>
        <!-- Un murmure qui dérape, de plus en plus près à mesure que la corruption monte. -->
        <p
          v-if="whisper && !game.won.value"
          :key="whisper"
          class="whisper text-sm text-slate-500 italic dark:text-slate-400"
          :class="{ 'text-demon dark:text-demon': whisper === 'dark' }"
        >
          {{ t(`whisper.${whisper}`) }}
        </p>
      </template>
    </div>

    <!-- Plateau -->
    <section
      class="h-[min(calc(100vw-1.5rem),calc(100svh-21rem-var(--tabbar-h)))] min-h-64 w-full lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-[calc(100svh-5.5rem)]"
    >
      <p
        v-if="status === 'loading'"
        class="grid h-full place-items-center text-slate-500"
        role="status"
      >
        {{ t('common.loading') }}
      </p>
      <div
        v-else-if="status === 'error'"
        class="grid h-full place-content-center gap-3 text-center"
      >
        <p>{{ t('game.loadError') }}</p>
        <button type="button" class="btn btn-primary" @click="load(routeId)">
          {{ t('common.retry') }}
        </button>
      </div>
      <Board
        v-else
        :cells="game.board.cells.value"
        :row-clues="game.clues.value.rows"
        :col-clues="game.clues.value.cols"
        :tool="game.board.tool.value"
        :interactive="!game.won.value"
        allow-cross
        show-progress
        @stroke-start="(pos, tool) => game.board.begin(pos, tool)"
        @stroke-move="game.board.move"
        @stroke-end="game.board.end"
        @cell-action="(pos, tool) => game.board.toggleAt(pos, tool)"
        @undo="game.undo()"
      />
    </section>

    <!-- Commandes (sous le plateau sur mobile : à portée de pouce) -->
    <div class="space-y-3 lg:col-start-2 lg:row-start-2">
      <template v-if="puzzle">
        <div
          role="radiogroup"
          :aria-label="t('game.tool')"
          class="grid grid-cols-2 gap-1 rounded-xl bg-slate-200 p-1 dark:bg-slate-800"
        >
          <button
            v-for="tool in tools"
            :key="tool.id"
            type="button"
            role="radio"
            :aria-checked="game.board.tool.value === tool.id"
            class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 text-sm font-medium transition-colors"
            :class="
              game.board.tool.value === tool.id
                ? 'bg-white text-ink shadow-sm dark:bg-slate-600 dark:text-white'
                : 'text-slate-600 dark:text-slate-300'
            "
            @click="game.board.tool.value = tool.id"
          >
            <Icon :name="tool.icon" />
            <span class="truncate">{{ t(tool.label) }}</span>
          </button>
        </div>

        <div class="grid grid-cols-3 gap-2 lg:grid-cols-2">
          <button
            type="button"
            class="btn px-2"
            :disabled="!game.board.canUndo.value || game.won.value"
            @click="game.undo()"
          >
            <Icon name="undo" /> {{ t('game.undo') }}
          </button>
          <button type="button" class="btn px-2" @click="game.reset()">
            <Icon name="reset" /> {{ t('game.reset') }}
          </button>
          <button type="button" class="btn btn-primary px-2 lg:col-span-2" @click="next">
            <Icon name="shuffle" /> {{ t('game.new') }}
          </button>
        </div>

        <p
          v-if="offline"
          class="rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200"
          role="status"
        >
          {{ t('game.offline') }}
        </p>
        <p class="hidden text-sm text-slate-500 lg:block dark:text-slate-400">
          {{ isTouch ? t('game.helpTouch') : t('game.help') }}
        </p>
      </template>
    </div>

    <BaseDialog :open="winOpen" :title="t('win.title')" @close="winOpen = false">
      <WinReveal v-if="puzzle" :map="puzzle.map" class="mb-4" />
      <p class="mb-1" role="status">
        {{
          t('win.text', { title: puzzle?.title ?? '', time: formatDuration(game.elapsed.value) })
        }}
      </p>
      <p class="mb-4 text-sm text-slate-500 italic dark:text-slate-400">
        {{ game.mistakes.value === 0 ? t('win.whisperClean') : t('win.whisperDirty') }}
      </p>
      <div class="flex flex-col gap-2">
        <button
          v-if="puzzle && !puzzle.local"
          type="button"
          class="btn"
          :disabled="!auth.isLoggedIn || liking"
          :aria-pressed="puzzle.likedByMe"
          @click="toggleLike"
        >
          <Icon
            name="heart"
            :filled="puzzle.likedByMe"
            :class="puzzle.likedByMe ? 'text-red-500' : ''"
          />
          {{ puzzle.likedByMe ? t('win.liked') : t('win.like') }} · {{ puzzle.likes }}
        </button>
        <p v-if="puzzle && !puzzle.local && !auth.isLoggedIn" class="text-sm text-slate-500">
          <NuxtLink :to="localePath('login')" class="underline">{{
            t('win.loginToLike')
          }}</NuxtLink>
        </p>
        <button type="button" class="btn btn-primary" autofocus @click="next">
          <Icon name="shuffle" /> {{ t('game.next') }}
        </button>
        <button type="button" class="btn" @click="winOpen = false">{{ t('common.close') }}</button>
      </div>
    </BaseDialog>
  </div>
</template>
