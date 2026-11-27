<script setup lang="ts">
defineProps<{
  clues: number[];
  /** Pour chaque indice : `true` s'il est déjà satisfait (grisé). */
  done?: boolean[];
  direction: 'row' | 'col';
  active?: boolean;
  /** Mise en avant par un indice. */
  hinted?: boolean;
}>();
</script>

<template>
  <div
    class="clue-line flex items-center justify-end rounded-sm font-semibold tabular-nums transition-colors"
    :class="[
      direction === 'col' ? 'flex-col' : 'flex-row px-[calc(var(--cell)*.1)]',
      hinted ? 'bg-amber-200 dark:bg-amber-800/60' : active ? 'bg-slate-200 dark:bg-slate-800' : '',
    ]"
  >
    <span
      v-for="(value, index) in clues.length ? clues : [0]"
      :key="index"
      class="clue-number flex items-center justify-center transition-opacity"
      :class="done?.[index] ? 'opacity-30' : ''"
    >
      {{ value }}
    </span>
  </div>
</template>

<style scoped>
.clue-number {
  font-size: calc(var(--cell) * 0.5);
  line-height: 1;
}
.clue-line:where(.flex-col) .clue-number {
  width: var(--cell);
  height: calc(var(--cell) * 0.6);
}
.clue-line:where(.flex-row) .clue-number {
  min-width: calc(var(--cell) * 0.6);
  height: var(--cell);
}
</style>
