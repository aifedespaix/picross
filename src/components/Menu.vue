<template>
  <header :class="theme.second" class="header">

    <router-link class="h-full" to="/">
      <img alt="Logo Picross" class="h-full p-2" src="@/assets/icons/picross-icon.svg">
    </router-link>

    <nav>
      <router-link
        :to="item.to"
        class="px-2"
        v-bind:key="item.id"
        v-for="item in items">{{item.name}}
      </router-link>
    </nav>

    <div class="flex mx-2">
      <button @click="showConfig" class="flex items-center p-3 rounded-full">
        <ConfigIcon/>
      </button>

      <router-link class="button button-squared rounded-full bg-white h-full" to="/profile" v-if="logged">
        <img alt="Logo Picross" class="h-full revert" src="@/assets/icons/picross-icon.svg">
      </router-link>

      <button @click="showAuth" class="flex items-center p-3 rounded-full" v-else>
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
import {authModule} from '@/store/modules/Auth';

interface Item {
  to: string;
  name: string;
}

@Component({
  components: {ConfigIcon, AuthIcon},
})
export default class Menu extends Vue {

  get logged() {
    return authModule.logged;
  }

  get user() {
    return authModule.user;
  }

  get theme() {
    return settingsModule.theme;
  }

  public userDropDownAction: boolean = false;
  private items!: Item[];
  private loggedItems!: Item[];

  private beforeCreate() {
    this.items = [
      {to: '/', name: 'Picross'} as Item,
      // {to: '/about', name: 'À Propos'} as Item,
    ];
    this.loggedItems = [
      {to: '/create', name: 'Créer'} as Item,
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
