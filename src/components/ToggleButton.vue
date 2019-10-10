<template>
  <div :class="styleClasses()" @click="toggle" class="toggleButton" v-bind:value="value">
    <div :class="value ? 'bubbleOn' : 'bubbleOff'"
         class="rounded-full w-12 h-12 shadow-md toggleButton absolute flex items-center justify-center bg-white">
      <svg height="24" v-if="value" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path :fill="offColor" d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/>
      </svg>
      <svg height="24" v-else viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path :fill="onColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';
  import {AppColors} from '@/app.colors.interface';

  @Component
  export default class ToggleButton extends Vue {

    @Prop() private value!: boolean;

    private offColor = '#333';
    private onColor = '#333';

    @Getter private colors!: AppColors;

    private toggle(event: MouseEvent) {
      this.$emit('input', !this.value);
    }

    private styleClasses() {
      return this.value ? [
        this.colors.main_bg,
      ] : [
        this.colors.second_bg,
      ];
    }

    private bubbleClasses() {
      return this.value ? [
        'bubble-on',
      ] : [
        'bubble-off',
      ];
    }
  }
</script>

<style>

  .bubble-on {
    left: calc(100% - 3.25rem);
  }

  .bubble-off {
    left: .25rem;
  }

  .toggleButton {
    transition: all .3s ease;
    @apply rounded-full flex h-16 p-1 items-center shadow-md toggleButton relative cursor-pointer select-none;
    width: 10rem;
  }
</style>
