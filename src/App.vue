<template>
  <div class="app h-full" id="app">
    <Menu/>
    <router-view :class="theme.main" class="overflow-auto"/>
    <Modal :title="modalModule.activeModal.title" v-if="isModalOpen">
      <Settings v-if="isSettingsModal"/>
      <Auth v-if="isAuthModal"/>
      <CreateModal v-if="isCreateModal"/>
    </Modal>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Menu from '@/components/Menu.vue';
  import Settings from '@/components/Settings.vue';
  import {settingsModule} from '@/store/modules/Settings';
  import Modal from '@/components/Modal.vue';
  import {modalModule, ModalType} from '@/store/modules/Modal';
  import Auth from '@/components/Auth/Auth.vue';
  import {authModule} from '@/store/modules/Auth';
  import {tokenModule} from '@/store/modules/Token';
  import CreateModal from '@/components/Picross/Create.modal.vue';

  @Component({
    components: {
      CreateModal,
      Auth,
      Menu,
      Modal,
      Settings,
    },
  })
  export default class App extends Vue {
    private beforeMount() {
      if (!!tokenModule.token) {
        authModule.loadProfile();
      }
    }

    private get isModalOpen() {
      return this.modalModule.activeModal.type !== ModalType.None;
    }

    get isSettingsModal() {
      return this.modalModule.activeModal.type === ModalType.Settings;
    }

    get isAuthModal() {
      return this.modalModule.activeModal.type === ModalType.Auth;
    }

    get isCreateModal() {
      return this.modalModule.activeModal.type === ModalType.Create;
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
