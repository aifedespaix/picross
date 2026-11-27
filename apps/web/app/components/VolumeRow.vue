<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSound } from '@/composables/useSound';
import type { VolumeName } from '@/domain/mix';
import { useSettingsStore } from '@/stores/settings';
import Icon from './Icon.vue';

const props = defineProps<{ name: VolumeName; strong?: boolean }>();
const { t } = useI18n();
const settings = useSettingsStore();
const { play } = useSound();

const muted = computed(
  () => Boolean(settings.mutes[props.name]) || settings.volumes[props.name] === 0,
);
const label = computed(() => t(`settings.volume.${props.name}`));
const valueText = computed(() =>
  muted.value ? t('settings.volume.muted') : `${settings.volumes[props.name]} %`,
);

/** Au relâchement du curseur : un échantillon du bus réglé (la musique et l'ambiance s'entendent déjà). */
function preview() {
  if (props.name === 'sfx') window.setTimeout(() => play('fill'), 80);
  if (props.name === 'ui' || props.name === 'master') window.setTimeout(() => play('tap'), 80);
}
</script>

<template>
  <div class="grid grid-cols-[2.5rem_1fr_3rem] items-center gap-x-2 gap-y-0.5 sm:gap-x-3">
    <button
      type="button"
      data-silent
      class="btn btn-icon border-transparent bg-transparent shadow-none"
      :aria-pressed="muted"
      :aria-label="t(muted ? 'settings.volume.unmute' : 'settings.volume.mute', { name: label })"
      @click="settings.toggleMute(name)"
    >
      <Icon :name="muted ? 'volumeOff' : 'volume'" />
    </button>
    <label class="grid gap-0.5">
      <span class="text-sm" :class="strong ? 'font-semibold' : 'font-medium'">{{ label }}</span>
      <input
        type="range"
        min="0"
        max="100"
        step="5"
        :value="settings.volumes[name]"
        :aria-valuetext="valueText"
        class="w-full transition-opacity accent-ink dark:accent-pearl"
        :class="muted ? 'opacity-40' : ''"
        @input="settings.setVolume(name, Number(($event.target as HTMLInputElement).value))"
        @change="preview"
      />
    </label>
    <span class="text-right text-xs text-slate-500 tabular-nums dark:text-slate-400">{{
      valueText
    }}</span>
  </div>
</template>
