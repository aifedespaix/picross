<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { ApiError } from '@/api/client';
import BaseDialog from '@/components/BaseDialog.vue';
import Board from '@/components/Board.vue';
import Icon from '@/components/Icon.vue';
import StarRating from '@/components/StarRating.vue';
import WinReveal from '@/components/WinReveal.vue';
import { useJourney, getChapters } from '@/composables/useJourney';
import { useAmbience } from '@/composables/useAmbience';
import { useMusic } from '@/composables/useMusic';
import {
  localPuzzle,
  localPuzzleById,
  usePlayableGame,
  type PlayablePuzzle,
} from '@/composables/usePlayableGame';
import { findStep, starsFor, type Stars } from '@/domain/journey';
import { chapterIdOfSlug, trackForChapter, trackForStage, type MusicTrack } from '@/domain/music';
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
/** Confirmation avant d'abandonner une partie en cours. */
const confirmNew = ref(false);
/** Pastille « Grille effacée · Annuler » (l'effacement est annulable, donc sans modale). */
const erasedToast = ref(false);
let erasedTimer: ReturnType<typeof setTimeout> | undefined;
const settingsOpen = useState('settings-open', () => false);
const liking = ref(false);

const journey = useJourney();
const music = useMusic();
const ambience = useAmbience();
const puzzle = computed(() => game.puzzle.value);
/** Parcours : la grille jouée compte pour la progression (et propose la suite). */
const journeyMode = computed(() => route.query.parcours === '1');
const earned = ref<Stars | null>(null);
const routeId = computed(() => (typeof route.params.id === 'string' ? route.params.id : undefined));

interface Fetched {
  puzzle: PlayablePuzzle | null;
  offline: boolean;
}

/** Récupère une grille ; bascule sur une grille locale si l'API est injoignable ou vide. */
async function fetchPuzzle(id?: string, exclude?: string): Promise<Fetched> {
  const lang = locale.value === 'en' ? 'en' : 'fr';
  // Grilles livrées avec l'application (parcours) : aucun appel réseau.
  if (id?.startsWith('local-')) {
    const local = localPuzzleById(id, lang);
    if (local) return { puzzle: local, offline: false };
  }
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
      puzzle: localPuzzle(exclude, lang),
      offline: unreachable,
    };
  }
}

function apply(result: Fetched) {
  offline.value = result.offline;
  if (!result.puzzle) {
    status.value = 'error';
    return;
  }
  game.start(result.puzzle);
  status.value = 'ready';
  hideErased();
}

/** Chargements suivants (grille suivante, navigation) : côté client. */
async function load(id?: string, exclude?: string) {
  status.value = 'loading';
  apply(await fetchPuzzle(id, exclude));
  game.restore();
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

/**
 * Musique de la grille : en parcours, celle de son chapitre ; en partie libre, celle que la corruption
 * du moment inspire. Choisie au début de la grille (pas de changement de piste en pleine partie).
 */
function chosenTrack(): MusicTrack {
  const current = puzzle.value;
  if (journeyMode.value && current?.local) {
    const chapter = chapterIdOfSlug(getChapters(), current.id.slice('local-'.length));
    const track = chapter ? trackForChapter(chapter) : null;
    if (track) return track;
  }
  return trackForStage(corruption.stage);
}
watch(
  () => puzzle.value?.id,
  () => puzzle.value && music.setTrack(chosenTrack()),
);
onBeforeUnmount(() => {
  music.stop();
  ambience.stop();
});

onMounted(async () => {
  void ambience.start();
  if (puzzle.value) music.setTrack(chosenTrack());
  if (journeyMode.value) journey.load();
  // Reprise de la partie et de l'outil mémorisés : après l'hydratation, pour rester identique au HTML serveur.
  game.restore();
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

const next = () => load(undefined, puzzle.value?.id);

// Parcours : une grille résolue enregistre ses étoiles (la meilleure performance est conservée).
watch(
  () => game.won.value,
  (won) => {
    const current = puzzle.value;
    if (!won || !journeyMode.value || !current?.local) {
      earned.value = null;
      return;
    }
    if (!journey.ready.value) journey.load();
    // Chaque indice demandé compte comme une erreur.
    earned.value = starsFor(game.mistakes.value + game.hints.value);
    journey.complete(current.id.slice('local-'.length), earned.value, game.elapsed.value);
  },
);

/** Suite du parcours : la grille suivante directement, ou la carte (bifurcation, fin de chapitre). */
const afterWin = computed(() => {
  const current = puzzle.value;
  if (!journeyMode.value || !current?.local || !game.won.value) return null;
  const views = journey.views.value;
  const view = findStep(views, current.id.slice('local-'.length));
  const following = view ? views[view.position + 1] : undefined;
  if (following && following.step.kind !== 'fork' && following.status === 'open') {
    return { label: t('journey.nextLevel'), level: following.step.levels[0] };
  }
  return { label: t('journey.toMap'), level: null };
});
function continueJourney() {
  const target = afterWin.value?.level;
  if (!target) return navigateTo(localePath('journey'));
  return navigateTo(
    localePath({
      name: 'play-id',
      params: { id: `local-${target.slug}` },
      query: { parcours: '1' },
    }),
  );
}

/** Texte de l'indice affiché (la ligne ou colonne est numérotée à partir de 1). */
const hintText = computed(() => {
  const hint = game.hint.value;
  if (!hint) return '';
  return t(`hint.${hint.reason}.${hint.axis}`, {
    n: hint.index + 1,
    clue: hint.clue ?? 0,
    count: hint.cells.length,
  });
});

const hasProgress = computed(() => game.filled.value > 0 || game.board.canUndo.value);
const isBlank = computed(() =>
  game.board.cells.value.every((row) => row.every((c) => c === 'blank')),
);

/** Une confirmation n'est demandée que s'il y a quelque chose à perdre. */
function askNew() {
  if (status.value === 'loading') return;
  if (game.won.value || !hasProgress.value) next();
  else confirmNew.value = true;
}
function confirmNewGame() {
  confirmNew.value = false;
  next();
}

function hideErased() {
  clearTimeout(erasedTimer);
  erasedToast.value = false;
}
/** Efface tout de suite : c'est annulable (pastille, ou bouton Annuler). */
function erase() {
  if (isBlank.value) return;
  const replay = game.won.value;
  game.clear();
  if (replay) return;
  erasedToast.value = true;
  clearTimeout(erasedTimer);
  erasedTimer = setTimeout(hideErased, 5000);
}
function undoErase() {
  game.undo();
  hideErased();
}

function toggleTool() {
  game.board.tool.value = game.board.tool.value === 'filled' ? 'crossed' : 'filled';
}

// Annuler : un appui = un coup ; maintenu, il remonte l'historique.
let holdDelay: ReturnType<typeof setTimeout> | undefined;
let holdRepeat: ReturnType<typeof setInterval> | undefined;
function stopHold() {
  clearTimeout(holdDelay);
  clearInterval(holdRepeat);
}
function undoDown(event: PointerEvent) {
  if (event.button > 0 || !game.undo()) return;
  stopHold();
  holdDelay = setTimeout(() => {
    holdRepeat = setInterval(() => game.undo() || stopHold(), 90);
  }, 450);
}
/** Activation au clavier (Entrée, Espace) : pas de pointeur, un seul coup. */
function undoKey(event: MouseEvent) {
  if (event.detail === 0) game.undo();
}
onBeforeUnmount(() => {
  stopHold();
  clearTimeout(erasedTimer);
});

// Raccourcis clavier (hors champs de saisie et fenêtres ouvertes).
useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.defaultPrevented || event.altKey) return;
  const target = event.target as HTMLElement | null;
  if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
  if (document.querySelector('dialog[open]')) return;
  const key = event.key.toLowerCase();
  const mod = event.ctrlKey || event.metaKey;
  if (mod && key === 'z') {
    event.preventDefault();
    if (event.shiftKey) game.redo();
    else game.undo();
  } else if (mod && key === 'y') {
    event.preventDefault();
    game.redo();
  } else if (!mod && key === 't') {
    toggleTool();
  } else if (!mod && key === 'h') {
    game.askHint();
  } else if (!mod && event.key === '?') {
    settingsOpen.value = true;
  }
});

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
  robots: () =>
    routeId.value && !routeId.value.startsWith('local-') ? 'index, follow' : 'noindex, follow',
});
</script>

<template>
  <div class="relative flex h-full flex-col">
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
      <span v-if="puzzle && game.hints.value > 0" :title="t('hint.used')">
        {{ t('hint.count', game.hints.value) }}
      </span>
      <p v-if="offline" class="truncate text-amber-700 dark:text-amber-300" role="status">
        {{ t('game.offline') }}
      </p>
    </div>

    <!-- Plateau + commandes. En paysage sur petit écran, les commandes passent sur le côté. -->
    <div
      class="flex min-h-0 flex-1 flex-col short:flex-row"
      :class="settings.leftHanded ? 'short:flex-row-reverse' : ''"
    >
      <!-- Plateau : occupe tout l'espace restant, sans défilement. -->
      <section class="relative min-h-0 min-w-0 flex-1" :aria-busy="status === 'loading'">
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
            :highlight="game.hint.value"
            allow-cross
            show-progress
            @stroke-start="
              (pos, tool) => {
                hideErased();
                game.board.begin(pos, tool);
              }
            "
            @stroke-move="game.board.move"
            @stroke-end="game.board.end"
            @stroke-cancel="game.board.cancel()"
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
            class="size-9 animate-spin rounded-full border-[3px] border-slate-300 border-t-demon motion-reduce:animate-none dark:border-slate-600 dark:border-t-demon"
            aria-hidden="true"
          />
          <span class="sr-only">{{ t('game.loadingNext') }}</span>
        </div>
      </section>

      <!-- Grille résolue : une barre, pas une fenêtre — l'image reste visible et rien ne bloque. -->
      <div
        v-if="puzzle && game.won.value"
        class="flex shrink-0 flex-col gap-3 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] short:w-64 short:justify-center"
        role="status"
      >
        <div class="flex items-center gap-3">
          <div class="w-12 shrink-0"><WinReveal :map="puzzle.map" /></div>
          <div class="min-w-0">
            <p class="font-semibold">
              {{ t('win.title') }}
              <StarRating v-if="earned" :stars="earned" class="ml-1 align-middle" />
              <span class="font-normal text-slate-500 dark:text-slate-400">
                · {{ t('game.winBar', { time: formatDuration(game.elapsed.value) }) }}
              </span>
            </p>
            <p class="text-xs text-slate-500 italic dark:text-slate-400">
              {{ game.mistakes.value === 0 ? t('win.whisperClean') : t('win.whisperDirty') }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-if="!puzzle.local && auth.isLoggedIn"
            type="button"
            class="btn px-3"
            :disabled="liking"
            :aria-pressed="puzzle.likedByMe"
            :aria-label="puzzle.likedByMe ? t('win.liked') : t('win.like')"
            :title="puzzle.likedByMe ? t('win.liked') : t('win.like')"
            @click="toggleLike"
          >
            <Icon
              name="heart"
              :filled="puzzle.likedByMe"
              :class="puzzle.likedByMe ? 'text-red-500' : ''"
            />
            <span class="tabular-nums">{{ puzzle.likes }}</span>
          </button>
          <NuxtLink
            v-else-if="!puzzle.local"
            :to="localePath('login')"
            class="ghost"
            :aria-label="t('win.loginToLike')"
            :title="t('win.loginToLike')"
          >
            <Icon name="heart" />
          </NuxtLink>
          <button
            type="button"
            class="ghost"
            :aria-label="t('game.reset')"
            :title="t('game.reset')"
            @click="erase"
          >
            <Icon name="reset" />
          </button>
          <NuxtLink
            v-if="afterWin?.level"
            :to="localePath('journey')"
            class="ghost"
            :aria-label="t('journey.toMap')"
            :title="t('journey.toMap')"
          >
            <Icon name="map" />
          </NuxtLink>
          <button
            v-if="afterWin"
            type="button"
            class="btn btn-primary flex-1"
            autofocus
            @click="continueJourney"
          >
            <Icon :name="afterWin.level ? 'pencil' : 'map'" /> {{ afterWin.label }}
          </button>
          <button v-else type="button" class="btn btn-primary flex-1" autofocus @click="next">
            <Icon name="shuffle" /> {{ t('game.next') }}
          </button>
        </div>
      </div>

      <!-- Commandes : discrètes, à portée de pouce. -->
      <div
        v-else-if="puzzle"
        class="flex shrink-0 items-center justify-center gap-1 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] short:flex-col short:px-2 short:pb-2"
        :class="settings.leftHanded ? 'flex-row-reverse' : ''"
      >
        <button
          type="button"
          class="ghost select-none"
          :disabled="!game.board.canUndo.value"
          :aria-label="t('game.undo')"
          :title="t('game.undo')"
          @pointerdown="undoDown"
          @pointerup="stopHold"
          @pointerleave="stopHold"
          @pointercancel="stopHold"
          @click="undoKey"
        >
          <Icon name="undo" />
        </button>
        <button
          type="button"
          class="ghost"
          :disabled="!game.board.canRedo.value"
          :aria-label="t('game.redo')"
          :title="t('game.redo')"
          @click="game.redo()"
        >
          <Icon name="redo" />
        </button>
        <button
          type="button"
          class="ghost"
          :disabled="isBlank"
          :aria-label="t('game.reset')"
          :title="t('game.reset')"
          @click="erase"
        >
          <Icon name="reset" />
        </button>
        <button
          type="button"
          class="ghost"
          :class="game.hint.value ? 'text-amber-500 dark:text-amber-400' : ''"
          :aria-label="game.hint.value ? t('hint.apply') : t('hint.ask')"
          :title="game.hint.value ? t('hint.apply') : t('hint.ask')"
          @click="game.askHint()"
        >
          <Icon name="bulb" :filled="!!game.hint.value" />
        </button>
        <!-- Un seul bouton : il affiche l'outil actif et bascule vers l'autre au toucher. -->
        <button
          type="button"
          class="btn mx-1 min-w-28 short:mx-0 short:min-w-0 short:px-2"
          :aria-label="
            t('game.toolTo', {
              tool: t(game.board.tool.value === 'filled' ? 'game.cross' : 'game.fill'),
            })
          "
          :title="t('game.tool')"
          @click="toggleTool"
        >
          <Icon :name="game.board.tool.value === 'filled' ? 'pencil' : 'x'" />
          <span class="short:hidden">{{
            t(game.board.tool.value === 'filled' ? 'game.fill' : 'game.cross')
          }}</span>
        </button>
        <NuxtLink
          v-if="journeyMode"
          :to="localePath('journey')"
          class="ghost"
          :aria-label="t('game.backToMap')"
          :title="t('game.backToMap')"
        >
          <Icon name="map" />
        </NuxtLink>
        <button
          v-else
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
    </div>

    <!-- Indice : où regarder et pourquoi ; « Appliquer » joue le coup à la place du joueur. -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-20 z-30 flex justify-center px-3 short:bottom-3"
    >
      <div
        v-if="game.hint.value && !game.won.value"
        class="pointer-events-auto flex max-w-md items-center gap-2 rounded-2xl bg-amber-100 py-1.5 pr-1.5 pl-4 text-sm text-amber-950 shadow-lg dark:bg-amber-900 dark:text-amber-50"
        role="status"
      >
        <span class="min-w-0">{{ hintText }}</span>
        <button
          type="button"
          class="shrink-0 rounded-xl bg-amber-950/10 px-3 py-1.5 font-medium hover:bg-amber-950/20 dark:bg-white/15 dark:hover:bg-white/25"
          @click="game.askHint()"
        >
          {{ t('hint.apply') }}
        </button>
        <button
          type="button"
          class="grid size-8 shrink-0 place-items-center rounded-xl hover:bg-amber-950/10 dark:hover:bg-white/15"
          :aria-label="t('hint.close')"
          :title="t('hint.close')"
          @click="game.dismissHint()"
        >
          <Icon name="x" />
        </button>
      </div>
    </div>

    <!-- Effacement annulable : plus rapide qu'une confirmation, et sans risque. -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-20 z-20 flex justify-center px-3 short:bottom-3"
    >
      <div
        v-if="erasedToast"
        class="pointer-events-auto flex items-center gap-3 rounded-2xl bg-ink py-1.5 pr-1.5 pl-4 text-sm text-pearl shadow-lg dark:bg-pearl dark:text-ink"
        role="status"
      >
        {{ t('game.erased') }}
        <button
          type="button"
          class="rounded-xl bg-white/15 px-3 py-1.5 font-medium hover:bg-white/25 dark:bg-ink/10 dark:hover:bg-ink/20"
          @click="undoErase"
        >
          {{ t('game.undo') }}
        </button>
      </div>
    </div>

    <BaseDialog :open="confirmNew" :title="t('game.newTitle')" @close="confirmNew = false">
      <p class="mb-5 text-sm text-slate-600 dark:text-slate-300">{{ t('game.newText') }}</p>
      <div class="grid grid-cols-2 gap-2">
        <button type="button" class="btn" @click="confirmNew = false">
          {{ t('common.cancel') }}
        </button>
        <button type="button" class="btn btn-primary" autofocus @click="confirmNewGame">
          {{ t('game.confirm') }}
        </button>
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
