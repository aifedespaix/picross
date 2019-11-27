<template>
  <div class="flex flex-col">
    <ValidationObserver @submit.prevent="submit" ref="observer" tag="form" v-slot="{ invalid }">

      <ValidationProvider class="field" name="Pseudo" v-slot="{ errors, classes }">
        <label for="name">{{ $t('auth.username') }}</label>
        <input :class="classes"
               id="name"
               maxlength="80"
               minlength="3"
               required
               type="text"
               v-model="user.email">
        <div class="error">
          {{errors[0]}}
        </div>
      </ValidationProvider>

      <ValidationProvider class="field" name="Mot de passe" v-slot="{ errors, classes }">
        <label for="password">{{ $t('auth.password') }}</label>
        <input :class="classes"
               id="password"
               maxlength="50"
               minlength="8"
               required
               type="password"
               v-model="user.password">
        <div class="error">
          {{errors[0]}}
        </div>
      </ValidationProvider>

      <div class="text-red-800 mb-2" v-if="error">Connection impossible : l'identifiant ou mot de passe incorrectes.</div>

      <div class="flex justify-center">
        <button :disabled="invalid" class="button button-valid">{{ $t('auth.login.submit') }}</button>
      </div>

    </ValidationObserver>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
  import {email, max, min} from 'vee-validate/dist/rules';
  import {authModule, ILoginInput} from '@/store/modules/Auth';
  import {ModalModule, modalModule} from '@/store/modules/Modal';

  extend('email', email);
  extend('min', min);
  extend('max', max);
  @Component({
    components: {ValidationObserver, ValidationProvider},
  })
  export default class Login extends Vue {
    public user: ILoginInput = {email: '', password: ''};
    private error = false;

    private async submit() {
      const loged = await authModule.login(this.user);
      this.error = !loged;

      if (loged) {
        modalModule.changeModal(ModalModule.None);
      }
    }

  }
</script>

<style>

</style>
