import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {appModule, DeviceType} from '@/store/modules/App';
import {LocalItem} from '@/store/LocalItem';

export interface IGameSettingsState {
  isToggleStateButtonActive: LocalItem<boolean>;
  activateAudio: LocalItem<boolean>;
}

@Module({
  namespaced: true,
  dynamic: true,
  name: 'gameSettings',
  store,
})
export class GameSettings extends VuexModule implements IGameSettingsState {

  private _activateAudio = new LocalItem<boolean>(
    'activateAudio',
    true,
  );

  get activateAudio(): LocalItem<boolean> {
    return this._activateAudio;
  }

  private _isToggleStateButtonActive = new LocalItem<boolean>(
    'isToggleStateButtonActive',
    appModule.device === DeviceType.Mobile,
  );

  get isToggleStateButtonActive(): LocalItem<boolean> {
    return this._isToggleStateButtonActive;
  }

  @Action
  public changeToggleStateButtonActive(active: boolean) {
    this.CHANGE_TOGGLE_STATE_BUTTON(active);
  }

  @Action
  public saveGameSettings() {
    this._isToggleStateButtonActive.save();
  }

  @Mutation
  private CHANGE_TOGGLE_STATE_BUTTON(active: boolean) {
    this._isToggleStateButtonActive.value = active;
  }

}

export const gameSettingsModule = getModule(GameSettings);
