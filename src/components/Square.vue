<template>
  <div :class="getSquareClass(state)" class="flex justify-center items-center"></div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { SquareState } from '@/components/SquareState';

  @Component
  export default class Square extends Vue {

    @Prop() private state!: number;

    private getSquareClass(gameSquare: SquareState) {
      return {
        'bg-white': gameSquare === SquareState.Close,
        'bg-gray-400': gameSquare === SquareState.Empty,
        'bg-gray-600': gameSquare === SquareState.Value,
      };
    }

  }
</script>
