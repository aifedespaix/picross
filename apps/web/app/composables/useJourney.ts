import { STARTER_PUZZLES } from '@picross/shared';
import {
  buildJourney,
  currentStep,
  stepViews,
  totals,
  type Chapter,
  type Progress,
  type Stars,
} from '@/domain/journey';
import { clearProgress, loadProgress, recordResult } from '@/domain/journeyProgress';

let chapters: Chapter[] | null = null;
/** Le parcours est calculé une seule fois (le calcul de difficulté parcourt les 100+ grilles). */
export const getChapters = (): Chapter[] => (chapters ??= buildJourney(STARTER_PUZZLES));

/**
 * Parcours et progression du joueur. La progression vit dans le navigateur (localStorage) : elle
 * n'est lue qu'une fois la page montée (`ready`), pour que le HTML serveur et le premier rendu
 * client restent identiques.
 */
export function useJourney() {
  const progress = useState<Progress>('journey-progress', () => ({}));
  const ready = useState('journey-ready', () => false);

  const views = computed(() => stepViews(getChapters(), progress.value));
  const current = computed(() => currentStep(views.value));
  const summary = computed(() => totals(getChapters(), progress.value));

  function load() {
    progress.value = loadProgress();
    ready.value = true;
  }
  function complete(slug: string, stars: Stars, time: number) {
    progress.value = recordResult(slug, stars, time);
  }
  function reset() {
    clearProgress();
    progress.value = {};
  }

  return {
    chapters: getChapters(),
    progress,
    ready,
    views,
    current,
    summary,
    load,
    complete,
    reset,
  };
}
