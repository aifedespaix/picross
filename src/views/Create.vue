<template>
  <div @contextmenu="rightClick($event)" class="picross-container">

    <ValidationObserver @change.prevent="submit" @submit.prevent="$event.preventDefault()" class="create-actions"
                        ref="observer" tag="form" v-slot="{ invalid }">

      <ValidationProvider class="field field-small" name="Columns" v-slot="{ errors, classes }">
        <label for="cols">{{ $t('create.cols') }}</label>
        <input :class="classes" id="cols" max="15" min="3" required="required" type="number" v-model="cols">
        <div class="error">
          {{errors[0]}}
        </div>
      </ValidationProvider>

      <ValidationProvider class="field field-small" name="Rows" v-slot="{ errors, classes }">
        <label for="rows">{{ $t('create.rows') }}</label>
        <input :class="classes" id="rows" max="15" min="3" required="required" type="number" v-model="rows">
        <div class="error">
          {{errors[0]}}
        </div>
      </ValidationProvider>

      <button @click="linkValues = !linkValues" class="button my-2 " :class="linkValues ? 'bg-blue-800' : 'bg-gray-300'">
        <LinkIcon class="fill-current text-blue-200" v-if="linkValues"/>
        <LinkOffIcon class="fill-current text-gray-600" v-else/>
      </button>

      <button :disabled="!isValid || invalid" @click="save" class="button button-valid">Enregistrer</button>
    </ValidationObserver>


    <Picross class="picross" ref="picross" v-if="ready"/>

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
import {ModalModule, modalModule} from '@/store/modules/Modal';
import LinkIcon from '@/components/icons/Link.vue';
import LinkOffIcon from '@/components/icons/LinkOff.vue';
import {GamePlayModel} from '@/model/Game/GamePlay';
import {GameCreateModel} from '@/model/Game/GameCreate';

extend('min_value', min_value);
extend('max_value', max_value);
extend('required', required);

@Component({
  components: {
    Picross,
    ValidationProvider,
    ValidationObserver,
    LinkIcon,
    LinkOffIcon,
  },
})
export default class GameCreate extends Vue {

  public linkValues: boolean = true;

  get ready() {
    return gameModule.gameModel.loaded;
  }

  private cols = 10;
  private rows = 10;

  @Watch('linkValues')
  public changeLinkValues(linked: boolean) {
    if (linked) {
      this.linkedValues((this.rows > this.cols ? this.rows : this.cols).toString());
    }
  }

  @Watch('cols')
  @Watch('rows')
  public linkedValues(value: string) {
    if (this.linkValues) {
      this.cols = parseInt(value, 10);
      this.rows = parseInt(value, 10);
    }
  }

  get isValid() {
    const cols = gameModule.gameModel.gameGrid.cols;
    const rows = gameModule.gameModel.gameGrid.cols;
    const blocs = gameModule.gameModel.gameGrid.countValue(SquareState.Value);

    return blocs > (cols * rows) / 3;
  }

  public submit() {
    if (this.cols >= 3 && this.cols <= 15 && this.rows >= 3 && this.rows <= 15) {
      (gameModule.gameModel as GameCreateModel).changeSize(this.cols, this.rows);
      const picross = this.$refs.picross as any;
      picross.calcGridStyle();
    }
  }

  public rightClick(event: MouseEvent) {
    event.preventDefault();
  }

  public save() {
    modalModule.changeModal(ModalModule.Create);
  }

  private beforeMount() {
    gameModule.changeGameMode(GameMode.Create);
  }

  private mounted() {
    gameModule.gameModel.newGame({cols: this.cols, rows: this.rows});
  }

}
</script>

<style>
  .create-actions {
    @apply flex justify-center flex-col items-center;
    grid-row: span 2
  }
</style>
