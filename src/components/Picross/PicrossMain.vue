<template>

  <div @contextmenu="rightClick($event)" class="picross-container">
    ze
  </div>
</template>

<script lang="ts">

  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    components: {

    },
  })
  export default class PicrossMain extends Vue {

    private rightClick(event: MouseEvent) {
      event.preventDefault(); // Remove right click menu
      if (this.gameConfig.rightClickChange) {
        this.changeStateMode();
      }
    }

  }
</script>

<style>

</style>
