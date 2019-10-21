import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

export interface IAuth {
  login: string;
  password: string;
}

/**
 * todo do
 */
@Module({
  namespaced: true,
  dynamic: true,
  name: 'auth',
  store,
})
export class Auth extends VuexModule implements IAuth {
  private _login = '';

  get login(): string {
    return this._login;
  }

  private _password = '';

  get password(): string {
    return this._password;
  }

  @Mutation
  public changePassword(password: string) {
    this.CHANGE_PASSWORD(password);
  }

  @Mutation
  public changeLogin(login: string) {
    this.CHANGE_LOGIN(login);
  }

  @Action
  private CHANGE_PASSWORD(password: string) {
    this._password = password;
  }

  @Action
  private CHANGE_LOGIN(login: string) {
    this._login = login;
  }

}

export const authModule = getModule(Auth);
