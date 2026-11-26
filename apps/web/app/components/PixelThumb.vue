<script setup lang="ts">
import { computed } from 'vue';

/** Miniature pixel art d'une solution (ou, avec `ghost`, simple gabarit vide de la grille). */
const props = defineProps<{ bits: readonly (readonly number[])[]; ghost?: boolean }>();

const height = computed(() => props.bits.length);
const width = computed(() => props.bits[0]?.length ?? 0);
const path = computed(() =>
  props.bits.flatMap((line, y) => line.map((bit, x) => (bit ? `M${x} ${y}h1v1h-1z` : ''))).join(''),
);
</script>

<template>
  <svg
    :viewBox="`0 0 ${width} ${height}`"
    shape-rendering="crispEdges"
    class="block h-full w-full"
    aria-hidden="true"
  >
    <path v-if="!ghost" :d="path" fill="currentColor" />
    <rect
      v-else
      x="0.15"
      y="0.15"
      :width="width - 0.3"
      :height="height - 0.3"
      fill="none"
      stroke="currentColor"
      stroke-width="0.3"
      stroke-dasharray="0.8 0.8"
      opacity="0.5"
    />
  </svg>
</template>
