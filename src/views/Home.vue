<template>
  <div @contextmenu="rightClick($event)" class="flex justify-center">
<!--    <Picross/>-->
    <PicrossMain/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Picross from '@/components/Picross/Picross.vue';
  import PicrossMain from '@/components/Picross/PicrossMain.vue'; // @ is an alias to /src

  @Component({
    components: {
      PicrossMain,
      Picross,
    },
  })
  export default class Home extends Vue {
    private rightClick(event: MouseEvent) {
      event.preventDefault();
    }
  }
</script>
