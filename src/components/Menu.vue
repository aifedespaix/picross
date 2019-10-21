import { ModalEnum } from '@/store/modules/Modal';
<template>
  <header :class="theme.second" class="header">
    <img alt="Logo Picross" class="h-full p-2" src="@/assets/icons/picross-icon.svg">

    <nav>
      <router-link :to="item.to" class="px-2" v-bind:key="item.id"
                   v-for="item in items">
        {{item.name}}
      </router-link>
    </nav>

    <div class="flex">
      <button @click="showConfig" class="flex items-center p-3 rounded-full">
        <ConfigIcon/>
      </button>

      <button @click="showAuth" class="flex items-center p-3 rounded-full">
        <AuthIcon/>
      </button>
    </div>
  </header>

</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ConfigIcon from '@/components/icons/Config.vue';
  import {settingsModule} from '@/store/modules/Settings';
  import {modalModule, ModalModule} from '@/store/modules/Modal';
  import AuthIcon from '@/components/icons/Auth.vue';

  interface Item {
    to: string;
    name: string;
  }

  @Component({
    components: {ConfigIcon, AuthIcon},
  })
  export default class Menu extends Vue {
    private items!: Item[];

    get theme() {
      return settingsModule.theme;
    }

    private beforeCreate() {
      this.items = [
        {to: '/', name: 'Picross'} as Item,
        {to: '/about', name: 'À Propos'} as Item,
      ];
    }

    private showConfig() {
      modalModule.changeModal(ModalModule.Settings);
    }

    private showAuth() {
      modalModule.changeModal(ModalModule.Auth);
    }

  }
</script>

<style lang="scss">
  .header {
    @apply flex items-center justify-between h-20;
  }
</style>
