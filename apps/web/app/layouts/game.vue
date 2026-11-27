<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import logoUrl from '@/assets/picross-icon.svg';
import Icon from '@/components/Icon.vue';
import SettingsDialog from '@/components/SettingsDialog.vue';
import SoundToggle from '@/components/SoundToggle.vue';

/** Mise en page de jeu : plein écran, sans en-tête, pied de page ni barre d'onglets. */
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
/** En parcours, le logo ramène à la carte plutôt qu'à l'accueil. */
const home = computed(() => localePath(route.query.parcours === '1' ? 'journey' : 'index'));
/** Partagé avec la page (touche « ? »). */
const settingsOpen = useState('settings-open', () => false);
const corruption = useCorruptionStore();
</script>

<template>
  <div
    class="relative flex h-dvh flex-col overflow-hidden"
    :style="{ '--corruption': corruption.level }"
  >
    <div class="demon-veil" aria-hidden="true" />
    <main id="main" class="min-h-0 flex-1"><slot /></main>

    <!-- Seuls accès hors du jeu : discrets, dans les coins. -->
    <NuxtLink
      :to="home"
      class="absolute top-2 left-2 z-20 grid size-9 place-items-center rounded-xl opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100"
      :aria-label="t('app.name')"
    >
      <img :src="logoUrl" alt="" class="size-6" width="24" height="24" />
    </NuxtLink>
    <SoundToggle
      class="absolute top-2 right-12 z-20 grid size-9 place-items-center rounded-xl text-slate-500 opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 dark:text-slate-400"
    />
    <button
      type="button"
      class="absolute top-2 right-2 z-20 grid size-9 place-items-center rounded-xl text-slate-500 opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 dark:text-slate-400"
      :aria-label="t('nav.settings')"
      @click="settingsOpen = true"
    >
      <Icon name="sliders" />
    </button>
    <SettingsDialog :open="settingsOpen" @close="settingsOpen = false" />
  </div>
</template>
