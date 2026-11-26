<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { api, ApiError } from '@/api/client';
import BaseDialog from '@/components/BaseDialog.vue';
import Board from '@/components/Board.vue';
import Icon from '@/components/Icon.vue';
import { localPuzzle, usePlayableGame, type PlayablePuzzle } from '@/composables/usePlayableGame';
import { useAuthStore } from '@/stores/auth';
import { formatDuration } from '@/utils/format';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const game = usePlayableGame();

const status = ref<'loading' | 'ready' | 'error'>('loading');
const offline = ref(false);
const winOpen = ref(false);
const liking = ref(false);
const isTouch = matchMedia('(pointer: coarse)').matches;

const puzzle = computed(() => game.puzzle.value);
const routeId = computed(() => (typeof route.params.id === 'string' ? route.params.id : undefined));

async function load(id?: string, exclude?: string) {
  status.value = 'loading';
  winOpen.value = false;
  offline.value = false;
  let next: PlayablePuzzle;
  try {
    next = id ? await api.getPicross(id) : await api.randomPicross(exclude);
  } catch (error) {
    const unreachable = error instanceof ApiError && error.isNetwork;
    const noPuzzleYet = !id && error instanceof ApiError && error.status === 404;
    if (!unreachable && !noPuzzleYet) {
      status.value = 'error';
      return;
    }
    next = localPuzzle(exclude);
    offline.value = unreachable;
  }
  game.start(next);
  status.value = 'ready';
  // L'URL pointe vers la grille jouée : on peut la partager ou rafraîchir la page.
  if (!id && !next.local) router.replace({ name: 'play-id', params: { id: next.id } });
}

onMounted(() => load(routeId.value));
watch(routeId, (id) => {
  if (id && id !== puzzle.value?.id) load(id);
  if (!id && route.name === 'play') load();
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
      </template>
    </div>

    <!-- Plateau -->
    <section
      class="h-[min(calc(100vw-1.5rem),calc(100svh-21rem))] min-h-64 w-full lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-[calc(100svh-5.5rem)]"
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
                ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-600 dark:text-white'
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
      <p class="mb-4" role="status">
        {{
          t('win.text', { title: puzzle?.title ?? '', time: formatDuration(game.elapsed.value) })
        }}
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
          <RouterLink to="/login" class="underline">{{ t('win.loginToLike') }}</RouterLink>
        </p>
        <button type="button" class="btn btn-primary" autofocus @click="next">
          <Icon name="shuffle" /> {{ t('game.next') }}
        </button>
        <button type="button" class="btn" @click="winOpen = false">{{ t('common.close') }}</button>
      </div>
    </BaseDialog>
  </div>
</template>
