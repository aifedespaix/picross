<script setup lang="ts">
import { computeClues, fromBits } from '@picross/shared';

/** Petite grille 5 × 5 décorative qui se remplit en boucle (figée si « réduire les animations »). */
const PATTERN = [
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
];
const clues = computeClues(fromBits(PATTERN));
let order = 0;
const cells = PATTERN.map((row) => row.map((bit) => (bit ? order++ : -1)));
</script>

<template>
  <div class="hero-board" role="img" :aria-label="$t('home.demo')">
    <div class="corner" aria-hidden="true" />
    <div class="col-clues" aria-hidden="true">
      <div v-for="(c, i) in clues.cols" :key="i" class="clue clue-col">
        <span v-for="(n, k) in c" :key="k">{{ n }}</span>
      </div>
    </div>
    <div class="row-clues" aria-hidden="true">
      <div v-for="(c, i) in clues.rows" :key="i" class="clue clue-row">
        <span v-for="(n, k) in c" :key="k">{{ n }}</span>
      </div>
    </div>
    <div class="cells" aria-hidden="true">
      <template v-for="(row, r) in cells" :key="r">
        <span
          v-for="(slot, c) in row"
          :key="c"
          class="cell"
          :class="{ on: slot >= 0 }"
          :style="slot >= 0 ? { '--i': slot } : undefined"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
@reference '../assets/css/main.css';

.hero-board {
  --cell: clamp(2.25rem, 9vw, 3.5rem);
  display: grid;
  grid-template-columns: auto calc(var(--cell) * 5);
  grid-template-rows: auto calc(var(--cell) * 5);
  grid-template-areas:
    '. cols'
    'rows cells';
  @apply rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900;
}
.col-clues {
  grid-area: cols;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: end;
}
.row-clues {
  grid-area: rows;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
}
.clue {
  @apply flex items-center justify-end gap-1.5 font-semibold text-slate-700 tabular-nums dark:text-slate-200;
  font-size: calc(var(--cell) * 0.42);
}
.clue-col {
  @apply flex-col justify-end gap-0 pb-1;
  line-height: 1.15;
}
.clue-row {
  @apply pr-2;
}
.cells {
  grid-area: cells;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  @apply bg-slate-300 p-0.5 dark:bg-slate-600;
}
.cell {
  @apply bg-white dark:bg-slate-900;
}
.cell.on {
  @apply bg-blue-600 dark:bg-blue-500;
}
@media (prefers-reduced-motion: no-preference) {
  .cell.on {
    animation: fill 9s infinite both;
    animation-delay: calc(var(--i) * 0.28s);
  }
}
@keyframes fill {
  0%,
  8% {
    background-color: white;
    transform: scale(0.85);
  }
  14%,
  82% {
    background-color: var(--color-blue-600);
    transform: scale(1);
  }
  92%,
  100% {
    background-color: white;
    transform: scale(0.85);
  }
}
</style>
