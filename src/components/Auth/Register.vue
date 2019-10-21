<template>
  <div class="flex flex-col">
    <ValidationProvider name="Email" class="field" v-slot="{ errors }">
      <label for="email">Email</label>
      <input id="email"
             required
             type="email"
             v-model="email">
      <div class="error">
        {{errors[0]}}
      </div>
    </ValidationProvider>

    <ValidationProvider name="Pseudo" class="field" v-slot="{ errors }">
      <label for="name">Pseudo</label>
      <input id="name"
             required
             minlength="3"
             maxlength="25"
             type="text"
             v-model="name">
      <div class="error">
        {{errors[0]}}
      </div>
    </ValidationProvider>

    <ValidationProvider name="Mot de passe" class="field" v-slot="{ errors }">
      <label for="password">Mot de passe</label>
      <input id="password"
             required
             minlength="8"
             maxlength="50"
             type="password"
             v-model="password">
      <div class="error">
        {{errors[0]}}
      </div>
    </ValidationProvider>

    <div class="flex justify-center">
      <button class="button button-valid">S'inscrire</button>
    </div>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {extend, ValidationProvider} from 'vee-validate';
  import {email, max, min} from 'vee-validate/dist/rules';

  extend('required', (value) => !!value);
  extend('email', email);
  extend('min', min);
  extend('max', max);

  interface IRegister {
    email: string;
    name: string;
    password: string;
  }

  @Component({
    components: {
      ValidationProvider,
    },
  })
  export default class Register extends Vue implements IRegister {

    public email = '';
    public password = '';
    public name = '';
  }
</script>

