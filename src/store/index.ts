import Vue from 'vue';
import Vuex from 'vuex';
import {IAppState} from '@/store/modules/App';
import {IGameSettingsState} from '@/store/modules/GameSettings';
import {IGamePlayState} from '@/store/modules/GamePlay';
import {ISettings} from '@/store/modules/Settings';

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
  settings: ISettings;
  gameSettings: IGameSettingsState;
  gamePlay: IGamePlayState;
  // user: IUserState
  // errorLog: IErrorLogState
  // permission: IPermissionState
  // settings: ISettingsState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
