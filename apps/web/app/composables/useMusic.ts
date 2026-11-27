import { useEventListener } from '@vueuse/core';
import { pickTrack, type MusicFamily, type MusicTrack } from '@/domain/music';
import { getMixer } from '@/utils/audioMixer';
import { getAudioContext } from '@/utils/audioContext';
import awakeningUrl from '@/assets/audio/music/awakening.mp3';
import awakeningBUrl from '@/assets/audio/music/awakening-b.mp3';
import awakeningCUrl from '@/assets/audio/music/awakening-c.mp3';
import whisperUrl from '@/assets/audio/music/whisper.mp3';
import whisperBUrl from '@/assets/audio/music/whisper-b.mp3';
import whisperCUrl from '@/assets/audio/music/whisper-c.mp3';
import eyesUrl from '@/assets/audio/music/eyes.mp3';
import eyesBUrl from '@/assets/audio/music/eyes-b.mp3';
import packUrl from '@/assets/audio/music/pack.mp3';
import packBUrl from '@/assets/audio/music/pack-b.mp3';
import thresholdUrl from '@/assets/audio/music/threshold.mp3';
import thresholdBUrl from '@/assets/audio/music/threshold-b.mp3';
import biteUrl from '@/assets/audio/music/bite.mp3';
import biteBUrl from '@/assets/audio/music/bite-b.mp3';
import demonUrl from '@/assets/audio/music/demon.mp3';
import demonBUrl from '@/assets/audio/music/demon-b.mp3';
import mapAUrl from '@/assets/audio/music/map-a.mp3';
import mapBUrl from '@/assets/audio/music/map-b.mp3';
import mapCUrl from '@/assets/audio/music/map-c.mp3';

const URLS: Record<MusicTrack, string> = {
  awakening: awakeningUrl,
  'awakening-b': awakeningBUrl,
  'awakening-c': awakeningCUrl,
  whisper: whisperUrl,
  'whisper-b': whisperBUrl,
  'whisper-c': whisperCUrl,
  eyes: eyesUrl,
  'eyes-b': eyesBUrl,
  pack: packUrl,
  'pack-b': packBUrl,
  threshold: thresholdUrl,
  'threshold-b': thresholdBUrl,
  bite: biteUrl,
  'bite-b': biteBUrl,
  demon: demonUrl,
  'demon-b': demonBUrl,
  'map-a': mapAUrl,
  'map-b': mapBUrl,
  'map-c': mapCUrl,
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
/** Dernière page à avoir demandé une piste : seule elle peut l'arrêter (une transition de page monte la nouvelle avant de démonter l'ancienne). */
let owner: symbol | null = null;
/** Dernière piste jouée de chaque famille : on n'enchaîne pas deux fois la même quand il y a le choix. */
const lastOfFamily: Partial<Record<MusicFamily, MusicTrack>> = {};
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
  const me = Symbol('music');
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
    owner = me;
    void sync();
  }
  /** Joue une piste de la famille (chapitre, carte) : celle en cours si elle en fait partie, sinon une variante au hasard. */
  function setFamily(family: MusicFamily) {
    const track = pickTrack(family, wanted, lastOfFamily[family]);
    lastOfFamily[family] = track;
    setTrack(track);
  }
  /** Quitte le jeu : fondu puis silence. */
  function stop() {
    if (owner === me) setTrack(null);
  }

  return { setTrack, setFamily, stop };
}
