<template>
  <div class="app h-full" id="app">
    <Menu/>
    <router-view :class="theme.main" class="overflow-auto" />
    <Modal v-if="isModalOpen" :title="modalModule.activeModal.title">
      <Settings v-if="isSettingsModal"/>
      <Auth v-if="isAuthModal"/>
    </Modal>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Menu from '@/components/Menu.vue';
  import Settings from '@/components/Settings.vue';
  import {settingsModule} from '@/store/modules/Settings';
  import Modal from '@/components/Modal.vue';
  import {ModalType, modalModule} from '@/store/modules/Modal';
  import Auth from '@/components/Auth/Auth.vue';

  @Component({
    components: {
      Auth,
      Menu,
      Modal,
      Settings,
    },
  })
  export default class App extends Vue {
    private get isModalOpen() {
      return this.modalModule.activeModal.type !== ModalType.None;
    }

    private get isSettingsModal() {
      return this.modalModule.activeModal.type === ModalType.Settings;
    }

    private get isAuthModal() {
      return this.modalModule.activeModal.type === ModalType.Auth;
    }

    private get modalModule() {
      return modalModule;
    }

    private get theme() {
      return settingsModule.theme;
    }

  }
</script>

<style>
  html, body {
    height: 100%;
  }

  .app {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
</style>
