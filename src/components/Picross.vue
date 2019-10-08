<template>
  <div class="flex flex-col justify-center items-center picross-container">
    <div @touchmove.prevent class="picross select-none" ref="picross">

      <div class="colsInfos infos flex" ref="colHints">
        <Hints :hintsModel="hintsModel" class="flex-col" v-for="(hintsModel, key) in columnHints" :key="key"/>
      </div>

      <div class="rowsInfos infos flex flex-col" ref="rowHints">
        <Hints :hintsModel="hintsModel" class="flex-row" v-for="(hintsModel, key) in rowHints" :key="key"/>
      </div>

      <div @contextmenu="rightClick($event)" class="gameGrid w-full h-full bg-gray-300" ref="gameGrid">
        <template v-for="(gameRow, row) in gameGrid.states">
          <Square :data-col="col" :data-row="row" :key="`square_${col}-${row}`"
                  :position="{col, row}" :state="gameSquareState"
                  @changeStateMode="changeStateMode()"
                  @startPlacing="startPlacing"
                  @stopPlacing="stopPlacing"
                  @traceSquares="traceSquares"

                  v-for="(gameSquareState, col) in gameRow"
          />
        </template>
      </div>
    </div>

    <div class="flex justify-around items-center w-full">
      <button :disabled="!history.length" @click="undo()" class="btn btn-blue">undo</button>
      <div>{{usedBlocs}} / {{maxBlocs}}</div>
      <div>{{duration}}</div>
      <ToggleButton class="w-4 h-4" v-model.isActive="isValueMode"/>
      {{isValueMode}}
    </div>
    {{isMouseDown}}
    <div class="w-full overflow-auto" style="display: grid;grid-template-columns: repeat(6, 1fr);grid-auto-rows: 1fr;">
      <div v-for="bla in blabla">{{bla}}</div>
    </div>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Square from '@/components/Square.vue';
  import Hints from '@/components/Hints.vue';
  import HintsModel from '@/components/Hints.model';
  import {SquareState} from '@/components/SquareState';
  import {SquarePosition} from '@/components/SquarePosition';
  import _ from 'lodash';
  import {GameGridModel} from '@/components/GameGrid.model';
  import {MouseDirection} from '@/components/MouseDirection';
  import ToggleButton from '@/components/ToggleButton.vue';

  @Component({
    components: {Square, Hints, ToggleButton},
  })
  export default class Picross extends Vue {
    private gameStarted = false;

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
    private isValueMode = true;

    private stateToUse!: SquareState;
    private stateToClose!: SquareState;

    private blabla = [] as any[];

    private hintStyle = [
      'flex',
      'justify-center',
      'items-center',
      'w-4',
      'h-4',
    ];

    private beforeMount() {
      this.initSolution();
      this.initGameGrid();
      this.initHints();
      this.addActualToHistory();
      this.maxBlocs = this.solutionGrid.countSquareState(SquareState.Value);
    }

    private initSolution() {
      this.solutionGrid = new GameGridModel([
        [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
        [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
        [1, 1, 2, 1, 2, 2, 1, 2, 1, 1],
        [1, 1, 2, 1, 2, 2, 1, 2, 1, 1],
        [1, 1, 2, 1, 2, 2, 1, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
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
      this.changeStateMode();
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

    private mounted() {
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

    private stopPlacing(event: PointerEvent) {
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
      this.isValueMode = !this.isValueMode;
    }

    private prepareActiveState(position: SquarePosition) {
      const stateAction = this.isValueMode ? SquareState.Value : SquareState.Empty;
      const actualGridState = this.gameGrid.getState(position);

      if (actualGridState === SquareState.Close) {
        this.stateToUse = stateAction;
        this.stateToClose = SquareState.Close;
      } else {
        this.stateToUse = actualGridState === stateAction ? SquareState.Close : stateAction;
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
  }
</script>

<style>
  .picross-container {
    width: 100vmin;
    max-width: calc(100vh - 200px);
  }

  .picross {
    /*touch-action: none;*/
    width: 100%;
    height: 100vmin;
    max-height: calc(100vh - 200px);
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
    grid-gap: 2px;
  }

  .infos {
    display: grid;
    grid-gap: 1px;
  }

  .btn {
    @apply font-bold py-2 px-4 rounded;
  }

  .btn-blue {
    @apply bg-blue-500 text-white;
  }

  .btn-blue:hover {
    @apply bg-blue-700;
  }

  .btn-blue:disabled {
    @apply bg-gray-700;
  }
</style>
