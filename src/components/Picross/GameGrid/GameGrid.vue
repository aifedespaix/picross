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
import {gamePlayModule} from '@/store/modules/GamePlay';
import Square from '@/components/Picross/Square/Square.vue';
import {settingsModule} from '@/store/modules/Settings';
import {GridComp} from '@/model/Game/Grid';

@Component({
  components: {Square},
})
export default class GameGrid extends Vue {
  public mounted() {
    this.calcGrid();
  }

  get states() {
    return gamePlayModule.gameModel.gameGrid.objects;
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
    const cols = 0;
    const rows = 0;
    $gameGrid.style.gridTemplateColumns = gamePlayModule.gameModel.gameGrid.getCssGridStyle(GridComp.Col);
    $gameGrid.style.gridTemplateRows = gamePlayModule.gameModel.gameGrid.getCssGridStyle(GridComp.Row);
  }

  private pointerleave() {
    gamePlayModule.gameModel.stopPlacing();
  }

}
</script>

<style>
  .gameGrid {
    @apply bg-black select-none self-center h-full;
    display: grid;
  }
</style>
