<template>
  <div :class="getBgClass()"
       @pointerdown="startPlacing($event)"
       @pointerenter="pointerEnter($event)"
       @pointermove="pointerMove($event)"
       @pointerup="stopPlacing($event)"
       class="square flex justify-center items-center border"
  >
    <TimesIcon class="fill-current" v-if="isEmpty" />
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {SquareState} from '@/components/Picross/Square/SquareState';
  import {SquarePosition} from '@/components/Picross/Square/SquarePosition';
  import _ from 'lodash';
  import {Action, Getter} from 'vuex-class';
  import {Theme} from '@/components/Theme/theme';
  import TimesIcon from '@/components/icons/Times.vue';
  import {GameConfig} from '@/components/Picross/GameConfig';

  @Component({
    components: {TimesIcon},
  })
  export default class Square extends Vue {

    private isChromeMobile!: boolean;

    @Prop({default: SquareState.Empty}) private state!: SquareState;
    @Prop() private readonly position!: SquarePosition;

    @Getter private theme!: Theme;
    @Getter private gameConfig!: GameConfig;

    @Action private playStateSound: any;
    @Action private changeGameState!: any;

    get isEmpty() {
      return this.state === SquareState.Empty;
    }

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
        this.state === SquareState.Close ? this.theme.close : null,
        this.state === SquareState.Value ? this.theme.value : null,
        this.state === SquareState.Empty ? this.theme.empty : null,
      ];
    }

    private startPlacing(event: PointerEvent) {
      const isMouse = this.isMouse(event);
      if (!isMouse || this.isLeftClick(event)) {
        this.$emit('startPlacing', this.position);
      } else if (!this.gameConfig.rightClickChange && isMouse && this.isRightClick(event)) {
        this.changeGameState(SquareState.Empty);
        this.$emit('startPlacing', this.position);
      }
    }

    private stopPlacing(event: PointerEvent) {
      if (!this.gameConfig.rightClickChange && this.isMouse(event) && this.isRightClick(event)) {
        this.changeGameState(SquareState.Value);
      }
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

    private isRightClick(event: PointerEvent) {
      return event.button === 2;
    }

  }
</script>

<style>
  .square {
    transition: all .3s;
  }
</style>
