import { GameMode } from '@/model/Game/GameModel';
<template>
  <div>
    <div>
      {{actualBlocs}} / {{maxBlocs}}
    </div>

    <div class="hints hints-col" ref="colHints">
      <Hints
        :hints-model="hintsModel"
        :key="key"
        class="flex-col"
        v-for="(hintsModel, key) in getColHints"
      />
    </div>

    <div class="hints hints-row" ref="rowHints">
      <Hints
        :hints-model="hintsModel"
        :key="key"
        v-for="(hintsModel, key) in getRowHints"
      />
    </div>

    <GameGrid ref="gameGrid"/>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import GameGrid from '@/components/Picross/GameGrid/GameGrid.vue';
  import {gameModule} from '@/store/modules/Game';
  import Hints from '@/components/Picross/Hints/Hints.vue';
  import {SquareState} from '@/model/Square/SquareState';
  import {GridComp} from '@/model/Game/Grid';
  import {GameMode} from '@/model/Game/GameModel';
  import {GamePlayModel} from '@/model/Game/GamePlay';

  @Component({
    components: {GameGrid, Hints},
  })
  export default class Picross extends Vue {

    get maxBlocs() {
      if (gameModule.gameMode === GameMode.Play) {
        return (gameModule.gameModel as GamePlayModel).solutionGrid.countValue(SquareState.Value);
      } else if (gameModule.gameMode === GameMode.Create) {
        return gameModule.gameModel.gameGrid.countValue(SquareState.Value);
      }
    }

    get actualBlocs() {
      return gameModule.gameModel.gameGrid.countValue(SquareState.Value);
    }

    get getColHints() {
      return gameModule.gameModel.hintsManager.colHints;
    }

    get getRowHints() {
      return gameModule.gameModel.hintsManager.rowHints;
    }

    private timerInterval!: any;
    private duration = 0;

    private hintStyle = [
      'flex',
      'justify-center',
      'items-center',
      'w-4',
      'h-4',
    ];

    public calcGridStyle() {
      const $colHints = this.$refs.colHints as HTMLElement;
      $colHints.style.gridTemplateColumns = gameModule.gameModel.gameGrid.getCssGridStyle(GridComp.Col);

      const $rowHints = this.$refs.rowHints as HTMLElement;
      $rowHints.style.gridTemplateRows = gameModule.gameModel.gameGrid.getCssGridStyle(GridComp.Row);

      const gameGrid = this.$refs.gameGrid as any;
      gameGrid.calcGridStyle();
    }

    private startGame() {
      this.timerInterval = setInterval(() => {
        this.duration += 1;
      }, 100);
    }

    private stopGame() {
      clearTimeout(this.timerInterval);
    }

    private mounted() {
      this.calcGridStyle();
    }

  }
</script>

<style lang="scss">
  @import "@/assets/styles";

  .hints {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }
</style>
