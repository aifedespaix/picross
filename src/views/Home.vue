<template>
  <div @contextmenu="rightClick($event)" class="flex justify-center">
    <PlayGame/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import PlayGame from '@/components/Picross/GamePlay.vue';

  @Component({
    components: {PlayGame},
  })
  export default class Home extends Vue {
    private rightClick(event: MouseEvent) {
      event.preventDefault();
    }
  }
</script>
