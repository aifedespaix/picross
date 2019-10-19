import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {gameSettingsModule} from '@/store/modules/GameSettings';
import {SquareState} from '@/components/Picross/Square/SquareState';
import {GameSounds} from '@/store/modules/GameSounds';

@Module({
  dynamic: true,
  name: 'sound',
  store,
})
export class Sound extends VuexModule {

  @Action
  public async playSound(sound: HTMLAudioElement) {
    if (gameSettingsModule.activateAudio.value) {
      sound.currentTime = 0;
      await sound.play();
    }
  }

  @Action
  public async playSquareStateSound(squareState: SquareState) {
    switch (squareState) {
      case SquareState.Close:
        await this.playSound(GameSounds.STATE_CLOSE);
        break;
      case SquareState.Empty:
        await this.playSound(GameSounds.STATE_EMPTY);
        break;
      case SquareState.Value:
        await this.playSound(GameSounds.STATE_VALUE);
        break;
    }
  }

}

export const soundModule = getModule(Sound);
