import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {GamePlayModel} from '@/model/Game/GamePlay';
import {GameCreateModel} from '@/model/Game/GameCreate';
import {GameMode, GameModel} from '@/model/Game/GameModel';
import {SquareState} from '@/model/Square/SquareState';

export interface IGameState {
  gameModel: GameModel;
}

@Module({
  namespaced: true,
  dynamic: true,
  name: 'gamePlay',
  store,
})
export class GameModule extends VuexModule implements IGameState {
  private _gameCreateModel: GameCreateModel = new GameCreateModel();
  private _gamePlayModel: GamePlayModel = new GamePlayModel();

  private _gameModel: GameModel = this._gamePlayModel;

  get gameModel() {
    return this._gameModel;
  }

  private _gameMode = GameMode.Play;

  get gameMode(): GameMode {
    return this._gameMode;
  }

  @Action
  public resetGamePlayModelState() {
    this._gamePlayModel.actualState = SquareState.Value;
  }

  @Action({rawError: true})
  public changeGameMode(gameMode: GameMode) {
    this.CHANGE_GAME_MODE(gameMode);
    switch (gameMode) {
      case GameMode.Create:
        this.CHANGE_GAME_MODEL(this._gameCreateModel);
        break;
      case GameMode.Play:
        this.CHANGE_GAME_MODEL(this._gamePlayModel);
        break;
    }
  }

  @Mutation
  public CHANGE_GAME_MODE(gameMode: GameMode) {
    this._gameMode = gameMode;
  }

  @Mutation
  public CHANGE_GAME_MODEL(gameModel: GameModel) {
    this._gameModel = gameModel;
  }

}

export const gameModule = getModule(GameModule);
