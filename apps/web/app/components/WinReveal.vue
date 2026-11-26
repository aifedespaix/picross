<script setup lang="ts">
import { computed } from 'vue';

/**
 * Révélation de l'image résolue, puis le twist : un pixel devient rond, rouge… et regarde.
 * Grille parfaite : un seul œil. Grille avec erreurs : le démon ouvre les deux.
 */
const props = defineProps<{ map: readonly (readonly number[])[]; clean: boolean }>();

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

const eyes = computed(() => {
  const first = nearest(props.clean ? 0.5 : 0.36, 0.34);
  if (props.clean || first < 0) return [first].filter((i) => i >= 0);
  const second = nearest(0.64, 0.34, first);
  return [first, second].filter((i) => i >= 0);
});

// L'image apparaît en ~1,4 s ; l'œil s'ouvre juste après.
const STEP = computed(() => Math.min(0.03, 1.4 / Math.max(1, total.value)));
const eyeDelay = computed(() => `${(total.value * STEP.value + 0.5).toFixed(2)}s`);
</script>

<template>
  <div
    class="reveal"
    role="img"
    :aria-label="$t('win.reveal')"
    :style="{ '--cols': width, '--rows': height, '--eye-delay': eyeDelay }"
  >
    <span
      v-for="(cell, index) in cells"
      :key="index"
      class="px"
      :class="{ on: cell.on, eye: eyes.includes(index) }"
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
.px.eye {
  @apply rounded-full;
}
@media (prefers-reduced-motion: no-preference) {
  .px.on {
    animation: pop 0.35s ease-out both;
    animation-delay: calc(var(--i) * var(--step));
  }
  .px.eye {
    animation:
      pop 0.35s ease-out both,
      open 0.9s ease-in-out both,
      gaze 2.4s ease-in-out infinite;
    animation-delay: calc(var(--i) * var(--step)), var(--eye-delay), calc(var(--eye-delay) + 0.9s);
  }
}
@media (prefers-reduced-motion: reduce) {
  .px.eye {
    background-color: var(--color-demon);
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
/* Le pixel noir vire au rouge en devenant rond. */
@keyframes open {
  from {
    background-color: currentColor;
  }
  to {
    background-color: var(--color-demon);
    transform: scale(1.25);
  }
}
@keyframes gaze {
  50% {
    transform: scale(1.4);
  }
}
</style>
