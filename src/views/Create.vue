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
    </div>

    <Picross v-if="ready"/>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Picross from '@/components/Picross/Picross.vue';
  import PicrossMain from '@/components/Picross/PicrossMain.vue';
  import GameGrid from '@/components/Picross/GameGrid/GameGrid.vue';
  import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
  import {max_value, min_value, required} from 'vee-validate/dist/rules';
  import {gamePlayModule} from '@/store/modules/GamePlay';

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
    private _cols = 10;
    private _rows = 10;

    get cols(): number {
      return this._cols;
    }

    set cols(value: number) {
      this._cols = value;
      gamePlayModule.playingGrid.addCols(this._cols - gamePlayModule.playingGrid.cols);
    }

    get rows(): number {
      return this._rows;
    }

    set rows(value: number) {
      this._rows = value;
      gamePlayModule.playingGrid.addRows(this._rows - gamePlayModule.playingGrid.rows);
    }

    /**
     * todo
     */
    private get ready() {
      return true;
    }

    private rightClick(event: MouseEvent) {
      event.preventDefault();
    }

    private async mounted() {
      await gamePlayModule.newCreator({cols: this._cols, rows: this._rows});
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
