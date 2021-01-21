import { LoginActionTypes } from './types_reducer';
import { APP_INIT, SIGN_IN, SIGN_OUT } from '../utils/constant_util';
import request from '../utils/request_util';

const appInit = (): LoginActionTypes => {
  return { type: APP_INIT };
};

const signIn = async (
  email: string,
  password: string
): Promise<LoginActionTypes> => {
  try {
    const response = await request.post('/login', { email, password });
    if (response.status === 200) {
      return Promise.resolve({ type: SIGN_IN, payload: response.data.data });
    }

    return Promise.reject({ type: SIGN_OUT });
  } catch (e) {
    return Promise.reject({
      type: SIGN_OUT,
      message: e.response.data.message ?? 'Sorry something went wrong'
    });
  }
};

const signOut = (): LoginActionTypes => {
  return { type: SIGN_OUT };
};

export { appInit, signIn, signOut };
