<template>
  <div class="flex flex-col">
    <ValidationObserver @submit.prevent="submit" ref="observer" tag="form" v-slot="{ invalid }">

      <ValidationProvider class="field" name="Email" v-slot="{ errors, classes }">
        <label for="email">{{ $t('auth.email') }}</label>
        <input id="email"
               :class="classes"
               required="required"
               type="email"
               v-model="user.email">
        <div class="error">
          {{errors[0]}}
        </div>
      </ValidationProvider>

      <ValidationProvider class="field" name="Pseudo" v-slot="{ errors, classes }">
        <label for="name">{{ $t('auth.register.username') }}</label>
        <input id="name"
               :class="classes"
               maxlength="80"
               minlength="3"
               required
               type="text"
               v-model="user.username">
        <div class="error">
          {{errors[0]}}
        </div>
      </ValidationProvider>

      <ValidationProvider class="field" name="Mot de passe" v-slot="{ errors, classes }">
        <label for="password">{{ $t('auth.register.password') }}</label>
        <input id="password"
               :class="classes"
               maxlength="50"
               minlength="8"
               required
               type="password"
               v-model="user.password">
        <div class="error">
          {{errors[0]}}
        </div>
      </ValidationProvider>

      <div v-if="error" class="text-red-800 mb-2">Inscription impossible : l'identifiant ou l'email est déjà utilisé.</div>

      <div class="flex justify-center">
        <button :disabled="invalid" class="button button-valid">{{ $t('auth.register.submit') }}</button>
      </div>

    </ValidationObserver>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
import {email, max, min, required} from 'vee-validate/dist/rules';
import {authModule, IRegisterInput} from '@/store/modules/Auth';
import {ModalModule, modalModule} from '@/store/modules/Modal';

extend('required', required);
extend('email', email);
extend('min', min);
extend('max', max);


export interface ILoginInput {
  username: string;
  email: string;
  password: string;
}

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class Register extends Vue {

  public user: IRegisterInput = {username: '', email: '', password: ''};
  private error = false;

  private async submit() {
    const registered = await authModule.register(this.user);
    this.error = !registered;

    if (registered) {
      modalModule.changeModal(ModalModule.None);
    }
  }

}
</script>

