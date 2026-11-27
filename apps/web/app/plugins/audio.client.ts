import { watch } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { preloadSounds, useSound } from '@/composables/useSound';
import { getMixer } from '@/utils/audioMixer';

/** Applique les volumes du joueur au mixeur, dès le démarrage puis à chaque changement de curseur. */
export default defineNuxtPlugin(() => {
  const settings = useSettingsStore();
  watch(
    () => settings.mixVolumes,
    (volumes) => getMixer()?.setVolumes(volumes),
    { immediate: true },
  );

  // Tous les sons sont décodés d'avance (sinon le tout premier effet serait perdu) : dès que le navigateur est
  // au repos, et au premier geste au plus tard.
  setTimeout(preloadSounds, 800);
  window.addEventListener('pointerdown', preloadSounds, { once: true, capture: true });
  window.addEventListener('keydown', preloadSounds, { once: true, capture: true });

  // Petit « tap » discret sur les boutons et liens ; les gestes de jeu ont déjà le leur (`data-silent`,
  // grille, fenêtres qui s'ouvrent et se ferment elles-mêmes).
  const { play } = useSound();
  window.addEventListener(
    'click',
    (event) => {
      const target = (event.target as Element | null)?.closest(
        'button, a[href], summary, [role="button"]',
      );
      if (!target || target.closest('[data-silent], dialog, [role="grid"]')) return;
      if ((target as HTMLButtonElement).disabled) return;
      play('tap');
    },
    true,
  );
});
