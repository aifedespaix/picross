<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '@/stores/settings';
import Icon from './Icon.vue';

/** Coupe ou rétablit tout le son d'un clic (les réglages fins restent dans la fenêtre Réglages). */
const { t } = useI18n();
const settings = useSettingsStore();
</script>

<template>
  <button
    type="button"
    data-silent
    :aria-pressed="settings.silent"
    :aria-label="settings.silent ? t('settings.soundOn') : t('settings.soundOff')"
    :title="settings.silent ? t('settings.soundOn') : t('settings.soundOff')"
    @click="settings.toggleAll()"
  >
    <Icon :name="settings.silent ? 'volumeOff' : 'volume'" />
  </button>
</template>
