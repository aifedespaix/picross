import Vue from 'vue';
import Vuex from 'vuex';
import {IAppState} from '@/store/modules/App';
import {IGameSettingsState} from '@/store/modules/GameSettings';
import {ISettingsState} from '@/store/modules/Settings';
import {IGameState} from '@/store/modules/Game';

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
  settings: ISettingsState;
  gameSettings: IGameSettingsState;
  game: IGameState;
  // user: IUserState
  // errorLog: IErrorLogState
  // permission: IPermissionState
  // settings: ISettingsState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
