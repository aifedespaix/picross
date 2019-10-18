<template>
  <div class="picross">
    <div>
     {{actualBlocs}} / {{maxBlocs}}
    </div>

    <div class="hints hints-col" ref="colHints">
      <Hints
        v-for="(hintsModel, key) in getColHints"
        :hints-model="hintsModel"
        class="flex-col"
        :key="key"
      />
    </div>

    <div class="hints hints-row" ref="rowHints">
      <Hints v-for="(hintsModel, key) in getRowHints"
             :hints-model="hintsModel"
             :key="key"
      />
    </div>

    <GameGrid />
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {SquarePosition} from '@/components/Picross/Square/SquarePosition';
  import GameGrid from '@/components/Picross/GameGrid/GameGrid.vue';
  import {gamePlayModule} from '@/store/modules/GamePlay';
  import Hints from '@/components/Picross/Hints/Hints.vue';

  @Component({
    components: {GameGrid, Hints},
  })
  export default class Picross extends Vue {

    private timerInterval!: any;
    private duration = 0;

    private hintStyle = [
      'flex',
      'justify-center',
      'items-center',
      'w-4',
      'h-4',
    ];

    get maxBlocs() {
      return gamePlayModule.solutionGrid.squaresValued;
    }

    get actualBlocs() {
      return gamePlayModule.playingGrid.squaresValued;
    }

    get getColHints() {
      return gamePlayModule.playingGrid.colHints;
    }

    get getRowHints() {
      return gamePlayModule.playingGrid.rowHints;
    }

    private startGame() {
      this.timerInterval = setInterval(() => {
        this.duration += 1;
      }, 100);
    }

    private stopGame() {
      clearTimeout(this.timerInterval);
    }

    private async mounted() {
      const $colHints = this.$refs.colHints as HTMLElement;
      $colHints.style.gridTemplateColumns = `repeat(${gamePlayModule.playingGrid.cols}, 1fr)`;

      const $rowHints = this.$refs.rowHints as HTMLElement;
      $rowHints.style.gridTemplateRows = `repeat(${gamePlayModule.playingGrid.rows}, 1fr)`;
    }


  }
</script>

<style lang="scss">
  .picross {
    touch-action: none;
    justify-self: center;
    align-self: center;

    width: 100vh;
    max-width: calc(100vh - 6rem);

    height: 100vh;
    max-height: calc(100vh - 6rem);

    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-row: span 2;

    @media screen and (max-aspect-ratio: 1/1) {
        grid-row: span 1;
        width: 100vw;
        height: auto;
        max-width: initial;
        max-height: initial;
    }
  }

  .hints {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }
</style>
