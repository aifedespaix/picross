<template>
  <div :class="getBgClass()"
       @pointerdown="startPlacing($event)"
       @pointerenter="pointerEnter($event)"
       @pointermove="pointerMove"
       @pointerup="stopPlacing($event)"
       class="flex justify-center items-center"
  >{{z}}
  </div>
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
    private z = '' as any;

    private getBgClass() {
      return {
        'bg-white': this.state === SquareState.Close,
        'bg-gray-400': this.state === SquareState.Empty,
        'bg-gray-600': this.state === SquareState.Value,
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
      if (this.isMouse(event)) {
        this.$emit('traceSquares', this.position);
      }
    }

    /**
     * CES FILS DE PUTE DE POINTER EVENT NE FONCTIONNE PAS DE LA MEME FACON SUR MOBILE
     * ET OUI, CES ENCULES D'EVENT POINTENT SUR UNE TARGET QUI EST TOUJOURS LA MEME :
     * LA TARGET DE DEPART, ALORS QUE SUR PC CA POINT BIEN SUR LA TARGET QUI EST SOUS NOTRE POINTEUR
     * DE PLUS LE POINTER ENTER NE FONCTIONNE PAS NON PLUS, LOGIQUE ON CHANGE JAMAIS DE TARGET
     * LA SEULE SOLUTION QUE J'AI TROUVEE C'EST DE FOUTRE UN FUCKING POINTERMOVE POUR VERIFIER CES MERDES
     * ET TOUT RECALCULER SOUS MOBILE DE MERDE
     * @param event
     */
    private pointerMove(event: PointerEvent) {
      if (!this.isMouse(event)) {
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
