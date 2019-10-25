<template>

  <div @contextmenu="rightClick($event)" class="picross-container">

    <div class="picross-infos">
      <h1 class="text-center text-2xl w-full">Picross</h1>
      <div class="text-center text-xl w-full">Difficulté : Facile</div>
    </div>

    <Picross class="picross" v-if="ready"/>
    <Loading class="picross" v-else></Loading>

    <div class="flex justify-around items-center w-full picross-actions" v-if="!isWin">
      <RevertButton class="mobile"/>
      <ToggleButton v-if="isToggleButtonActive"/>
      <RevertButton/>
    </div>

  </div>
</template>

<script lang="ts">

  import {Component, Vue} from 'vue-property-decorator';

  import ToggleButton from '@/components/ToggleButton.vue';
  import BackIcon from '@/components/icons/Back.vue';
  import RevertButton from '@/components/Picross/RevertButton.vue';
  import Loading from '@/components/Loading.vue';
  import Picross from '@/components/Picross/Picross.vue';

  import {GamePlayModel} from '@/model/Game/GamePlay';
  import {GameMode} from '@/model/Game/GameModel';

  import {settingsModule} from '@/store/modules/Settings';
  import {gameModule} from '@/store/modules/Game';
  import {gameSettingsModule} from '@/store/modules/GameSettings';

  @Component({
    components: {
      Picross,
      ToggleButton,
      BackIcon,
      Loading,
      RevertButton,
    },
  })
  export default class GamePlay extends Vue {

    private beforeMount() {
      gameModule.changeGameMode(GameMode.Play);
    }

    private async mounted() {
      await (gameModule.gameModel as GamePlayModel).newGame();
    }

    private get isToggleButtonActive() {
      return gameSettingsModule.isToggleStateButtonActive.value;
    }

    private get theme() {
      return settingsModule.theme;
    }

    private get isWin() {
      return (gameModule.gameModel as GamePlayModel).win;
    }

    private get ready() {
      return gameModule.gameModel.loaded;
    }

    private rightClick(event: MouseEvent) {
      if (!gameSettingsModule.isToggleStateButtonActive.value) {
        this.switchStateMode();
      }
    }

    private switchStateMode() {
      (gameModule.gameModel as GamePlayModel).switchActualState();
    }

  }
</script>

<style>
  .picross-container {
    @apply select-none;
    display: grid;
    grid-template-columns: minmax(12rem, 1fr) 1fr;
    grid-template-rows: auto auto;
  }

  .picross-infos {
    @apply flex flex-col items-center p-4 w-full;
    align-self: center;
  }

  @media screen and (max-aspect-ratio: 1/1) {
    .picross-container {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto 1fr;
    }
  }

  .picross-win {
    animation: winAnim 3s ease-in;
  }

  .win-message {
    @apply absolute w-full h-full flex justify-center items-center text-white elegantshadow;
    animation: .2s ease-in-out;
    /*font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;*/
    font-size: 6rem;
    text-align: center;
    text-transform: uppercase;
    text-rendering: optimizeLegibility;
    opacity: .8;
  }

  .elegantshadow {
    color: #000;
    background-color: #fafafa;
    letter-spacing: .15em;
    text-shadow: 1px -1px 0 #767676,
    -1px 2px 1px #737272,
    -2px 4px 1px #767474,
    -3px 6px 1px #787777,
    -4px 8px 1px #7b7a7a,
    -5px 10px 1px #7f7d7d,
    -6px 12px 1px #828181,
    -7px 14px 1px #868585,
    -8px 16px 1px #8b8a89,
    -9px 18px 1px #8f8e8d,
    -10px 20px 1px #949392,
    -11px 22px 1px #999897,
    -12px 24px 1px #9e9c9c,
    -13px 26px 1px #a3a1a1,
    -14px 28px 1px #a8a6a6,
    -15px 30px 1px #adabab,
    -16px 32px 1px #b2b1b0,
    -17px 34px 1px #b7b6b5,
    -18px 36px 1px #bcbbba,
    -19px 38px 1px #c1bfbf,
    -20px 40px 1px #c6c4c4,
    -21px 42px 1px #cbc9c8,
    -22px 44px 1px #cfcdcd,
    -23px 46px 1px #d4d2d1,
    -24px 48px 1px #d8d6d5,
    -25px 50px 1px #dbdad9,
    -26px 52px 1px #dfdddc,
    -27px 54px 1px #e2e0df,
    -28px 56px 1px #e4e3e2;
  }

  @keyframes winAnim {
    from {
      display: grid;
    }
    to {
      display: none;
    }
  }

  @media screen and (min-aspect-ratio: 1/1) {
    .picross-actions {
      @apply flex-col;
    }
  }

</style>
