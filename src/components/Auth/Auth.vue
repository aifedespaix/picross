<template>
  <div>
    <div class="flex border-b">
      <button :class="loginClass"
              @click="activeLogin"
              class="auth-nav">
        {{ $t('auth.login') }}
      </button>

      <button :class="registerClass"
              @click="activeRegister"
              class="auth-nav">
        {{ $t('auth.register') }}
      </button>
    </div>

    <div class="p-4 border border-t-0">
      <keep-alive>
        <component :is="currentAuth"/>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Register from '@/components/Auth/Register.vue';
  import Login from '@/components/Auth/Login.vue';

  @Component({
    components: {
      Login, Register,
    },
  })
  export default class Auth extends Vue {
    private currentAuth: any = Login;

    private get loginClass() {
      return this.currentAuth === Login ? 'auth-nav-open' : 'auth-nav-close';
    }

    private get registerClass() {
      return this.currentAuth === Register ? 'auth-nav-open' : 'auth-nav-close';
    }

    private activeLogin() {
      this.currentAuth = Login;
    }

    private activeRegister() {
      this.currentAuth = Register;
    }
  }
</script>

<style lang="scss">
  .auth-nav {

    @apply bg-white p-2;

    &:hover {
      @apply text-blue-800;
    }

    &-open {
      @apply -mb-px;

      @apply border-l border-t border-r rounded-t text-blue-700;
    }

    &-close {

    }
  }

</style>
