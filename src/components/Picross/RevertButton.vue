<template>
  <button :class="theme.second" :disabled="isRevertable"
          @click="undo()" class="btn btn-blue rounded-full h-16 w-16 flex items-center justify-center">
    <BackIcon class="fill-current"/>
  </button>
</template>

<script lang="ts">

  import {Component, Vue} from 'vue-property-decorator';
  import {gamePlayModule} from '@/store/modules/GamePlay';
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
      return gamePlayModule.isRevertable;
    }

    private get theme() {
      return settingsModule.theme;
    }

    private undo() {
      gamePlayModule.undo();
    }
  }
</script>
