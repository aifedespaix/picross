<template>
  <div id="app" class="app h-full">
    <Menu/>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Menu from '@/components/Menu.vue';

  @Component({
    components: {
      Menu,
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
