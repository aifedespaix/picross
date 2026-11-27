import { watch, type WatchStopHandle } from 'vue';
import pureUrl from '@/assets/audio/ambience/pure.mp3';
import uneasyUrl from '@/assets/audio/ambience/uneasy.mp3';
import darkUrl from '@/assets/audio/ambience/dark.mp3';
import { ambienceLevels } from '@/domain/ambience';
import { useCorruptionStore } from '@/stores/corruption';
import { getAudioContext } from '@/utils/audioContext';
import { getMixer } from '@/utils/audioMixer';

const URLS = { pure: pureUrl, uneasy: uneasyUrl, dark: darkUrl } as const;
type Layer = keyof typeof URLS;
const LAYERS = Object.keys(URLS) as Layer[];
/** Les niveaux suivent la corruption en douceur : une erreur ne change pas l'ambiance d'un coup. */
const GLIDE_S = 2.5;

const buffers = new Map<Layer, AudioBuffer>();
let running: { gains: Record<Layer, GainNode>; sources: AudioBufferSourceNode[] } | null = null;
let starting = false;

async function fetchLayer(ctx: AudioContext, layer: Layer): Promise<AudioBuffer | null> {
  const cached = buffers.get(layer);
  if (cached) return cached;
  try {
    const data = await (await fetch(URLS[layer])).arrayBuffer();
    const buffer = await ctx.decodeAudioData(data);
    buffers.set(layer, buffer);
    return buffer;
  } catch {
    return null;
  }
}

/**
 * Couche d'ambiance : trois textures sans mélodie (air, grondement, souffles) jouées ensemble en boucle,
 * dont les niveaux glissent avec la corruption. Pur au début ; à la fin, le démon respire sous la musique.
 * Branchée sur le bus « ambiance » (curseur dédié, creusé par les effets).
 */
export function useAmbience() {
  const corruption = useCorruptionStore();
  let stopWatch: WatchStopHandle | null = null;

  function apply(level: number, immediate = false) {
    const ctx = getAudioContext();
    if (!running || !ctx) return;
    const levels = ambienceLevels(level);
    for (const layer of LAYERS) {
      const param = running.gains[layer].gain;
      if (immediate) param.setValueAtTime(levels[layer], ctx.currentTime);
      else param.setTargetAtTime(levels[layer], ctx.currentTime, GLIDE_S / 3);
    }
  }

  async function start() {
    const ctx = getAudioContext();
    const mixer = getMixer();
    if (!ctx || !mixer || running || starting) return;
    starting = true;
    const loaded = await Promise.all(LAYERS.map((layer) => fetchLayer(ctx, layer)));
    starting = false;
    if (running || loaded.some((buffer) => !buffer)) return;
    const gains = {} as Record<Layer, GainNode>;
    const sources: AudioBufferSourceNode[] = [];
    LAYERS.forEach((layer, i) => {
      const source = ctx.createBufferSource();
      source.buffer = loaded[i]!;
      source.loop = true;
      gains[layer] = ctx.createGain();
      gains[layer].gain.value = 0;
      source.connect(gains[layer]).connect(mixer.input.ambience);
      // Départs décalés : les trois textures ne retombent jamais sur le même point de leur boucle.
      source.start(0, (i * 13.7) % loaded[i]!.duration);
      sources.push(source);
    });
    running = { gains, sources };
    apply(corruption.level, true);
    stopWatch = watch(
      () => corruption.level,
      (level) => apply(level),
    );
    void ctx.resume().catch(() => {});
  }

  function stop() {
    stopWatch?.();
    stopWatch = null;
    const ctx = getAudioContext();
    const current = running;
    running = null;
    if (!current || !ctx) return;
    const now = ctx.currentTime;
    for (const layer of LAYERS) {
      current.gains[layer].gain.cancelScheduledValues(now);
      current.gains[layer].gain.setTargetAtTime(0, now, 0.4);
    }
    window.setTimeout(() => current.sources.forEach((source) => source.stop()), 2500);
  }

  return { start, stop };
}
