import type { BusName, DuckName } from '@/domain/mix';
import { getAudioContext } from '@/utils/audioContext';
import { getMixer } from '@/utils/audioMixer';
import bossUrl from '@/assets/audio/sfx/boss.mp3';
import clearUrl from '@/assets/audio/sfx/clear.mp3';
import closeUrl from '@/assets/audio/sfx/close.mp3';
import crossUrl from '@/assets/audio/sfx/cross.mp3';
import errorUrl from '@/assets/audio/sfx/error.mp3';
import fillUrl from '@/assets/audio/sfx/fill.mp3';
import hintUrl from '@/assets/audio/sfx/hint.mp3';
import lineUrl from '@/assets/audio/sfx/line.mp3';
import openUrl from '@/assets/audio/sfx/open.mp3';
import tapUrl from '@/assets/audio/sfx/tap.mp3';
import undoUrl from '@/assets/audio/sfx/undo.mp3';
import undo2Url from '@/assets/audio/sfx/undo2.mp3';
import win1Url from '@/assets/audio/sfx/win1.mp3';
import win2Url from '@/assets/audio/sfx/win2.mp3';
import win3Url from '@/assets/audio/sfx/win3.mp3';

/**
 * Chaque son : son fichier, son bus (effets ou interface) et le creux qu'il fait dans la musique et
 * l'ambiance. Sons composés en code (`tools/music/s_sfx.py`), accordés sur do pentatonique.
 */
const SOUNDS = {
  fill: { url: fillUrl, bus: 'sfx', duck: 'sfx' },
  cross: { url: crossUrl, bus: 'sfx', duck: 'sfx' },
  clear: { url: clearUrl, bus: 'sfx', duck: 'sfx' },
  undo: { url: undoUrl, bus: 'sfx', duck: 'sfx' },
  undo2: { url: undo2Url, bus: 'sfx', duck: 'sfx' },
  line: { url: lineUrl, bus: 'sfx', duck: 'sfx' },
  error: { url: errorUrl, bus: 'sfx', duck: 'sfx' },
  hint: { url: hintUrl, bus: 'sfx', duck: 'sfx' },
  win1: { url: win1Url, bus: 'sfx', duck: 'win' },
  win2: { url: win2Url, bus: 'sfx', duck: 'win' },
  win3: { url: win3Url, bus: 'sfx', duck: 'win' },
  boss: { url: bossUrl, bus: 'sfx', duck: 'win' },
  tap: { url: tapUrl, bus: 'ui', duck: 'ui' },
  open: { url: openUrl, bus: 'ui', duck: 'ui' },
  close: { url: closeUrl, bus: 'ui', duck: 'ui' },
} as const satisfies Record<string, { url: string; bus: BusName; duck: DuckName }>;

export type SoundName = keyof typeof SOUNDS;

/** Écart entre deux sons d'une même rafale : assez court pour rester fluide, assez long pour les compter. */
const BURST_STEP_S = 0.035;
/** Au-delà, la rafale n'ajoute plus de son (une grille entière ne doit pas devenir un bruit blanc). */
const BURST_MAX = 24;
/** Gamme du « tok » (do pentatonique, en centièmes de ton) : tracer une ligne joue un petit arpège. */
export const FILL_SCALE = [0, 200, 400, 700, 900, 1200, 1400, 1600] as const;
/** Une pause plus longue que ça et l'arpège repart du bas. */
const STREAK_GAP_MS = 900;

/** Degré de l'arpège pour la n-ième note : monte puis redescend, sans jamais sauter (aller-retour). */
export function scaleDegree(index: number, size = FILL_SCALE.length): number {
  const period = (size - 1) * 2;
  const k = ((index % period) + period) % period;
  return k < size ? k : period - k;
}

const buffers = new Map<SoundName, AudioBuffer>();
const loading = new Map<SoundName, Promise<AudioBuffer | null>>();
let streak = 0;
let lastFillAt = 0;

/** Charge et décode un son (une seule fois). Les erreurs réseau/décodage ne sont pas applicatives. */
function load(ctx: AudioContext, name: SoundName): Promise<AudioBuffer | null> {
  const cached = buffers.get(name);
  if (cached) return Promise.resolve(cached);
  let pending = loading.get(name);
  if (!pending) {
    pending = fetch(SOUNDS[name].url)
      .then((response) => response.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => {
        buffers.set(name, buffer);
        return buffer;
      })
      .catch(() => {
        loading.delete(name);
        return null;
      });
    loading.set(name, pending);
  }
  return pending;
}

/** Précharge tous les sons (≈ 270 Ko) : le tout premier geste du joueur doit déjà s'entendre. */
export function preloadSounds() {
  const ctx = getAudioContext();
  if (!ctx) return;
  for (const name of Object.keys(SOUNDS) as SoundName[]) void load(ctx, name);
}

function start(name: SoundName, delay: number, cents = 0, duck = true) {
  const ctx = getAudioContext();
  if (!ctx) return;
  void ctx.resume().catch(() => {});
  const buffer = buffers.get(name);
  if (!buffer) {
    void load(ctx, name); // pas encore décodé : prêt pour le prochain
    return;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  if (cents) source.detune.value = cents;
  const mixer = getMixer();
  source.connect(mixer ? mixer.input[SOUNDS[name].bus] : ctx.destination);
  if (duck) mixer?.duck(SOUNDS[name].duck);
  source.start(ctx.currentTime + delay);
}

/**
 * Sons via Web Audio : chaque lecture est indépendante, donc plusieurs sons peuvent se chevaucher.
 * Le niveau de chaque son dépend de son bus (réglages du joueur) : voir `utils/audioMixer.ts`.
 */
export function useSound() {
  function play(name: SoundName) {
    start(name, 0);
  }

  /** Joue `count` fois le son, en cascade : on entend chaque case posée ou retirée. */
  function playBurst(name: SoundName, count: number) {
    const total = Math.min(count, BURST_MAX);
    for (let i = 0; i < total; i++) start(name, i * BURST_STEP_S, 0, i === 0);
  }

  /** Cases pleines : chaque case monte d'un degré de la gamme, la série retombe après une pause. */
  function fillRun(count: number) {
    const now = Date.now();
    if (now - lastFillAt > STREAK_GAP_MS) streak = 0;
    lastFillAt = now;
    const total = Math.min(count, BURST_MAX);
    for (let i = 0; i < total; i++) {
      start('fill', i * BURST_STEP_S, FILL_SCALE[scaleDegree(streak + i)], i === 0);
    }
    streak += total;
  }

  return { play, playBurst, fillRun };
}
