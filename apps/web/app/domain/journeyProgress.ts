import { betterResult, type LevelResult, type Progress, type Stars } from './journey';

const KEY = 'picross:journey';

function storage(): Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null; // accès refusé (navigation privée, cookies bloqués…)
  }
}

function isResult(value: unknown): value is LevelResult {
  if (!value || typeof value !== 'object') return false;
  const { stars, time } = value as LevelResult;
  return (stars === 1 || stars === 2 || stars === 3) && Number.isFinite(time) && time >= 0;
}

export function loadProgress(): Progress {
  try {
    const parsed: unknown = JSON.parse(storage()?.getItem(KEY) ?? '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter(([, value]) => isResult(value)));
  } catch {
    return {};
  }
}

function write(progress: Progress) {
  try {
    storage()?.setItem(KEY, JSON.stringify(progress));
  } catch {
    // quota dépassé ou stockage indisponible : la progression reste en mémoire pour la session
  }
}

/** Enregistre un résultat (en gardant le meilleur) et renvoie la nouvelle progression. */
export function recordResult(slug: string, stars: Stars, time: number): Progress {
  const progress = loadProgress();
  progress[slug] = betterResult(progress[slug], { stars, time });
  write(progress);
  return progress;
}

export function clearProgress() {
  try {
    storage()?.removeItem(KEY);
  } catch {
    // voir `write`
  }
}
