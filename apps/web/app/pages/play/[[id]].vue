<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ApiError } from '@/api/client';
import BaseDialog from '@/components/BaseDialog.vue';
import Board from '@/components/Board.vue';
import Icon from '@/components/Icon.vue';
import WinReveal from '@/components/WinReveal.vue';
import { localPuzzle, usePlayableGame, type PlayablePuzzle } from '@/composables/usePlayableGame';
import { useAuthStore } from '@/stores/auth';
import { useCorruptionStore } from '@/stores/corruption';
import { useSettingsStore } from '@/stores/settings';
import { formatDuration } from '@/utils/format';

const { t, locale } = useI18n();
const api = useApi();
const route = useRoute();
const localePath = useLocalePath();
const auth = useAuthStore();
const game = usePlayableGame();
const corruption = useCorruptionStore();
const settings = useSettingsStore();
const whisper = computed(() => (corruption.stage === 'pure' ? null : corruption.stage));

const status = ref<'loading' | 'ready' | 'error'>('ready');
const offline = ref(false);
const winOpen = ref(false);
/** Action en attente de confirmation (perte de la progression). */
const confirming = ref<'erase' | 'new' | null>(null);
const liking = ref(false);

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

const hasProgress = computed(() => game.filled.value > 0 || game.board.canUndo.value);
const isBlank = computed(() =>
  game.board.cells.value.every((row) => row.every((c) => c === 'blank')),
);

/** Une confirmation n'est demandée que s'il y a quelque chose à perdre. */
function askNew() {
  if (status.value === 'loading') return;
  if (game.won.value || !hasProgress.value) next();
  else confirming.value = 'new';
}
function askErase() {
  if (isBlank.value) return;
  if (game.won.value) game.clear();
  else confirming.value = 'erase';
}
function confirmAction() {
  const action = confirming.value;
  confirming.value = null;
  if (action === 'erase') game.clear();
  else if (action === 'new') next();
}

function toggleTool() {
  game.board.tool.value = game.board.tool.value === 'filled' ? 'crossed' : 'filled';
}

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

// Une page par grille (indexable) ; la page « au hasard » sans identifiant ne l'est pas.
definePageMeta({ key: 'play', layout: 'game' });
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
  <div class="flex h-full flex-col">
    <h1 class="sr-only">{{ puzzle?.title ?? t('nav.play') }}</h1>

    <!-- Bandeau discret : temps/cases (si activés dans les réglages), murmure, hors ligne. -->
    <div
      class="flex h-11 shrink-0 items-center justify-center gap-4 px-12 text-sm text-slate-500 tabular-nums dark:text-slate-400"
    >
      <template v-if="puzzle && settings.showStats">
        <span>{{ formatDuration(game.elapsed.value) }}</span>
        <span>{{ game.filled.value }} / {{ game.target.value }}</span>
      </template>
      <p
        v-else-if="whisper && !game.won.value"
        :key="whisper"
        class="whisper truncate italic"
        :class="{ 'text-demon dark:text-demon': whisper === 'dark' }"
      >
        {{ t(`whisper.${whisper}`) }}
      </p>
      <p v-if="offline" class="truncate text-amber-700 dark:text-amber-300" role="status">
        {{ t('game.offline') }}
      </p>
    </div>

    <!-- Plateau : occupe tout l'espace restant, sans défilement. -->
    <section class="relative min-h-0 flex-1" :aria-busy="status === 'loading'">
      <div
        class="absolute inset-0 px-2 transition-opacity duration-200"
        :class="status === 'loading' && puzzle ? 'opacity-40' : ''"
      >
        <div v-if="status === 'error'" class="grid h-full place-content-center gap-3 text-center">
          <p>{{ t('game.loadError') }}</p>
          <button type="button" class="btn btn-primary" @click="load(routeId)">
            {{ t('common.retry') }}
          </button>
        </div>
        <Board
          v-else-if="puzzle"
          :cells="game.board.cells.value"
          :row-clues="game.clues.value.rows"
          :col-clues="game.clues.value.cols"
          :tool="game.board.tool.value"
          :interactive="!game.won.value && status !== 'loading'"
          allow-cross
          show-progress
          @stroke-start="(pos, tool) => game.board.begin(pos, tool)"
          @stroke-move="game.board.move"
          @stroke-end="game.board.end"
          @cell-action="(pos, tool) => game.board.toggleAt(pos, tool)"
          @undo="game.undo()"
        />
      </div>
      <!-- Retour immédiat : un chargement, même court, ne ressemble jamais à un blocage. -->
      <div
        v-if="status === 'loading'"
        class="absolute inset-0 z-10 grid place-items-center"
        role="status"
      >
        <span
          class="size-9 animate-spin rounded-full border-[3px] border-slate-300 border-t-demon dark:border-slate-600 dark:border-t-demon"
          aria-hidden="true"
        />
        <span class="sr-only">{{ t('game.loadingNext') }}</span>
      </div>
    </section>

    <!-- Commandes : discrètes, à portée de pouce. -->
    <div
      v-if="puzzle"
      class="flex shrink-0 items-center justify-center gap-2 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <button
        type="button"
        class="ghost"
        :disabled="!game.board.canUndo.value || game.won.value"
        :aria-label="t('game.undo')"
        :title="t('game.undo')"
        @click="game.undo()"
      >
        <Icon name="undo" />
      </button>
      <button
        type="button"
        class="ghost"
        :disabled="isBlank"
        :aria-label="t('game.reset')"
        :title="t('game.reset')"
        @click="askErase"
      >
        <Icon name="reset" />
      </button>
      <!-- Un seul bouton : il affiche l'outil actif et bascule vers l'autre au toucher. -->
      <button
        type="button"
        class="btn mx-2 min-w-32"
        :aria-label="
          t('game.toolTo', {
            tool: t(game.board.tool.value === 'filled' ? 'game.cross' : 'game.fill'),
          })
        "
        :title="t('game.tool')"
        @click="toggleTool"
      >
        <Icon :name="game.board.tool.value === 'filled' ? 'pencil' : 'x'" />
        {{ t(game.board.tool.value === 'filled' ? 'game.fill' : 'game.cross') }}
      </button>
      <button
        type="button"
        class="ghost"
        :disabled="status === 'loading'"
        :aria-label="t('game.new')"
        :title="t('game.new')"
        @click="askNew"
      >
        <Icon name="shuffle" />
      </button>
    </div>

    <BaseDialog
      :open="confirming !== null"
      :title="confirming === 'erase' ? t('game.eraseTitle') : t('game.newTitle')"
      @close="confirming = null"
    >
      <p class="mb-5 text-sm text-slate-600 dark:text-slate-300">
        {{ confirming === 'erase' ? t('game.eraseText') : t('game.newText') }}
      </p>
      <div class="grid grid-cols-2 gap-2">
        <button type="button" class="btn" @click="confirming = null">
          {{ t('common.cancel') }}
        </button>
        <button type="button" class="btn btn-primary" autofocus @click="confirmAction">
          {{ t('game.confirm') }}
        </button>
      </div>
    </BaseDialog>

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

<style scoped>
@reference '../../assets/css/main.css';
.ghost {
  @apply grid size-11 place-items-center rounded-xl text-slate-500 transition duration-150 hover:bg-slate-200/70 hover:text-ink active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-pearl;
}
</style>
