import {
  busGain,
  masterGain,
  BUSES,
  DUCKS,
  type BusName,
  type DuckName,
  type Volumes,
} from '@/domain/mix';
import { getAudioContext } from './audioContext';

export interface Mixer {
  ctx: AudioContext;
  /** Entrée de chaque bus : y brancher les sources. */
  input: Record<BusName, AudioNode>;
  setVolumes(volumes: Volumes): void;
  /** Creuse la musique et l'ambiance un instant (un effet, la victoire…) pour que rien ne se couvre. */
  duck(name: DuckName): void;
}

let mixer: Mixer | null = null;

/**
 * Graphe : source → bus (niveau joueur × trim) → [creux de ducking, musique et ambiance seulement] → général
 * → limiteur doux → sortie. La musique passe en plus par un léger creux à 2,6 kHz, la zone où tombent les
 * effets : ils restent lisibles sans qu'on monte leur volume.
 */
export function getMixer(): Mixer | null {
  if (mixer) return mixer;
  const ctx = getAudioContext();
  if (!ctx) return null;

  const master = ctx.createGain();
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -12;
  limiter.knee.value = 14;
  limiter.ratio.value = 3.5;
  limiter.attack.value = 0.004;
  limiter.release.value = 0.22;
  master.connect(limiter).connect(ctx.destination);

  const gains = {} as Record<BusName, GainNode>;
  const ducks = {} as Record<BusName, GainNode | null>;
  const input = {} as Record<BusName, AudioNode>;
  for (const bus of BUSES) {
    gains[bus] = ctx.createGain();
    ducks[bus] = bus === 'music' || bus === 'ambience' ? ctx.createGain() : null;
    const duckNode = ducks[bus];
    if (duckNode) gains[bus].connect(duckNode).connect(master);
    else gains[bus].connect(master);
    input[bus] = gains[bus];
  }
  const eq = ctx.createBiquadFilter();
  eq.type = 'peaking';
  eq.frequency.value = 2600;
  eq.Q.value = 0.8;
  eq.gain.value = -2.5;
  eq.connect(gains.music);
  input.music = eq;

  let current: Volumes | null = null;
  mixer = {
    ctx,
    input,
    setVolumes(volumes) {
      current = volumes;
      const now = ctx.currentTime;
      // Rampe courte : un curseur qu'on glisse ne crache pas de clics.
      master.gain.setTargetAtTime(masterGain(volumes), now, 0.03);
      for (const bus of BUSES) gains[bus].gain.setTargetAtTime(busGain(volumes, bus), now, 0.03);
    },
    duck(name) {
      if (!current) return;
      const { depth, hold, release } = DUCKS[name];
      const now = ctx.currentTime;
      for (const bus of ['music', 'ambience'] as const) {
        const node = ducks[bus]!.gain;
        // Les creux se cumulent mal : on repart toujours de la valeur courante, jamais plus bas que le plus profond.
        node.cancelScheduledValues(now);
        node.setValueAtTime(node.value, now);
        node.setTargetAtTime(Math.min(node.value, 1 - depth), now, 0.015);
        node.setTargetAtTime(1, now + hold, release / 3);
      }
    },
  };
  return mixer;
}
