<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSettingsStore, type ThemeChoice } from '@/stores/settings';
import { hasVibration } from '@/utils/haptics';
import BaseDialog from './BaseDialog.vue';

defineProps<{ open: boolean }>();
defineEmits<{ close: [] }>();

const { t, locale, locales, setLocale } = useI18n();
const settings = useSettingsStore();
const canVibrate = ref(false);
onMounted(() => {
  canVibrate.value = hasVibration();
});
const shortcuts = [
  ['Ctrl + Z', 'settings.keyUndo'],
  ['Ctrl + Y', 'settings.keyRedo'],
  ['T', 'settings.keyTool'],
  ['← ↑ ↓ →', 'settings.keyMove'],
  ['Espace', 'settings.keyFill'],
  ['X', 'settings.keyCross'],
  ['?', 'settings.keyHelp'],
] as const;
const THEMES: ThemeChoice[] = ['system', 'light', 'dark'];
</script>

<template>
  <BaseDialog :open="open" :title="t('settings.title')" @close="$emit('close')">
    <div class="space-y-5">
      <fieldset>
        <legend class="field-label">{{ t('settings.theme') }}</legend>
        <div class="grid grid-cols-3 gap-2">
          <label
            v-for="choice in THEMES"
            :key="choice"
            class="btn cursor-pointer has-checked:border-ink has-checked:bg-slate-100 has-checked:text-ink has-focus-visible:outline-2 dark:has-checked:border-pearl dark:has-checked:bg-slate-700 dark:has-checked:text-pearl"
          >
            <input
              v-model="settings.theme"
              type="radio"
              name="theme"
              :value="choice"
              class="sr-only"
            />
            {{ t(`settings.${choice}`) }}
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend class="field-label">{{ t('settings.language') }}</legend>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="item in locales"
            :key="item.code"
            type="button"
            class="btn"
            :lang="item.code"
            :aria-pressed="item.code === locale"
            :class="
              item.code === locale
                ? 'border-ink bg-slate-100 text-ink dark:border-pearl dark:bg-slate-700 dark:text-pearl'
                : ''
            "
            @click="setLocale(item.code)"
          >
            {{ item.name }}
          </button>
        </div>
      </fieldset>

      <label class="flex cursor-pointer items-center gap-3">
        <input v-model="settings.sound" type="checkbox" class="size-5 accent-demon" />
        <span class="text-sm font-medium">{{ t('settings.sound') }}</span>
      </label>
      <label class="flex cursor-pointer items-center gap-3">
        <input v-model="settings.showStats" type="checkbox" class="size-5 accent-demon" />
        <span class="text-sm font-medium">{{ t('settings.stats') }}</span>
      </label>
      <label v-if="canVibrate" class="flex cursor-pointer items-center gap-3">
        <input v-model="settings.haptics" type="checkbox" class="size-5 accent-demon" />
        <span class="text-sm font-medium">{{ t('settings.haptics') }}</span>
      </label>
      <label class="flex cursor-pointer items-start gap-3">
        <input v-model="settings.leftHanded" type="checkbox" class="mt-0.5 size-5 accent-demon" />
        <span>
          <span class="block text-sm font-medium">{{ t('settings.leftHanded') }}</span>
          <span class="block text-xs text-slate-500 dark:text-slate-400">{{
            t('settings.leftHandedHint')
          }}</span>
        </span>
      </label>
      <label class="flex cursor-pointer items-start gap-3">
        <input v-model="settings.autoCross" type="checkbox" class="mt-0.5 size-5 accent-demon" />
        <span>
          <span class="block text-sm font-medium">{{ t('settings.autoCross') }}</span>
          <span class="block text-xs text-slate-500 dark:text-slate-400">{{
            t('settings.autoCrossHint')
          }}</span>
        </span>
      </label>
      <label class="flex cursor-pointer items-start gap-3">
        <input v-model="settings.corruption" type="checkbox" class="mt-0.5 size-5 accent-demon" />
        <span>
          <span class="block text-sm font-medium">{{ t('settings.corruption') }}</span>
          <span class="block text-xs text-slate-500 dark:text-slate-400">{{
            t('settings.corruptionHint')
          }}</span>
        </span>
      </label>

      <details class="text-sm">
        <summary class="cursor-pointer font-medium">{{ t('settings.shortcuts') }}</summary>
        <dl
          class="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-slate-600 dark:text-slate-300"
        >
          <template v-for="[keys, label] in shortcuts" :key="label">
            <dt>
              <kbd
                class="rounded border border-slate-300 px-1.5 py-0.5 text-xs dark:border-slate-600"
                >{{ keys }}</kbd
              >
            </dt>
            <dd>{{ t(label) }}</dd>
          </template>
        </dl>
      </details>
    </div>
  </BaseDialog>
</template>
