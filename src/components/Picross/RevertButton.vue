<template>
  <button :class="theme.second" :disabled="!isRevertable"
          @click="undo" class="revertButton">
    <BackIcon class="fill-current"/>
  </button>
</template>

<script lang="ts">

  import {Component, Vue} from 'vue-property-decorator';
  import {gameModule} from '@/store/modules/Game';
  import GameGrid from '@/components/Picross/GameGrid/GameGrid.vue';
  import ToggleButton from '@/components/ToggleButton.vue';
  import BackIcon from '@/components/icons/Back.vue';
  import {settingsModule} from '@/store/modules/Settings';

  @Component({
    components: {
      GameGrid,
      ToggleButton,
      BackIcon,
    },
  })
  export default class RevertButton extends Vue {

    private get isRevertable() {
      return gameModule.gameModel.isRevertable();
    }

    private get theme() {
      return settingsModule.theme;
    }

    private undo() {
      gameModule.gameModel.undo();
    }
  }
</script>

<style lang="scss">
  .revertButton {
    @apply rounded-full h-16 w-16 flex items-center justify-center;

    &:disabled {
      @apply opacity-50 cursor-not-allowed bg-gray-500;
    }
  }
</style>
