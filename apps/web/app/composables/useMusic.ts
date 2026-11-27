import { useEventListener } from '@vueuse/core';
import type { MusicTrack } from '@/domain/music';
import { getMixer } from '@/utils/audioMixer';
import { getAudioContext } from '@/utils/audioContext';
import awakeningUrl from '@/assets/audio/music/awakening.mp3';
import biteUrl from '@/assets/audio/music/bite.mp3';
import demonUrl from '@/assets/audio/music/demon.mp3';
import eyesUrl from '@/assets/audio/music/eyes.mp3';
import packUrl from '@/assets/audio/music/pack.mp3';
import thresholdUrl from '@/assets/audio/music/threshold.mp3';
import whisperUrl from '@/assets/audio/music/whisper.mp3';

const URLS: Record<MusicTrack, string> = {
  awakening: awakeningUrl,
  whisper: whisperUrl,
  eyes: eyesUrl,
  pack: packUrl,
  threshold: thresholdUrl,
  bite: biteUrl,
  demon: demonUrl,
};

const FADE_S = 1.8;

interface Playing {
  track: MusicTrack;
  source: AudioBufferSourceNode;
  gain: GainNode;
}

const buffers = new Map<MusicTrack, AudioBuffer>();
const loading = new Map<MusicTrack, Promise<AudioBuffer | null>>();
let playing: Playing | null = null;
/** Piste demandée par la page (la musique peut être coupée sans que la demande disparaisse). */
let wanted: MusicTrack | null = null;
let unlockArmed = false;

function load(ctx: AudioContext, track: MusicTrack): Promise<AudioBuffer | null> {
  const cached = buffers.get(track);
  if (cached) return Promise.resolve(cached);
  let pending = loading.get(track);
  if (!pending) {
    pending = fetch(URLS[track])
      .then((response) => response.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => {
        buffers.set(track, buffer);
        return buffer;
      })
      .catch(() => {
        loading.delete(track); // on pourra réessayer à la prochaine demande
        return null;
      });
    loading.set(track, pending);
  }
  return pending;
}

function fadeOut(item: Playing, ctx: AudioContext, seconds = FADE_S) {
  const now = ctx.currentTime;
  item.gain.gain.cancelScheduledValues(now);
  item.gain.gain.setValueAtTime(item.gain.gain.value, now);
  item.gain.gain.linearRampToValueAtTime(0, now + seconds);
  item.source.stop(now + seconds + 0.05);
  item.source.onended = () => item.gain.disconnect();
}

/** Les navigateurs interdisent le son avant un premier geste : on le reprend dès qu'il arrive. */
function armUnlock(ctx: AudioContext) {
  if (unlockArmed || ctx.state === 'running') return;
  unlockArmed = true;
  const unlock = () => {
    unlockArmed = false;
    void ctx.resume().catch(() => {});
  };
  window.addEventListener('pointerdown', unlock, { once: true, capture: true });
  window.addEventListener('keydown', unlock, { once: true, capture: true });
}

async function sync() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const target = wanted;
  if (playing && playing.track === target) return;
  if (playing) {
    fadeOut(playing, ctx);
    playing = null;
  }
  if (!target) return;
  armUnlock(ctx);
  const buffer = await load(ctx, target);
  // La demande a pu changer pendant le chargement.
  if (!buffer || wanted !== target || playing) return;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(1, ctx.currentTime + FADE_S);
  // Le niveau final dépend du bus « musique » (réglage du joueur, ducking, filtre) : voir utils/audioMixer.ts.
  source.connect(gain).connect(getMixer()?.input.music ?? ctx.destination);
  source.start();
  playing = { track: target, source, gain };
  void ctx.resume().catch(() => {});
}

/**
 * Musique de fond en boucle (Web Audio, comme `useSound`). Une seule piste à la fois, enchaînement en
 * fondu. Rien n'est téléchargé tant qu'aucune piste n'est demandée, et seule la piste en cours est chargée.
 */
export function useMusic() {
  if (import.meta.client) {
    // Onglet masqué : silence (et le contexte se repose) ; au retour, la musique reprend.
    useEventListener(document, 'visibilitychange', () => {
      const ctx = getAudioContext();
      if (!ctx) return;
      void (document.hidden ? ctx.suspend() : ctx.resume()).catch(() => {});
    });
  }

  /** Demande une piste (ou `null` pour le silence) ; la même piste deux fois de suite ne redémarre pas. */
  function setTrack(track: MusicTrack | null) {
    wanted = track;
    void sync();
  }
  /** Quitte le jeu : fondu puis silence. */
  function stop() {
    setTrack(null);
  }

  return { setTrack, stop };
}
