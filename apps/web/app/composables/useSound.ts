import { useSettingsStore } from '@/stores/settings';
import closeUrl from '@/assets/audio/close.mp3';
import emptyUrl from '@/assets/audio/empty.mp3';
import valueUrl from '@/assets/audio/value.mp3';
import undoUrl from '@/assets/audio/undo.mp3';
import undo2Url from '@/assets/audio/undo_2.mp3';
import winUrl from '@/assets/audio/win.mp3';

const URLS = {
  fill: valueUrl,
  cross: emptyUrl,
  clear: closeUrl,
  undo: undoUrl,
  undo2: undo2Url,
  win: winUrl,
} as const;

export type SoundName = keyof typeof URLS;

const cache = new Map<SoundName, HTMLAudioElement>();

/** Les fichiers audio ne sont créés qu'à la première lecture (pas de chargement au démarrage). */
export function useSound() {
  const settings = useSettingsStore();

  function play(name: SoundName) {
    if (!settings.sound) return;
    let audio = cache.get(name);
    if (!audio) {
      audio = new Audio(URLS[name]);
      cache.set(name, audio);
    }
    audio.currentTime = 0;
    // Le navigateur peut refuser la lecture (autoplay) : ce n'est pas une erreur applicative.
    void audio.play().catch(() => {});
  }

  return { play };
}
