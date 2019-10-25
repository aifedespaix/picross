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

    <Picross ref="picross" v-if="ready"/>

  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import Picross from '@/components/Picross/Picross.vue';
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
import {max_value, min_value, required} from 'vee-validate/dist/rules';
import {gameModule} from '@/store/modules/Game';
import {SquareState} from '@/model/Square/SquareState';
import {GameMode} from '@/model/Game/GameModel';
import {GameCreateModel} from '@/model/Game/GameCreate';

extend('min_value', min_value);
extend('max_value', max_value);
extend('required', required);

@Component({
  components: {
    Picross,
    ValidationProvider,
    ValidationObserver,
  },
})
export default class GameCreate extends Vue {


  private get ready() {
    return gameModule.gameModel.loaded;
  }

  private cols = 10;
  private rows = 10;

  @Watch('cols')
  public setCols(value: number) {
    gameModule.gameModel.gameGrid.setCols(value, SquareState.Close);
    const picross = this.$refs.picross as any;
    picross.calcGridStyle();
  }

  @Watch('rows')
  public setRows(value: number) {
    gameModule.gameModel.gameGrid.setRows(this.rows, SquareState.Close);
    const picross = this.$refs.picross as any;
    picross.calcGridStyle();
  }

  private beforeMount() {
    gameModule.changeGameMode(GameMode.Create);
  }

  private mounted() {
    gameModule.gameModel.newGame({cols: this.cols, rows: this.rows});
  }

  private rightClick(event: MouseEvent) {
    event.preventDefault();
  }

  private save() {
    (gameModule.gameModel as GameCreateModel).save();
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
