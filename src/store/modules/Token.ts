import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {LocalItem} from '@/store/LocalItem';
import {IUser, IRegisterInput} from '@/store/types/Auth';

interface IRegisterResult {
  user: IUser;
  token: string;
}

export interface ITokenState {
  token: string;
}

@Module({
  namespaced: true,
  dynamic: true,
  name: 'token',
  store,
})
export class TokenModule extends VuexModule implements ITokenState {

  private _token = new LocalItem<string>('authorization', '');

  get token() {
    return this._token.value;
  }

  @Action
  public changeToken(token: string) {
    this.CHANGE_TOKEN(token);
  }

  @Mutation
  private CHANGE_TOKEN(token: string) {
    this._token.value = token;
    this._token.save();
  }

}

export const tokenModule = getModule(TokenModule);
