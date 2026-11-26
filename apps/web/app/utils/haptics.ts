/** Retour haptique (mobiles qui le permettent) ; sans effet ailleurs. */
export const hasVibration = () => typeof navigator !== 'undefined' && 'vibrate' in navigator;

export function vibrate(pattern: number | number[]) {
  if (hasVibration()) navigator.vibrate(pattern);
}
