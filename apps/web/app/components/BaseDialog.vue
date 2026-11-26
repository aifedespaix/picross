<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Icon from './Icon.vue';

const props = defineProps<{ open: boolean; title: string }>();
const emit = defineEmits<{ close: [] }>();
const { t } = useI18n();
const dialog = ref<HTMLDialogElement>();
const titleId = `dialog-title-${Math.random().toString(36).slice(2, 8)}`;

// <dialog> natif : focus piégé, fermeture avec Échap et inertie de l'arrière-plan gérés par le navigateur.
watch(
  () => props.open,
  async (open) => {
    await nextTick();
    const el = dialog.value;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  },
  { immediate: true },
);

onBeforeUnmount(() => dialog.value?.close());

function onBackdropClick(event: MouseEvent) {
  if (event.target === dialog.value) emit('close');
}
</script>

<template>
  <dialog
    ref="dialog"
    :aria-labelledby="titleId"
    class="m-auto max-h-[90dvh] w-[min(92vw,26rem)] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    @cancel.prevent="emit('close')"
    @click="onBackdropClick"
  >
    <div v-if="open" class="p-5">
      <div class="mb-4 flex items-start justify-between gap-4">
        <h2 :id="titleId" class="text-lg font-semibold">{{ title }}</h2>
        <button
          type="button"
          class="btn btn-icon -mt-1 -mr-2 border-transparent bg-transparent shadow-none"
          :aria-label="t('common.close')"
          @click="emit('close')"
        >
          <Icon name="x" />
        </button>
      </div>
      <slot />
    </div>
  </dialog>
</template>
