/**
 * Shared authentication-related TypeScript interfaces.
 */
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
