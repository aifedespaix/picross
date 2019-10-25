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
import {Component, Vue, Watch} from 'vue-property-decorator';
import {gameModule} from '@/store/modules/Game';
import Square from '@/components/Picross/Square/Square.vue';
import {settingsModule} from '@/store/modules/Settings';
import {GridComp} from '@/model/Game/Grid';

@Component({
  components: {Square},
})
export default class GameGrid extends Vue {
  public mounted() {
    this.calcGridStyle();
  }

  get states() {
    return gameModule.gameModel.gameGrid.objects;
  }

  get theme() {
    return settingsModule.theme;
  }

  get cols() {
    return 0;
  }

  get rows() {
    return 0;
  }

  @Watch('cols')
  @Watch('rows')
  private calcGridStyle() {
    const $gameGrid = this.$refs.gameGrid as HTMLElement;
    $gameGrid.style.gridTemplateColumns = gameModule.gameModel.gameGrid.getCssGridStyle(GridComp.Col);
    $gameGrid.style.gridTemplateRows = gameModule.gameModel.gameGrid.getCssGridStyle(GridComp.Row);
  }

  private pointerleave() {
    gameModule.gameModel.stopPlacing();
  }

}
</script>

<style>
  .gameGrid {
    @apply bg-black select-none self-center h-full;
    display: grid;
  }
</style>
