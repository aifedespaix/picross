<template>
  <header :class="theme.second" class="header">
    <img alt="Logo Picross" class="h-full p-2" src="@/assets/icons/picross-icon.svg">

    <nav>
      <router-link :to="item.to" class="px-2" v-bind:key="item.id"
                   v-for="item in items">
        {{item.name}}
      </router-link>
    </nav>

    <button @click="toggleConfig" class="flex items-center p-3 rounded-full">
      <ConfigIcon/>
    </button>
  </header>

</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';
  import ConfigIcon from '@/components/icons/Config.vue';
  import {Theme} from '@/components/Theme/theme';
  import {settingsModule} from '@/store/modules/Settings';

  interface Item {
    to: string;
    name: string;
  }

  @Component({
    components: {ConfigIcon},
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

    private toggleConfig() {
      this.$emit('toggleConfigModal');
    }

  }
</script>

<style lang="scss">
  .header {
    @apply flex items-center justify-between h-20;
  }
</style>
