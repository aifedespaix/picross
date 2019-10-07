<template>
  <div class="flex flex-1 justify-end items-center bg-gray-300" :class="{'bg-green-300': hintsModel.valid}">
    <div :class="[hintStyle, hint.valid ? 'text-blue-700' : 'text-gray-500']"
         v-for="hint in hintsModel.hints">
      {{hint.value}}
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import HintsModel from '@/components/Hints.model';

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

  }
</script>

<style>

</style>
