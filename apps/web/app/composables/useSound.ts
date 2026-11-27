import { useSettingsStore } from '@/stores/settings';
import { getAudioContext } from '@/utils/audioContext';
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

/** Écart entre deux sons d'une même rafale : assez court pour rester fluide, assez long pour les compter. */
const BURST_STEP_S = 0.035;
/** Au-delà, la rafale n'ajoute plus de son (une grille entière ne doit pas devenir un bruit blanc). */
const BURST_MAX = 24;

const buffers = new Map<SoundName, AudioBuffer>();
const loading = new Map<SoundName, Promise<AudioBuffer | null>>();

/** Charge et décode un son (une seule fois). Les erreurs réseau/décodage ne sont pas applicatives. */
function load(ctx: AudioContext, name: SoundName): Promise<AudioBuffer | null> {
  const cached = buffers.get(name);
  if (cached) return Promise.resolve(cached);
  let pending = loading.get(name);
  if (!pending) {
    pending = fetch(URLS[name])
      .then((response) => response.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => {
        buffers.set(name, buffer);
        return buffer;
      })
      .catch(() => null);
    loading.set(name, pending);
  }
  return pending;
}

/**
 * Sons via Web Audio : chaque lecture est indépendante, donc plusieurs sons peuvent se
 * chevaucher (contrairement à un `<audio>` unique qu'on relance). Rien n'est chargé avant
 * la première lecture.
 */
export function useSound() {
  const settings = useSettingsStore();

  function start(name: SoundName, delay: number) {
    const ctx = getAudioContext();
    if (!ctx) return;
    void ctx.resume().catch(() => {});
    const buffer = buffers.get(name);
    if (!buffer) {
      void load(ctx, name); // premier appel : le son sera prêt pour les suivants
      return;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(ctx.currentTime + delay);
  }

  function play(name: SoundName) {
    if (!settings.sound) return;
    start(name, 0);
  }

  /** Joue `count` fois le son, en cascade : on entend chaque case posée ou retirée. */
  function playBurst(name: SoundName, count: number) {
    if (!settings.sound) return;
    const total = Math.min(count, BURST_MAX);
    for (let i = 0; i < total; i++) start(name, i * BURST_STEP_S);
  }

  return { play, playBurst };
}
