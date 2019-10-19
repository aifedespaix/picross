<template>
  <div
    :class="getBgClass()"
    @pointerdown="startPlacing($event)"
    @pointerenter="pointerEnter($event)"
    @pointermove="pointerMove($event)"
    @pointerup="stopPlacing($event)"
    class="square flex justify-center items-center border"
    ref="square"
  >
    <TimesIcon class="fill-current" v-if="isEmpty"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {SquareState} from '@/components/Picross/Square/SquareState';
import {SquarePosition} from '@/components/Picross/Square/SquarePosition';
import _ from 'lodash';
import TimesIcon from '@/components/icons/Times.vue';
import {settingsModule} from '@/store/modules/Settings';
import {gameSettingsModule} from '@/store/modules/GameSettings';
import {gamePlayModule} from '@/store/modules/GamePlay';
import {Mouse} from '@/utils/Mouse';

@Component({
  components: {TimesIcon},
})
export default class Square extends Vue {

  private isChromeMobile!: boolean;

  @Prop({default: SquareState.Empty}) private state!: SquareState;
  @Prop() private readonly position!: SquarePosition;

  get isEmpty() {
    return this.state === SquareState.Empty;
  }

  private beforeMount() {
    const userAgent = navigator.userAgent.toLowerCase();
    this.isChromeMobile = userAgent.indexOf('chrome') > -1 && userAgent.indexOf('mobile') > -1;
  }

  private mounted() {
    this.cssSpecialBorders();
  }

  private cssSpecialBorders() {
    const $square = this.$refs.square as HTMLDivElement;
    if (this.position.col && this.position.col % 5 === 0) {
      $square.style.marginLeft = '1px';
    }
    if (this.position.row && this.position.row % 5 === 0) {
      $square.style.marginTop = '1px';
    }
  }

  private getBgClass() {
    return [
      this.state === SquareState.Close ? settingsModule.theme.close : null,
      this.state === SquareState.Value ? settingsModule.theme.value : null,
      this.state === SquareState.Empty ? settingsModule.theme.empty : null,
    ];
  }

  private startPlacing(event: PointerEvent) {
    const isMouse = Mouse.isMouse(event);

    if (gameSettingsModule.isToggleStateButtonActive.value) {
      if (Mouse.isRightClick(event)) {
        gamePlayModule.switchStateMode();
      } else {
        gamePlayModule.startPlacing(this.position);
      }
    } else {
      if (Mouse.isRightClick(event)) {
        gamePlayModule.switchStateMode();
        gamePlayModule.startPlacing(this.position);
        gamePlayModule.switchStateMode();
      } else {
        gamePlayModule.startPlacing(this.position);
      }
    }
  }

  private stopPlacing(event: PointerEvent) {
    if (!gameSettingsModule.isToggleStateButtonActive.value && Mouse.isMouse(event) && Mouse.isRightClick(event)) {
      gamePlayModule.switchStateMode();
    }
    gamePlayModule.stopPlacing();
  }

  private pointerEnter(event: PointerEvent) {
    if (!this.isChromeMobile) {
      gamePlayModule.changeStatesTo(this.position);
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
        gamePlayModule.changeStatesTo(this.position);
      }
    }
  }

}
</script>

<style>
  .square {
    transition: all .3s;
  }
</style>
