<template>
  <div>
    <ValidationObserver @submit.prevent="submit" ref="observer" tag="form" v-slot="{ invalid }">

      <ValidationProvider class="field" name="Titre" v-slot="{ errors, classes }">
        <label for="title">{{ $t('create.title') }}</label>
        <input id="title"
               :class="classes"
               required="required"
               type="text"
               min="3"
               max="25"
               v-model="create.title">
        <div class="error">
          {{errors[0]}}
        </div>
      </ValidationProvider>

      <div class="flex justify-center">
        <button :disabled="invalid" class="button button-valid">{{ $t('create.submit') }}</button>
      </div>

    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
import {max_value, min_value, required} from 'vee-validate/dist/rules';
import {gameModule} from '@/store/modules/Game';
import {GameCreateModel} from '@/model/Game/GameCreate';
import {ModalModule, modalModule} from '@/store/modules/Modal';

extend('min_value', min_value);
extend('max_value', max_value);
extend('required', required);

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class CreateModal extends Vue {

  public create = {
    title: '',
  };

  public submit() {
    if ((gameModule.gameModel as GameCreateModel).save()) {
      gameModule.gameModel.newGame({cols: 10, rows: 10});
      modalModule.changeModal(ModalModule.None);
    }
  }
}
</script>
