<template>
  <div :class="getBgClass()"
       @pointerdown="startPlacing($event)"
       @pointerenter="pointerEnter($event)"
       @pointermove="pointerMove"
       @pointerup="stopPlacing($event)"
       class="flex justify-center items-center border border-gray-100"
  ></div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {SquareState} from '@/components/SquareState';
  import {SquarePosition} from '@/components/SquarePosition';
  import _ from 'lodash';

  @Component
  export default class Square extends Vue {

    @Prop() private state!: SquareState;
    @Prop() private position!: SquarePosition;
    private isChromeMobile!: boolean;

    /**
     * todo : passer en "mounted" ? Doit être appelé avant l'event pointerenter/pointermove
     */
    private beforeMount() {
      const userAgent = navigator.userAgent.toLowerCase();
      this.isChromeMobile = userAgent.indexOf('chrome') > -1 && userAgent.indexOf('mobile') > -1;
    }

    private getBgClass() {
      return {
        'bg-white': this.state === SquareState.Close,
        'bg-gray-400': this.state === SquareState.Empty,
        'bg-blue-900': this.state === SquareState.Value,
      };
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
