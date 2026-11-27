import { watch } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { getMixer } from '@/utils/audioMixer';

/** Applique les volumes du joueur au mixeur, dès le démarrage puis à chaque changement de curseur. */
export default defineNuxtPlugin(() => {
  const settings = useSettingsStore();
  watch(
    () => settings.volumes,
    (volumes) => getMixer()?.setVolumes(volumes),
    { immediate: true },
  );
});
