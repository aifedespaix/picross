<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { levelStatus, type Level, type Progress, type StepView } from '@/domain/journey';
import Icon from './Icon.vue';
import PixelThumb from './PixelThumb.vue';
import StarRating from './StarRating.vue';

const props = defineProps<{
  /** Étapes du chapitre, avec leur état. */
  views: StepView[];
  progress: Progress;
  /** Grille mise en avant : la prochaine à jouer. */
  currentSlug?: string;
}>();
const emit = defineEmits<{ select: [level: Level, view: StepView] }>();
const { t, locale } = useI18n();

// Géométrie du chemin (viewBox 360 de large) : une étape par rangée, en zigzag ; une bifurcation
// pose ses deux grilles côte à côte.
const WIDTH = 360;
const ROW = 112;
const TOP = 64;
const ZIGZAG = [180, 112, 180, 248];

interface Node {
  level: Level;
  view: StepView;
  x: number;
  y: number;
  boss: boolean;
  status: ReturnType<typeof levelStatus>;
}

const rows = computed<Node[][]>(() =>
  props.views.map((view, row) => {
    const y = TOP + row * ROW;
    const xs = view.step.kind === 'fork' ? [96, 264] : [ZIGZAG[row % ZIGZAG.length]!];
    return view.step.levels.map((level, i) => ({
      level,
      view,
      x: xs[i]!,
      y,
      boss: view.step.kind === 'boss',
      status: levelStatus(view, level, props.progress),
    }));
  }),
);
const height = computed(() => TOP + (props.views.length - 1) * ROW + TOP);

interface Link {
  d: string;
  solid: boolean;
}
/** Courbes entre deux rangées ; deux bifurcations consécutives se relient branche à branche. */
const links = computed<Link[]>(() =>
  rows.value.slice(1).flatMap((to, index) => {
    const from = rows.value[index]!;
    const pairs = from.flatMap((a, i) =>
      to
        .filter((_, j) => from.length !== to.length || from.length === 1 || i === j)
        .map((b) => [a, b] as const),
    );
    return pairs.map(([a, b]) => ({
      d: `M${a.x} ${a.y} C${a.x} ${a.y + ROW / 2} ${b.x} ${b.y - ROW / 2} ${b.x} ${b.y}`,
      solid: a.status === 'done',
    }));
  }),
);

const pct = (value: number, total: number) => `${(value / total) * 100}%`;
const nameOf = (level: Level) => (locale.value === 'en' ? level.names.en : level.names.fr);

function label(node: Node): string {
  const n = node.view.position + 1;
  const state = t(`journey.status.${node.status}`);
  const stars = props.progress[node.level.slug]?.stars;
  return [
    t('journey.level', { n }),
    node.status === 'done' ? nameOf(node.level) : '',
    state,
    stars ? t('journey.starsOf', { n: stars }) : '',
  ]
    .filter(Boolean)
    .join(' — ');
}
</script>

<template>
  <div class="relative mx-auto w-full max-w-sm" :style="{ aspectRatio: `${WIDTH} / ${height}` }">
    <svg
      :viewBox="`0 0 ${WIDTH} ${height}`"
      class="absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <path
        v-for="(link, index) in links"
        :key="index"
        :d="link.d"
        stroke="currentColor"
        stroke-linecap="round"
        :stroke-width="link.solid ? 5 : 3"
        :stroke-dasharray="link.solid ? undefined : '2 9'"
        :class="link.solid ? 'text-ink dark:text-pearl' : 'text-slate-300 dark:text-slate-700'"
      />
    </svg>

    <template v-for="row in rows" :key="row[0]!.view.position">
      <button
        v-for="node in row"
        :id="`node-${node.level.slug}`"
        :key="node.level.slug"
        type="button"
        class="node"
        :class="[
          `is-${node.status}`,
          { 'is-boss': node.boss, 'is-current': node.level.slug === currentSlug },
        ]"
        :style="{ left: pct(node.x, WIDTH), top: pct(node.y, height) }"
        :aria-label="label(node)"
        @click="emit('select', node.level, node.view)"
      >
        <PixelThumb
          v-if="node.status === 'done'"
          :bits="node.level.bits"
          class="size-[68%] text-ink dark:text-pearl"
        />
        <Icon v-else-if="node.status === 'locked'" name="lock" class="size-6" />
        <span v-else-if="node.boss" class="boss-eye" aria-hidden="true" />
        <span v-else class="text-lg font-semibold tabular-nums">{{ node.view.position + 1 }}</span>
        <StarRating
          v-if="node.status === 'done'"
          :stars="progress[node.level.slug]?.stars ?? 0"
          size="size-3.5"
          class="absolute -bottom-6 rounded-full bg-pearl px-1 py-0.5 dark:bg-ink"
        />
      </button>
    </template>
  </div>
</template>

<style scoped>
@reference '../assets/css/main.css';
.node {
  @apply absolute grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 transition duration-150 active:scale-95;
}
.node.is-boss {
  @apply size-[5.25rem] border-[3px];
}
.node.is-locked {
  @apply border-slate-300 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-600;
}
.node.is-open {
  @apply border-ink bg-ink text-pearl shadow-lg hover:scale-105 dark:border-pearl dark:bg-pearl dark:text-ink;
}
.node.is-done {
  @apply border-ink bg-white hover:scale-105 dark:border-pearl dark:bg-slate-900;
}
/* La prochaine grille : un anneau rouge qui bat, comme le pixel rond du logo. */
.node.is-current::after {
  content: '';
  @apply pointer-events-none absolute -inset-2 rounded-full border-2 border-demon;
}
@media (prefers-reduced-motion: no-preference) {
  .node.is-current::after {
    animation: ring 2s ease-in-out infinite;
  }
}
@keyframes ring {
  0%,
  100% {
    opacity: 0.9;
    transform: scale(1);
  }
  50% {
    opacity: 0.25;
    transform: scale(1.12);
  }
}
.boss-eye {
  @apply size-4 rounded-full bg-demon;
}
</style>
