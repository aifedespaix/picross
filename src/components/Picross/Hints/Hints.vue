<template>
  <div class="flex flex-1 justify-end items-center" :class="hintsDifferenceStyles()">
    <div :class="[hintStyle, hintDifferenceStyles(hint)]"
         v-for="hint in hintsModel.hints">
      {{hint.value}}
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import HintsModel from '@/components/Picross/Hints/Hints.model';
  import {Hint} from '@/components/Picross/Hints/Hint';

  @Component({})
  export default class Hints extends Vue {

    @Prop() private hintsModel!: HintsModel;

    private hintStyle = [
      'flex',
      'justify-center',
      'items-center',
      'w-4',
      'h-4',
    ];

    private hintDifferenceStyles(hint: Hint) {
      return hint.valid ? [
        'text-gray-500',

      ] : [
        'text-gray-800',
      ];
    }

    private hintsDifferenceStyles() {
      return this.hintsModel.valid ? [
        'bg-gray-100',
      ] : [
        'bg-gray-300',
      ];
    }

  }
</script>

<style>

</style>
