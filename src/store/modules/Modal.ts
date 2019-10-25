import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

export enum ModalType {
  None,
  Settings,
  Auth,
  Create,
}

interface IModal {
  type: ModalType;
  title: string;
}

interface IModalState {
  activeModal: IModal;
}

@Module({
  namespaced: true,
  dynamic: true,
  name: 'modal',
  store,
})
export class ModalModule extends VuexModule implements IModalState {
  public static readonly None: IModal = {
    type: ModalType.None,
    title: '',
  };
  public static readonly Auth: IModal = {
    type: ModalType.Auth,
    title: 'Authentification',
  };
  public static readonly Settings: IModal = {
    type: ModalType.Settings,
    title: 'Paramètres',
  };
  public static readonly Create: IModal = {
    type: ModalType.Create,
    title: 'Création',
  };

  private _activeModal = ModalModule.None;

  get activeModal(): IModal {
    return this._activeModal;
  }

  @Action
  public changeModal(modal: IModal) {
    this.CHANGE_MODAL(modal);
  }

  @Mutation
  private CHANGE_MODAL(modal: IModal) {
    this._activeModal = modal;
  }

}

export const modalModule = getModule(ModalModule);
