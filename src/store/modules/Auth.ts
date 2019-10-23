import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IRegisterInput, IUser} from '@/store/modules/Auth';
import {graphqlClient} from '@/store/api';
import {tokenModule} from '@/store/modules/Token';

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IRegisterInput {
  username: string;
  email: string;
  password: string;
}

interface IRegisterResult {
  user: IUser;
  token: string;
}

export interface IAuthState {
  user: IUser;
  logged: boolean;
}

@Module({
  namespaced: true,
  dynamic: true,
  name: 'auth',
  store,
})
export class AuthModule extends VuexModule {
  private _user = {} as IUser;

  get user(): IUser {
    return this._user;
  }

  private _logged = false;

  get logged(): boolean {
    return this._logged;
  }

  @Action
  public async register(user: IRegisterInput) {
    const mutation =
      `mutation register($username: String $email: String $password: String) {
          signup(name: $username email: $email password: $password) {
            token
            user {
              id
              name
              email
            }
          }
        }`;
    try {
      const {signup} = await graphqlClient.request<{ signup: IRegisterResult }>(mutation, user);
      tokenModule.changeToken(signup.token);
      this.CHANGE_USER(signup.user);
      this.CHANGE_LOGGED(true);
    } catch (e) {
      return false;
    }

    return true;
  }

  @Action
  public async loadProfile() {
    const query = `{
      me {
        id
        name
        email
      }
    }`;
    try {
      const {me} = await graphqlClient.request<{ me: IUser }>(query);
      this.CHANGE_USER(me);
      this.CHANGE_LOGGED(true);
    } catch (e) {
      tokenModule.changeToken('');
      this.CHANGE_LOGGED(false);
    }
  }

  @Mutation
  private CHANGE_USER(user: IUser) {
    this._user = user;
  }

  @Mutation
  private CHANGE_LOGGED(logged: boolean) {
    this._logged = logged;
  }

}

export const authModule = getModule(AuthModule);
