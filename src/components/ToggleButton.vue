<template>
  <div :class="toggleClass" @click="toggle" class="toggleButton">

    <div :class="theme.value" class="bubble" ref="bubble">
      <DrawIcon class="fill-current" v-if="isValueState"/>
      <TimesIcon class="fill-current" v-else/>
    </div>

  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import {Action, Getter} from 'vuex-class';
  import DrawIcon from '@/components/icons/Draw.vue';
  import {Theme} from '@/components/Theme/theme';
  import TimesIcon from '@/components/icons/Times.vue';
  import {SquareState} from '@/components/Picross/Square/SquareState';
  import {settingsModule} from '@/store/modules/Settings';
  import {gamePlayModule} from '@/store/modules/GamePlay';

  @Component({
    components: {DrawIcon, TimesIcon},
  })
  export default class ToggleButton extends Vue {

    get theme() {
      return settingsModule.theme;
    }
    get gameState() {
      return gamePlayModule.actualState;
    }

    get isValueState() {
      return this.gameState === SquareState.Value;
    }

    private mounted() {
      this.putBubble(this.gameState === SquareState.Value ? 1 : 0);
    }

    @Watch('gameState')
    private onValueChange(value: SquareState) {
      if (value === SquareState.Value) {
        this.putBubble(1);
      } else {
        this.putBubble(0);
      }
    }

    /**
     * @param position Value between 0 and 1
     */
    private putBubble(position: number) {
      const bubble = this.$refs.bubble as HTMLElement;
      bubble.style.transform = `translateX(${5.75 * position + .25}rem)`;
    }

    private toggle() {
      gamePlayModule.switchStateMode();
    }

    get toggleClass() {
      return this.gameState === SquareState.Value ? this.theme.value : this.theme.empty;
    }

    private dragBubble(event: DragEvent) {
      const x = event.offsetX;
      const target = event.target as HTMLElement;

      if (x < 0) {
        if (this.gameState === SquareState.Value) {
          this.toggle();
        }
      } else if (x > target.clientWidth) {
        if (this.gameState === SquareState.Empty) {
          this.toggle();
        }
      } else {
        const coef = target.clientWidth / x;
        if (coef > .5 && this.gameState === SquareState.Empty) {
          this.toggle();
        } else if (coef <= .5 && this.gameState === SquareState.Empty) {
          this.toggle();
        } else {
          this.putBubble(x / target.clientWidth);
        }
      }

    }
  }
</script>

<style>
  .bubble {
    @apply rounded-full w-12 h-12 shadow-md toggleButton absolute flex items-center justify-center;
  }

  .toggleButton {
    transition: all .3s ease;
    @apply rounded-full flex h-16 p-1 items-center shadow-md toggleButton relative cursor-pointer select-none w-40;
  }
</style>
