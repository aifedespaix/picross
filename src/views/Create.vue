<template>
  <div @contextmenu="rightClick($event)" class="create">
    <div class="flex justify-center">
      <ValidationProvider class="field" name="Columns" v-slot="{ errors, classes }">
        <label for="cols">{{ $t('create.cols') }}</label>
        <input :class="classes" id="cols" max="25" min="3" required="required" type="number" v-model="cols">
        <div class="error">
          {{errors[0]}}
        </div>
      </ValidationProvider>

      <ValidationProvider class="field" name="Rows" v-slot="{ errors, classes }">
        <label for="rows">{{ $t('create.rows') }}</label>
        <input :class="classes" id="rows" max="25" min="3" required="required" type="number" v-model="rows">
        <div class="error">
          {{errors[0]}}
        </div>
      </ValidationProvider>

      <button @click="save">Save</button>
    </div>

    <Picross v-if="ready" ref="picross"/>

  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import Picross from '@/components/Picross/Picross.vue';
  import PicrossMain from '@/components/Picross/PlayGame.vue';
  import GameGrid from '@/components/Picross/GameGrid/GameGrid.vue';
  import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
  import {max_value, min_value, required} from 'vee-validate/dist/rules';
  import {gamePlayModule} from '@/store/modules/GamePlay';
  import {SquareState} from '@/model/Square/SquareState';
  import {GameMode} from '@/model/Game/GameModel';
  import {GameCreateModel} from '@/model/Game/GameCreate';

  extend('min_value', min_value);
  extend('max_value', max_value);
  extend('required', required);

  @Component({
    components: {
      GameGrid,
      PicrossMain,
      Picross,
      ValidationProvider,
      ValidationObserver,
    },
  })
  export default class Create extends Vue {

    private get ready() {
      return gamePlayModule.gameModel.loaded;
    }

    private cols = 10;
    private rows = 10;

    @Watch('cols')
    public setCols(value: number) {
      gamePlayModule.gameModel.gameGrid.setCols(value, SquareState.Close);
      const picross = this.$refs.picross as any;
      picross.calcGridStyle();
    }

    @Watch('rows')
    public setRows(value: number) {
      gamePlayModule.gameModel.gameGrid.setRows(this.rows, SquareState.Close);
      const picross = this.$refs.picross as any;
      picross.calcGridStyle();
    }

    private mounted() {
      gamePlayModule.CHANGE_GAME_MODE(GameMode.Create);
      gamePlayModule.gameModel.newGame(this.cols, this.rows);
    }

    private rightClick(event: MouseEvent) {
      event.preventDefault();
    }

    private save() {
      (gamePlayModule.gameModel as GameCreateModel).save();
    }

  }
</script>

<style>
  .create {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
</style>
