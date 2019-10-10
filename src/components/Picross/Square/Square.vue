<template>
  <div :class="getBgClass()"
       @pointerdown="startPlacing($event)"
       @pointerenter="pointerEnter($event)"
       @pointermove="pointerMove"
       @pointerup="stopPlacing($event)"
       class="square flex justify-center items-center border border-gray-100"
  ></div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {SquareState} from '@/components/Picross/Square/SquareState';
  import {SquarePosition} from '@/components/Picross/Square/SquarePosition';
  import _ from 'lodash';
  import {Action, Getter} from 'vuex-class';
  import {AppColors} from '@/app.colors.interface';
  import {AppSounds} from '@/app.sounds.interface';

  @Component
  export default class Square extends Vue {

    @Prop({default: SquareState.Empty}) private state!: SquareState;
    @Prop() private readonly position!: SquarePosition;

    private audioEmpty!: HTMLAudioElement;
    private isChromeMobile!: boolean;

    @Getter private colors!: AppColors;

    @Action private playStateSound: any;

    @Watch('state')
    private onPropertyChanged(state: SquareState, oldValue: string) {
      this.playStateSound(state);
    }

    private beforeMount() {
      const userAgent = navigator.userAgent.toLowerCase();
      this.isChromeMobile = userAgent.indexOf('chrome') > -1 && userAgent.indexOf('mobile') > -1;
    }

    private getBgClass() {
      return [
        this.state === SquareState.Close ? this.colors.second_bg : null,
        this.state === SquareState.Value ? this.colors.main_bg : null,
        this.state === SquareState.Empty ? 'bg-gray-400' : null,
      ];
    }

    private startPlacing(event: PointerEvent) {
      if (!this.isMouse(event) || this.isLeftClick(event)) {
        this.$emit('startPlacing', this.position);
      }
    }

    private stopPlacing() {
      this.$emit('stopPlacing', this.position);
    }

    private pointerEnter(event: PointerEvent) {
      if (!this.isChromeMobile) {
        this.$emit('traceSquares', this.position);
      }
    }

    /**
     * Chrome Mobile
     * https://github.com/aifedespaix/picross/issues/1
     * this.is_chrome +
     */
    private pointerMove(event: PointerEvent) {
      if (this.isChromeMobile) {
        const element = document.elementFromPoint(event.pageX, event.pageY) as HTMLElement;
        const position = {
          col: parseInt(element.dataset.col as string, 10),
          row: parseInt(element.dataset.row as string, 10),
        } as SquarePosition;

        if (position.col && position.row && !_.isEqual(position, this.position)) {
          this.$emit('traceSquares', position);
        }
      }
    }

    private isMouse(event: PointerEvent) {
      return event.pointerType === 'mouse';
    }

    private isLeftClick(event: PointerEvent) {
      return event.button === 0;
    }

  }
</script>

<style>
  .square {
    transition: all .3s;
  }
</style>
