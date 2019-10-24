import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {GamePlayModel} from '@/model/Game/GamePlay';
import {GameCreateModel} from '@/model/Game/GameCreate';
import {GameMode, GameModel} from '@/model/Game/GameModel';

export interface IGamePlayState {
  gameModel: GameModel;
}

@Module({
  namespaced: true,
  dynamic: true,
  name: 'gamePlay',
  store,
})
export class GamePlayModule extends VuexModule implements IGamePlayState {
  private _gameCreateModel = new GameCreateModel();
  private _gameMode = GameMode.Play;

  private _gamePlayModel: GamePlayModel = new GamePlayModel();

  get gameModel() {
    return this._gameMode === GameMode.Create ? this._gameCreateModel : this._gamePlayModel;
  }

  @Action
  public changeGameMode(gameMode: GameMode) {
    this.CHANGE_GAME_MODE(gameMode);
  }

  @Mutation
  public CHANGE_GAME_MODE(gameMode: GameMode) {
    this._gameMode = gameMode;
  }
}

export const gamePlayModule = getModule(GamePlayModule);
