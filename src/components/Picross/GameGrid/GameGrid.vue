<template>
  <div @pointerleave="pointerleave" class="gameGrid" :class="theme.grid" ref="gameGrid">
    <template v-for="(rowStates, row) of states">
      <Square :key="`${col}_${row}`"
              :position="{row, col}"
              :state="state"
              class="square"
              v-for="(state, col) of rowStates"
      />
    </template>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {gamePlayModule} from '@/store/modules/GamePlay';
  import Square from '@/components/Picross/Square/Square.vue';
  import {settingsModule} from '@/store/modules/Settings';

  @Component({
    components: {Square},
  })
  export default class GameGrid extends Vue {
    get states() {
      return gamePlayModule.playingGrid.states;
    }
    get theme() {
      return settingsModule.theme;
    }

    private mounted() {
      const $gameGrid = this.$refs.gameGrid as HTMLElement;
      const cols = gamePlayModule.playingGrid.cols;
      const rows = gamePlayModule.playingGrid.rows;

      $gameGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      $gameGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    }

    private pointerleave() {
      gamePlayModule.stopPlacing();
    }

  }
</script>

<style>
  .gameGrid {
    @apply bg-black select-none self-center h-full;
    display: grid;
  }
</style>
