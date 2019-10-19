import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {Theme} from '@/components/Theme/theme';
import {ThemeEnum} from '@/components/Theme/theme.enum';

export interface ISettings {
  theme: Theme;
}

@Module({
  namespaced: true,
  dynamic: true,
  name: 'settings',
  store,
})
export class Settings extends VuexModule implements ISettings {
  private _theme = new Theme();

  get theme(): Theme {
    return this._theme;
  }

  @Action
  public changeTheme(theme: ThemeEnum) {
    this.theme.actualTheme = theme;
  }

}

export const settingsModule = getModule(Settings);
