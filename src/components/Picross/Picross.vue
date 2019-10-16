<template>
  <div class="picross-container" @contextmenu="rightClick($event)">

    <div class="flex flex-col items-center w-full p-4">
      <h1 class="text-center text-2xl w-full">Picross</h1>
      <div class="text-center text-xl w-full">Difficulté : Facile
<!--        <button @click="exportMap">yo</button>-->
      </div>
    </div>

    <div @touchmove.prevent class="relative picross select-none" ref="picross" :class="gameWin ? 'picross-win' : ''">

      <div v-if="gameWin" class="win-message">
        GG tu as gagné !
      </div>

      <div class="flex flex-col justify-center h-10 text-center">
        <span class="" v-if="gameStarted">{{Math.round(duration / 10)}}</span>
        <span class="" v-if="gameStarted">{{usedBlocs}} / {{maxBlocs}}</span>
      </div>

      <div class="colsInfos infos flex" ref="colHints">
        <Hints :hintsModel="hintsModel" :key="key" class="flex-col" v-for="(hintsModel, key) in columnHints"/>
      </div>

      <div class="rowsInfos infos flex flex-col" ref="rowHints">
        <Hints :hintsModel="hintsModel" :key="key" class="flex-row" v-for="(hintsModel, key) in rowHints"/>
      </div>

      <div @pointerleave="stopPlacing"
           class="gameGrid w-full h-full" ref="gameGrid">
        <template v-for="(gameRow, row) in gameGrid.states">
          <Square :data-col="col" :data-row="row" :id="gameSquareState"
                  :key="`square_${col}-${row}`" :position="{col, row}"
                  :state="gameSquareState"
                  @startPlacing="startPlacing"
                  @stopPlacing="stopPlacing"
                  @traceSquares="traceSquares"
                  v-for="(gameSquareState, col) in gameRow"
          />
        </template>
      </div>

    </div>

    <div v-if="!gameWin" class="flex justify-around items-center w-full">

      <button :class="theme.second" :disabled="!history.length"
              @click="undo()" class="btn btn-blue rounded-full h-16 w-16 flex items-center justify-center">
        <BackIcon class="fill-current"/>
      </button>

      <ToggleButton v-if="gameConfig.rightClickChange"/>

      <button :class="theme.second" :disabled="!history.length"
              @click="undo()" class="btn btn-blue rounded-full h-16 w-16 flex items-center justify-center">
        <BackIcon class="fill-current"/>
      </button>

    </div>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Square from '@/components/Picross/Square/Square.vue';
  import Hints from '@/components/Picross/Hints/Hints.vue';
  import HintsModel from '@/components/Picross/Hints/Hints.model';
  import {SquareState} from '@/components/Picross/Square/SquareState';
  import {SquarePosition} from '@/components/Picross/Square/SquarePosition';
  import _ from 'lodash';
  import {GameGridModel} from '@/components/Picross/GameGrid/GameGrid.model';
  import {MouseDirection} from '@/components/MouseDirection.enum';
  import ToggleButton from '@/components/ToggleButton.vue';
  import BackIcon from '@/components/icons/Back.vue';
  import {Action, Getter} from 'vuex-class';
  import {Theme} from '@/components/Theme/theme';
  import {GameConfig} from '@/components/Picross/GameConfig';
  import {request} from 'graphql-request';
  import testMap from '@/assets/maps/test';

  @Component({
    components: {Square, Hints, ToggleButton, BackIcon},
  })
  export default class Picross extends Vue {
    private gameStarted = false;
    private gameWin = false;

    private timerInterval!: any;
    private duration = 0;

    private maxBlocs = 0;
    private usedBlocs = 0;

    private columnHints = [] as HintsModel[];
    private rowHints = [] as HintsModel[];

    private gameGrid!: GameGridModel;
    private solutionGrid!: GameGridModel;

    private history = [] as GameGridModel[];

    private isMouseDown = false;
    private shouldCalcDirection = false;
    private squareFrom!: SquarePosition;
    private tracingDirection!: MouseDirection;

    private stateToUse!: SquareState;
    private stateToClose!: SquareState;

    @Getter private theme!: Theme;
    @Getter private gameConfig!: GameConfig;
    @Getter private gameState!: SquareState;

    @Action private changeGameState!: any;
    @Action private playWinSound!: any;

    private hintStyle = [
      'flex',
      'justify-center',
      'items-center',
      'w-4',
      'h-4',
    ];

    private async beforeMount() {
      this.gameGrid = new GameGridModel([]);
    }

    private async initSolution() {
      const query = `{
        picross {
          map
        }
      }`;
      await request('https://picross.aifedespaix.com/', query).then((data: any) => {
          if (data.picross) {
            const imported = this.importMap(data.picross.map);
            this.solutionGrid = new GameGridModel(imported);
          } else {
            this.solutionGrid = new GameGridModel(testMap);
          }
        },
        (e) => {
          this.solutionGrid = new GameGridModel(testMap);
        });
    }

    private initGameGrid() {
      this.gameGrid = new GameGridModel([]);
      this.gameGrid.initEmpty(this.solutionGrid.cols, this.solutionGrid.rows);
    }

    private initHints() {
      for (let col = 0; col < this.solutionGrid.cols; col++) {
        this.columnHints.push(new HintsModel(this.solutionGrid.getColumn(col)));
      }
      for (let row = 0; row < this.solutionGrid.rows; row++) {
        this.rowHints.push(new HintsModel(this.solutionGrid.getRow(row)));
      }
    }

    private userLeave() {
      // this.stopPlacing();
    }

    private rightClick(event: MouseEvent) {
      event.preventDefault(); // Remove right click menu
      if (this.gameConfig.rightClickChange) {
        this.changeStateMode();
      }
    }

    private startGame() {
      this.timerInterval = setInterval(() => {
        this.duration += 1;
      }, 100);
      this.gameStarted = true;
    }

    private stopGame() {
      this.gameStarted = false;
      clearTimeout(this.timerInterval);
    }

    private async mounted() {
      await this.initSolution();
      this.initGameGrid();
      this.initHints();
      this.addActualToHistory();
      this.maxBlocs = this.solutionGrid.countSquareState(SquareState.Value);

      const $gameGrid = this.$refs.gameGrid as HTMLElement;
      const cols = this.gameGrid.cols;
      const rows = this.gameGrid.rows;

      $gameGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      $gameGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

      const $colHints = this.$refs.colHints as HTMLElement;
      $colHints.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

      const $rowHints = this.$refs.rowHints as HTMLElement;
      $rowHints.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    }

    private startPlacing(position: SquarePosition, event: PointerEvent) {
      this.isMouseDown = true;
      this.squareFrom = position;
      this.shouldCalcDirection = true;

      this.prepareActiveState(position);
      this.addActualToHistory();

      if (!this.gameStarted) {
        this.startGame();
      }

      this.traceSquares(position);
    }

    private stopPlacing() {
      this.isMouseDown = false;
      this.usedBlocs = this.gameGrid.countSquareState(SquareState.Value);
    }

    private traceSquares(position: SquarePosition) {
      if (!this.isMouseDown) {
        return;
      }

      if (this.shouldCalcDirection && !_.isEqual(position, this.squareFrom)) {
        this.tracingDirection = position.col !== this.squareFrom.col
          ? MouseDirection.Horizontal : MouseDirection.Vertical;
        this.shouldCalcDirection = false;
      }

      this.changeStates(position);
    }

    private isLeftClick(event: MouseEvent): boolean {
      return event.button === 0;
    }

    private changeStateMode() {
      this.changeGameState(this.gameState === SquareState.Value ? SquareState.Empty : SquareState.Value,
      );
    }

    private prepareActiveState(position: SquarePosition) {
      const actualGridState = this.gameGrid.getState(position);

      if (actualGridState === SquareState.Close) {
        this.stateToUse = this.gameState;
        this.stateToClose = SquareState.Close;
      } else {
        this.stateToUse = actualGridState === this.gameState ? SquareState.Close : this.gameState;
        this.stateToClose = actualGridState;
      }

    }

    private changeStates(to: SquarePosition) {
      const inlineTo = {} as SquarePosition;

      let length = 0;
      let colCoef = 0; // Coefficient === 0, -1 or 1, used to factorise gameGrid browsing
      let rowCoef = 0; // Coefficient === 0, -1 or 1, used to factorise gameGrid browsing

      if (this.tracingDirection === MouseDirection.Horizontal) {
        inlineTo.row = this.squareFrom.row;
        inlineTo.col = to.col;

        length = to.col - this.squareFrom.col;
        colCoef = length > 0 ? 1 : -1;
      } else {
        inlineTo.row = to.row;
        inlineTo.col = this.squareFrom.col;

        length = to.row - this.squareFrom.row;
        rowCoef = length > 0 ? 1 : -1;
      }

      // Foreach case between from and to
      for (let i = 0; i <= Math.abs(length); i++) {
        const actualPosition = {
          col: this.squareFrom.col + i * colCoef,
          row: this.squareFrom.row + i * rowCoef,
        } as SquarePosition;

        // If Set close state or Actual square is close or first is the square --> use the activated State
        const actualGridState = this.gameGrid.getState(actualPosition);
        if ((this.stateToUse !== SquareState.Close && actualGridState === SquareState.Close)
          || (this.stateToUse === SquareState.Close && actualGridState === this.stateToClose)
          || (actualGridState !== SquareState.Close
            && actualGridState !== this.stateToUse
            && actualGridState === this.stateToClose
          )
        ) {
          this.gameGrid.setState(actualPosition, this.stateToUse);
        }
        this.verifyHints(actualPosition);
      }

      this.verifyWin();
    }

    private verifyHints(position: SquarePosition) {
      this.columnHints[position.col].verify(this.gameGrid.getColumn(position.col));
      this.rowHints[position.row].verify(this.gameGrid.getRow(position.row));
    }


    private verifyWin() {
      for (const hints of this.columnHints) {
        if (!hints.valid) {
          return;
        }
      }

      for (const hints of this.rowHints) {
        if (!hints.valid) {
          return;
        }
      }

      this.gameWin = true;
      this.playWinSound();
      this.stopGame();
    }

    private undo() {
      if (this.history.length === 1) {
        this.gameGrid.initEmpty(this.gameGrid.cols, this.gameGrid.rows);
      } else {
        this.gameGrid = this.history.pop() as GameGridModel;
      }
      this.usedBlocs = this.gameGrid.countSquareState(SquareState.Value);
    }

    private addActualToHistory() {
      this.history.push(_.cloneDeep(this.gameGrid));
    }

    private async exportMap() {
      const minifiedMap = [] as number[][];
      for (let row = 0; row < this.gameGrid.states.length; row++) {
        minifiedMap.push([]);
        for (const state of this.gameGrid.states[row]) {
          minifiedMap[row].push(state === SquareState.Value ? 1 : 0);
        }
      }
      const mutation = `mutation createPicross($map: String!) {
        createPicross(map: $map) {id}
      }`;
      await request('https://picross.aifedespaix.com/', mutation, {map: JSON.stringify(minifiedMap)});
    }

    private importMap(jsonMap: string) {
      const encodedMap = JSON.parse(jsonMap);
      const decodedMap = [] as SquareState[][];

      for (let row = 0; row < encodedMap.length; row++) {
        decodedMap.push([]);
        for (const encodedState of encodedMap[row]) {
          decodedMap[row].push(encodedState === 1 ? SquareState.Value : SquareState.Empty);
        }
      }

      return decodedMap;
    }

  }
</script>

<style>
  .picross-container {
    width: 100vmin;
    max-width: calc(100vh - 18rem);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto 1fr;
  }

  .picross {
    touch-action: none;
    width: 100%;
    height: 100vmin;
    max-height: calc(100vh - 18rem);
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: ". colsInfos" "rowsInfos gameInfos";
    overscroll-behavior: none;
  }

  .rowsInfos {
    grid-area: rowsInfos;
  }

  .colsInfos {
    grid-area: colsInfos;
  }

  .gameGrid {
    grid-area: gameInfos;
    display: grid;
  }

  .infos {
    display: grid;
    grid-gap: 1px;
  }

  .btn {
    @apply font-bold py-2 px-4 rounded;
  }

  .btn-blue {
    @apply bg-gray-300 text-white;
  }

  .btn-blue:hover {
    @apply bg-gray-400 text-white;
  }

  .btn-blue:disabled {
    @apply bg-gray-700;
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
    text-shadow:
            1px -1px 0 #767676,
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
</style>
