import { createStore } from 'vuex';
import { IAppState } from '@/store/modules/App';
import { IGameSettingsState } from '@/store/modules/GameSettings';
import { ISettingsState } from '@/store/modules/Settings';
import { IGameState } from '@/store/modules/Game';

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
export default createStore<IRootState>({});
