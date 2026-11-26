import { useLocalStorage, usePreferredDark } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, watchEffect } from 'vue';
import { i18n, type Locale } from '@/i18n';

export type ThemeChoice = 'system' | 'light' | 'dark';

/** Préférences persistées dans le navigateur (thème, langue, son). */
export const useSettingsStore = defineStore('settings', () => {
  const theme = useLocalStorage<ThemeChoice>('picross:theme', 'system');
  const locale = useLocalStorage<Locale>('picross:locale', i18n.global.locale.value as Locale);
  const sound = useLocalStorage('picross:sound', true);
  const prefersDark = usePreferredDark();

  const isDark = computed(
    () => theme.value === 'dark' || (theme.value === 'system' && prefersDark.value),
  );

  watchEffect(() => {
    document.documentElement.classList.toggle('dark', isDark.value);
  });
  watchEffect(() => {
    i18n.global.locale.value = locale.value;
    document.documentElement.lang = locale.value;
  });

  return { theme, locale, sound, isDark };
});
