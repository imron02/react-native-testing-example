import { APP_INIT, SIGN_IN, SIGN_OUT } from '../utils/constant_util';

export interface LoginState {
  isLoading: boolean;
  isSignOut: boolean;
  email: string | null;
  userToken: string | null;
}

interface AppInitAction {
  type: typeof APP_INIT;
}

interface SignInAction {
  type: typeof SIGN_IN;
  payload: {
    email: string;
    token: string;
  };
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

export type LoginActionTypes = AppInitAction | SignInAction | SignOutAction;
