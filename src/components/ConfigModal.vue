import { DeviceType } from '@/store/modules/App';
import { SquareState } from '@/components/Picross/Square/SquareState';
<template>
  <div class="modal flex items-center justify-center cursor-default">
    <div class="modal-overlay opacity-75 bg-black z-0"></div>

    <div :class="[theme.modal]" class="z-10 p-4 shadow">
      <div class="flex justify-between items-center select-none">
        <h3 class="text-xl font-bold">Configuration</h3>

        <button @click="close"
                class="close w-8 h-8 rounded-full flex justify-center items-center hover:text-red-700 hover:shadow">
          <TimesIcon class="fill-current"/>
        </button>
      </div>

      <div class="flex flex-col p-4">
        <div class="text-lg">Thème</div>
        <div class="flex">
          <button @click="setLightTheme" class="modal-button text-black bg-white">
            Clair
            <CheckIcon class="ml-2 fill-current" v-if="isLigth"/>
          </button>
          <button @click="setDarkTheme" class="modal-button text-white ml-2 bg-black">
            Sombre
            <CheckIcon class="ml-2 fill-current" v-if="isDark"/>
          </button>
        </div>

        <div class="text-lg mt-4" v-if="!isMobile">Configuration</div>

        <div v-if="!isMobile" class="flex items-center">
          <input id="rightClickChange" type="checkbox" v-model="rightClickChange">
          <label class="select-none mx-2 w-" for="rightClickChange">
            <template v-if="rightClickChange">Change de mode de saisie au clic droit</template>
            <template v-else>Place un ou plusieurs marqueurs au clic droit</template>
          </label>
        </div>

      </div>

      <div class="flex  mt-4 justify-between">
        <button @click="reset" class="modal-button modal-button-revert mr-4">
          Annuler
          <BackIcon class="ml-2 fill-current"/>
        </button>
        <button @click="save" class="modal-button modal-button-save ml-4">
          Enregistrer
          <SaveIcon class="ml-2 fill-current"/>
        </button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import TimesIcon from '@/components/icons/Times.vue';
import ConfigIcon from '@/components/icons/Config.vue';
import BackIcon from '@/components/icons/Back.vue';
import SaveIcon from '@/components/icons/Save.vue';
import CheckIcon from '@/components/icons/Check.vue';
import {ThemeEnum} from '@/components/Theme/theme.enum';
import {gameSettingsModule} from '@/store/modules/GameSettings';
import {settingsModule} from '@/store/modules/Settings';
import {gamePlayModule} from '@/store/modules/GamePlay';
import {SquareState} from '@/components/Picross/Square/SquareState';
import {appModule, DeviceType} from '@/store/modules/App';

@Component({
  components: {TimesIcon, ConfigIcon, BackIcon, SaveIcon, CheckIcon},
})
export default class ConfigModal extends Vue {

  private last_Theme!: ThemeEnum;
  private last_isToggleStateButtonActive!: boolean;

  get theme() {
    return settingsModule.theme;
  }

  get isLigth() {
    return this.theme.actualTheme === ThemeEnum.LIGHT;
  }

  get isDark() {
    return this.theme.actualTheme === ThemeEnum.DARK;
  }

  get isMobile() {
    return appModule.device === DeviceType.Mobile;
  }

  get rightClickChange() {
    return gameSettingsModule.isToggleStateButtonActive.value;
  }

  set rightClickChange(value: boolean) {
    if (!value && gamePlayModule.actualState !== SquareState.Value) {
      gamePlayModule.switchStateMode();
    }
    gameSettingsModule.changeToggleStateButtonActive(value);
  }

  private beforeMount() {
    this.last_Theme = this.theme.actualTheme;
    this.last_isToggleStateButtonActive = gameSettingsModule.isToggleStateButtonActive.value;
  }

  private close() {
    this.$emit('close');
  }

  private setLightTheme() {
    settingsModule.changeTheme(ThemeEnum.LIGHT);
  }

  private setDarkTheme() {
    settingsModule.changeTheme(ThemeEnum.DARK);
  }

  private save() {
    this.theme.save();
    gameSettingsModule.isToggleStateButtonActive.save();
    this.close();
  }

  private reset() {
    settingsModule.changeTheme(this.last_Theme);
    this.rightClickChange = this.last_isToggleStateButtonActive;
    this.close();
  }

}
</script>

<style>
  .modal,
  .modal-overlay {
    @apply absolute w-full h-full;
  }

  .close {
    transition: color .25s ease-in-out;
  }

  .modal-button {
    @apply flex justify-center border p-2 w-32;
    transition: all .25s ease-in-out;
  }

  .modal-button-save {
    @apply border-green-700 text-green-700;
  }

  .modal-button-save:hover {
    @apply bg-green-700 text-white;
  }

  .modal-button-revert {
    @apply border-red-700 text-red-700;
  }

  .modal-button-revert:hover {
    @apply bg-red-700 text-white;
  }
</style>
