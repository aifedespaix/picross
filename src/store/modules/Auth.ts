import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IUser, IRegisterInput} from '@/store/types/Auth';
import {graphqlClient} from '@/store/api';
import {tokenModule} from '@/store/modules/Token';

export interface ILoginInput {
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

  @Action public logout() {
    tokenModule.changeToken('');
    this.CHANGE_LOGGED(false);
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
  public async login(user: ILoginInput) {
    const mutation = `mutation login($email: String $password: String) {
      login(email: $email password: $password) {
        token
        user {
          id
          name
          email
        }
      }
    }`;
    try {
      const {login} = await graphqlClient.request<{ login: IRegisterResult }>(mutation, user);
      this.CHANGE_USER(login.user);
      tokenModule.changeToken(login.token);
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
