<template>
  <div class="flex justify-center">
    <Picross />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Picross from '@/components/Picross/Picross.vue'; // @ is an alias to /src

@Component({
  components: {
    Picross,
  },
})
export default class Home extends Vue {}
</script>
