<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { LOCALES } from '@/i18n';
import { useSettingsStore, type ThemeChoice } from '@/stores/settings';
import BaseDialog from './BaseDialog.vue';

defineProps<{ open: boolean }>();
defineEmits<{ close: [] }>();

const { t } = useI18n();
const settings = useSettingsStore();
const THEMES: ThemeChoice[] = ['system', 'light', 'dark'];
const LOCALE_NAMES = { fr: 'Français', en: 'English' } as const;
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
            class="btn cursor-pointer has-checked:border-blue-600 has-checked:bg-blue-50 has-checked:text-blue-800 has-focus-visible:outline-2 dark:has-checked:bg-slate-700 dark:has-checked:text-blue-200"
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

      <div>
        <label for="locale" class="field-label">{{ t('settings.language') }}</label>
        <select id="locale" v-model="settings.locale" class="field-input">
          <option v-for="locale in LOCALES" :key="locale" :value="locale">
            {{ LOCALE_NAMES[locale] }}
          </option>
        </select>
      </div>

      <label class="flex cursor-pointer items-center gap-3">
        <input v-model="settings.sound" type="checkbox" class="size-5 accent-blue-600" />
        <span class="text-sm font-medium">{{ t('settings.sound') }}</span>
      </label>
    </div>
  </BaseDialog>
</template>
