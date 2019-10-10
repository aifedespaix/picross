<template>
  <div id="app" class="app h-full">
    <Menu/>
    <router-view/>
  </div>

  <ConfigModal v-if="!openConfig"/>

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Menu from '@/components/Menu.vue';
  import ConfigModal from '@/components/Config.modal.vue';

  @Component({
    components: {
      Menu,
      ConfigModal,
    },
  })
  export default class App extends Vue {
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
