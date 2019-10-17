<template>
  <div class="app h-full" id="app">
    <Menu @toggleConfigModal="toggleConfigModal"/>
    <router-view :class="theme.main"/>
    <ConfigModal @close="toggleConfigModal" v-if="isModalConfigOpen"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Menu from '@/components/Menu.vue';
  import ConfigModal from '@/components/ConfigModal.vue';
  import {Getter} from 'vuex-class';
  import {Theme} from '@/components/Theme/theme';

  @Component({
    components: {
      Menu,
      ConfigModal,
    },
  })
  export default class App extends Vue {
    private isModalConfigOpen = false;

    @Getter private theme!: Theme;

    private toggleConfigModal() {
      alert(process.env);
      this.isModalConfigOpen = !this.isModalConfigOpen;
    }

  }

</script>

<style>
  html, body {
    height: 100%;
  }

  .app {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
</style>
