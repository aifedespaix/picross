<template>
  <div class="modal flex items-center justify-center cursor-default">
    <div class="modal-overlay opacity-75 bg-black z-0"></div>

    <div :class="theme.modal" class="z-10 p-4 shadow">
      <div class="flex justify-between items-center select-none">
        <h3 class="text-xl font-bold mr-4">{{title}}</h3>

        <button @click="close"
                class="close w-8 h-8 rounded-full flex justify-center items-center hover:text-red-700 hover:shadow">
          <TimesIcon class="fill-current"/>
        </button>
      </div>

      <div class="flex flex-col p-4">
          <slot></slot>
      </div>

    </div>
  </div>
</template>

<script lang="ts">

  import {Vue, Component, Prop} from 'vue-property-decorator';
  import TimesIcon from '@/components/icons/Times.vue';
  import { settingsModule } from '@/store/modules/Settings';
  import {ModalModule, modalModule} from '@/store/modules/Modal';

  @Component({
    components: {
      TimesIcon,
    },
  })
  export default class Modal extends Vue {
    @Prop() private title!: string;

    get theme() {
      return settingsModule.theme;
    }

    private close() {
      modalModule.changeModal(ModalModule.None);
    }

  }
</script>

<style>
  .modal,
  .modal-overlay {
    @apply absolute w-full h-full;
  }

  .close {
    transition: color .25s ease-in-out;
  }
</style>
