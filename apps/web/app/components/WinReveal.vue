<script setup lang="ts">
import { computed } from 'vue';

/**
 * Révélation de l'image résolue, puis le twist : un seul pixel devient rond. Rien d'autre ne
 * change : c'est le détail du logo.
 */
const props = defineProps<{ map: readonly (readonly number[])[] }>();

const height = computed(() => props.map.length);
const width = computed(() => props.map[0]?.length ?? 0);

interface Cell {
  on: boolean;
  /** Rang d'apparition (ordre de lecture). */
  order: number;
}

const cells = computed<Cell[]>(() => {
  let order = 0;
  return props.map.flat().map((bit) => ({ on: !!bit, order: bit ? order++ : -1 }));
});
const total = computed(() => cells.value.filter((c) => c.on).length);

/** Case pleine la plus proche d'un point (en fraction de la largeur / hauteur). */
function nearest(fx: number, fy: number, exclude = -1): number {
  let best = -1;
  let bestDist = Infinity;
  cells.value.forEach((cell, index) => {
    if (!cell.on || index === exclude) return;
    const col = index % width.value;
    const row = Math.floor(index / width.value);
    const d = (col + 0.5 - fx * width.value) ** 2 + (row + 0.5 - fy * height.value) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = index;
    }
  });
  return best;
}

const round = computed(() => nearest(0.5, 0.34));

// L'image apparaît en ~1,4 s ; l'œil s'ouvre juste après.
const STEP = computed(() => Math.min(0.03, 1.4 / Math.max(1, total.value)));
const roundDelay = computed(() => `${(total.value * STEP.value + 0.5).toFixed(2)}s`);
</script>

<template>
  <div
    class="reveal"
    role="img"
    :aria-label="$t('win.reveal')"
    :style="{ '--cols': width, '--rows': height, '--round-delay': roundDelay }"
  >
    <span
      v-for="(cell, index) in cells"
      :key="index"
      class="px"
      :class="{ on: cell.on, round: index === round }"
      :style="cell.on ? { '--i': cell.order, '--step': `${STEP}s` } : undefined"
    />
  </div>
</template>

<style scoped>
@reference '../assets/css/main.css';
.reveal {
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  width: min(100%, 13rem);
  aspect-ratio: calc(var(--cols) / var(--rows));
  margin-inline: auto;
}
.px.on {
  @apply bg-ink dark:bg-pearl;
}
.px.round {
  @apply rounded-full;
}
@media (prefers-reduced-motion: no-preference) {
  .px.on {
    animation: pop 0.35s ease-out both;
    animation-delay: calc(var(--i) * var(--step));
  }
  .px.round {
    animation:
      pop 0.35s ease-out both,
      morph 0.6s ease-in-out both,
      gaze 2.4s ease-in-out infinite;
    animation-delay:
      calc(var(--i) * var(--step)), var(--round-delay), calc(var(--round-delay) + 0.6s);
  }
}
@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.4);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes morph {
  from {
    border-radius: 0;
  }
  to {
    border-radius: 9999px;
  }
}
@keyframes gaze {
  50% {
    transform: scale(1.12);
  }
}
</style>
