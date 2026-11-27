let context: AudioContext | null = null;

/** Contexte Web Audio unique, partagé par les effets (`useSound`) et la musique (`useMusic`). */
export function getAudioContext(): AudioContext | null {
  if (context) return context;
  if (typeof AudioContext === 'undefined') return null;
  context = new AudioContext();
  return context;
}
