<template>
  <div>
    {{authModule.login}}
    {{authModule.password}}
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {authModule} from '@/store/modules/Auth';

@Component({
  components: {},
})
export default class Login extends Vue {
  public get authModule() {
    return authModule;
  }

  @Watch('login')
  private updateLogin(login: string) {
    authModule.changeLogin(login);
  }

  @Watch('password')
  private updatePassword(password: string) {
    authModule.changePassword(password);
  }

}
</script>

<style>

</style>
