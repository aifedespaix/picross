import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useSettingsStore } from './settings';

const COOKIE = { maxAge: 60 * 60 * 24 * 30, sameSite: 'lax', path: '/' } as const;

/**
 * « Corruption » : jauge de 0 (pureté) à 1 (le démon prend la place), conservée d'une grille à
 * l'autre. Chaque erreur la fait monter ; une grille réussie la purifie, davantage encore si elle
 * est parfaite. Elle ne pilote que l'ambiance (voile rouge, rythme du pixel, murmures).
 */
export const useCorruptionStore = defineStore('corruption', () => {
  const settings = useSettingsStore();
  const raw = useCookie<number>('picross_corruption', { ...COOKIE, default: () => 0 });

  const clamp = (n: number) => Math.min(1, Math.max(0, Number.isFinite(n) ? n : 0));

  /** Niveau effectif (0 si l'option est désactivée dans les réglages). */
  const level = computed(() => (settings.corruption ? clamp(Number(raw.value)) : 0));
  /** Palier discret, pratique pour choisir un texte. */
  const stage = computed<'pure' | 'calm' | 'uneasy' | 'dark'>(() =>
    level.value < 0.15
      ? 'pure'
      : level.value < 0.4
        ? 'calm'
        : level.value < 0.7
          ? 'uneasy'
          : 'dark',
  );

  function bump(amount = 0.1) {
    raw.value = clamp(Number(raw.value) + amount);
  }
  /** Fin de grille : `clean` = résolue sans aucune erreur. */
  function purify(clean: boolean) {
    raw.value = clamp(Number(raw.value) - (clean ? 0.35 : 0.12));
  }
  const reset = () => {
    raw.value = 0;
  };

  return { level, stage, bump, purify, reset };
});
