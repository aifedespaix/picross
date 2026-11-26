<script setup lang="ts">
/** État vide : une petite grille 3 × 3 quasi vide, avec une seule case ronde (le détail du logo). */
const CELLS = [0, 1, 0, 0, 0, 1, 1, 0, 0] as const;
</script>

<template>
  <span class="empty-grid" aria-hidden="true">
    <span v-for="(on, index) in CELLS" :key="index" :class="{ on: on === 1, dot: index === 5 }" />
  </span>
</template>

<style scoped>
@reference '../assets/css/main.css';
.empty-grid {
  display: inline-grid;
  grid-template-columns: repeat(3, 1.25rem);
  grid-auto-rows: 1.25rem;
  gap: 3px;
}
.empty-grid > span {
  @apply bg-slate-200 dark:bg-slate-800;
}
.empty-grid > .on {
  @apply bg-slate-400 dark:bg-slate-500;
}
.empty-grid > .dot {
  @apply rounded-full;
}
</style>
