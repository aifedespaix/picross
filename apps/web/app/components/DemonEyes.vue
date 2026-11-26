<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import { ref } from 'vue';

/** Deux petits points rouges qui suivent le curseur. Immobiles si « réduire les animations ». */
const eyes = ref<HTMLElement>();
const offset = ref({ x: 0, y: 0 });

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  useEventListener(window, 'pointermove', (event: PointerEvent) => {
    const rect = eyes.value?.getBoundingClientRect();
    if (!rect) return;
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy) || 1;
    const reach = Math.min(1, dist / 400) * 3; // 3 px max : on le remarque à peine
    offset.value = { x: (dx / dist) * reach, y: (dy / dist) * reach };
  });
});
</script>

<template>
  <span ref="eyes" class="eyes" aria-hidden="true">
    <span class="eye" :style="{ transform: `translate(${offset.x}px, ${offset.y}px)` }" />
    <span class="eye" :style="{ transform: `translate(${offset.x}px, ${offset.y}px)` }" />
  </span>
</template>

<style scoped>
.eyes {
  display: inline-flex;
  gap: 0.9rem;
}
.eye {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: var(--color-demon);
  box-shadow: 0 0 12px 2px rgb(227 16 20 / 0.55);
  transition: transform 0.12s ease-out;
}
</style>
