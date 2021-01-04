import { LoginActionTypes } from './types_reducer';
import { APP_INIT, SIGN_IN, SIGN_OUT } from '../utils/constant_util';

const appInit = (): LoginActionTypes => {
  return { type: APP_INIT };
};

const signIn = (token: string): LoginActionTypes => {
  return { type: SIGN_IN, payload: token };
};

const signOut = (): LoginActionTypes => {
  return { type: SIGN_OUT };
};

export { appInit, signIn, signOut };
