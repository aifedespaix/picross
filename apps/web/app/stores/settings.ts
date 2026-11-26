import { usePreferredDark } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export type ThemeChoice = 'system' | 'light' | 'dark';

const COOKIE = { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', path: '/' } as const;

/**
 * Préférences stockées en cookies (et non en localStorage) : le serveur les lit pendant le SSR,
 * donc le thème choisi est déjà appliqué dans le HTML reçu (pas de flash).
 */
export const useSettingsStore = defineStore('settings', () => {
  const theme = useCookie<ThemeChoice>('picross_theme', { ...COOKIE, default: () => 'system' });
  const sound = useCookie<boolean>('picross_sound', { ...COOKIE, default: () => true });
  const prefersDark = usePreferredDark();

  const isDark = computed(
    () => theme.value === 'dark' || (theme.value === 'system' && prefersDark.value),
  );

  return { theme, sound, isDark };
});
