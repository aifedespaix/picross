<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { BUSES, matchPreset, type PresetName } from '@/domain/mix';
import { ASSIST_MODES, useSettingsStore, type ThemeChoice } from '@/stores/settings';
import { hasVibration } from '@/utils/haptics';
import BaseDialog from './BaseDialog.vue';
import VolumeRow from './VolumeRow.vue';

defineProps<{ open: boolean }>();
defineEmits<{ close: [] }>();

const { t, locale, locales, setLocale } = useI18n();
const settings = useSettingsStore();
const canVibrate = ref(false);
onMounted(() => {
  canVibrate.value = hasVibration();
});
const shortcuts = [
  ['Ctrl + Z', 'settings.keyUndo'],
  ['Ctrl + Y', 'settings.keyRedo'],
  ['T', 'settings.keyTool'],
  ['← ↑ ↓ →', 'settings.keyMove'],
  ['Espace', 'settings.keyFill'],
  ['X', 'settings.keyCross'],
  ['H', 'settings.keyHint'],
  ['?', 'settings.keyHelp'],
] as const;
const THEMES: ThemeChoice[] = ['system', 'light', 'dark'];

/** Onglets : la fenêtre ne montre qu'un thème à la fois (affichage, jeu, audio, clavier). */
const TABS = ['display', 'game', 'audio', 'keys'] as const;
type Tab = (typeof TABS)[number];
const tab = useState<Tab>('settings-tab', () => 'display');
const tabButtons = ref<HTMLButtonElement[]>([]);
function onTabKey(event: KeyboardEvent) {
  const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key as 'ArrowRight' | 'ArrowLeft'];
  const jump = event.key === 'Home' ? 0 : event.key === 'End' ? TABS.length - 1 : undefined;
  if (!step && jump === undefined) return;
  event.preventDefault();
  const index = jump ?? (TABS.indexOf(tab.value) + step! + TABS.length) % TABS.length;
  tab.value = TABS[index]!;
  nextTick(() => tabButtons.value[index]?.focus());
}

const PRESET_NAMES: PresetName[] = ['normal', 'quiet', 'silent'];
const preset = computed(() => matchPreset(settings.volumes, settings.mutes));
</script>

<template>
  <BaseDialog :open="open" :title="t('settings.title')" @close="$emit('close')">
    <div class="-mt-1">
      <div
        role="tablist"
        :aria-label="t('settings.title')"
        class="mb-4 grid grid-cols-4 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800"
        @keydown="onTabKey"
      >
        <button
          v-for="(name, i) in TABS"
          :id="`settings-tab-${name}`"
          :key="name"
          :ref="(el) => (tabButtons[i] = el as HTMLButtonElement)"
          type="button"
          role="tab"
          data-silent
          :aria-selected="tab === name"
          :aria-controls="`settings-panel-${name}`"
          :tabindex="tab === name ? 0 : -1"
          class="min-h-9 rounded-lg px-1 text-sm font-medium text-slate-600 transition hover:text-ink dark:text-slate-400 dark:hover:text-pearl"
          :class="
            tab === name ? 'bg-white text-ink shadow-xs dark:bg-slate-700 dark:text-pearl' : ''
          "
          @click="tab = name"
        >
          {{ t(`settings.tabs.${name}`) }}
        </button>
      </div>

      <div
        :id="`settings-panel-${tab}`"
        role="tabpanel"
        :aria-labelledby="`settings-tab-${tab}`"
        class="min-h-72 space-y-5"
      >
        <template v-if="tab === 'display'">
          <fieldset>
            <legend class="field-label">{{ t('settings.theme') }}</legend>
            <div class="grid grid-cols-3 gap-2">
              <label
                v-for="choice in THEMES"
                :key="choice"
                class="btn cursor-pointer has-checked:border-ink has-checked:bg-slate-100 has-checked:text-ink has-focus-visible:outline-2 dark:has-checked:border-pearl dark:has-checked:bg-slate-700 dark:has-checked:text-pearl"
              >
                <input
                  v-model="settings.theme"
                  type="radio"
                  name="theme"
                  :value="choice"
                  class="sr-only"
                />
                {{ t(`settings.${choice}`) }}
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend class="field-label">{{ t('settings.language') }}</legend>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="item in locales"
                :key="item.code"
                type="button"
                class="btn"
                :lang="item.code"
                :aria-pressed="item.code === locale"
                :class="
                  item.code === locale
                    ? 'border-ink bg-slate-100 text-ink dark:border-pearl dark:bg-slate-700 dark:text-pearl'
                    : ''
                "
                @click="setLocale(item.code)"
              >
                {{ item.name }}
              </button>
            </div>
          </fieldset>

          <label class="flex cursor-pointer items-center gap-3">
            <input
              v-model="settings.showStats"
              type="checkbox"
              class="size-5 shrink-0 accent-demon"
            />
            <span class="text-sm font-medium">{{ t('settings.stats') }}</span>
          </label>
          <label class="flex cursor-pointer items-start gap-3">
            <input
              v-model="settings.leftHanded"
              type="checkbox"
              class="mt-0.5 size-5 shrink-0 accent-demon"
            />
            <span>
              <span class="block text-sm font-medium">{{ t('settings.leftHanded') }}</span>
              <span class="block text-xs text-slate-500 dark:text-slate-400">{{
                t('settings.leftHandedHint')
              }}</span>
            </span>
          </label>
        </template>

        <template v-else-if="tab === 'game'">
          <fieldset class="grid gap-1.5">
            <legend class="field-label">{{ t('settings.assist') }}</legend>
            <label
              v-for="mode in ASSIST_MODES"
              :key="mode"
              class="flex cursor-pointer items-start gap-3 py-0.5"
            >
              <input
                v-model="settings.assist"
                type="radio"
                name="assist"
                :value="mode"
                class="mt-0.5 size-5 shrink-0 accent-demon"
              />
              <span>
                <span class="block text-sm">{{ t(`settings.assistModes.${mode}`) }}</span>
                <span class="block text-xs text-slate-500 dark:text-slate-400">{{
                  t(`settings.assistHints.${mode}`)
                }}</span>
              </span>
            </label>
          </fieldset>
          <label class="flex cursor-pointer items-start gap-3">
            <input
              v-model="settings.corruption"
              type="checkbox"
              class="mt-0.5 size-5 shrink-0 accent-demon"
            />
            <span>
              <span class="block text-sm font-medium">{{ t('settings.corruption') }}</span>
              <span class="block text-xs text-slate-500 dark:text-slate-400">{{
                t('settings.corruptionHint')
              }}</span>
            </span>
          </label>
          <label v-if="canVibrate" class="flex cursor-pointer items-center gap-3">
            <input
              v-model="settings.haptics"
              type="checkbox"
              class="size-5 shrink-0 accent-demon"
            />
            <span class="text-sm font-medium">{{ t('settings.haptics') }}</span>
          </label>
        </template>

        <template v-else-if="tab === 'audio'">
          <div
            role="group"
            :aria-label="t('settings.presets.label')"
            class="grid grid-cols-3 gap-2"
          >
            <button
              v-for="name in PRESET_NAMES"
              :key="name"
              type="button"
              class="btn"
              :aria-pressed="preset === name"
              :class="
                preset === name
                  ? 'border-ink bg-slate-100 text-ink dark:border-pearl dark:bg-slate-700 dark:text-pearl'
                  : ''
              "
              @click="settings.applyPreset(name)"
            >
              {{ t(`settings.presets.${name}`) }}
            </button>
          </div>
          <div class="grid gap-3">
            <VolumeRow name="master" strong />
            <div class="mx-2 border-t border-slate-200 dark:border-slate-800" />
            <VolumeRow v-for="name in BUSES" :key="name" :name="name" />
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ t('settings.audioHint') }}</p>
        </template>

        <dl
          v-else
          class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2.5 text-sm text-slate-600 dark:text-slate-300"
        >
          <template v-for="[keys, label] in shortcuts" :key="label">
            <dt>
              <kbd
                class="rounded border border-slate-300 px-1.5 py-0.5 text-xs dark:border-slate-600"
                >{{ keys }}</kbd
              >
            </dt>
            <dd>{{ t(label) }}</dd>
          </template>
        </dl>
      </div>
    </div>
  </BaseDialog>
</template>
