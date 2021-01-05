import { appInit, signIn, signOut } from '../src/redux/login_action';
import { APP_INIT, SIGN_IN, SIGN_OUT } from '../src/utils/constant_util';

describe('login action', () => {
  it('returns action with type APP_INIT', () => {
    const action = appInit();
    expect(action).toEqual({ type: APP_INIT });
  });

  it('returns action with type SIGN_IN', () => {
    const token = 'dummy-token';
    const action = signIn(token);
    expect(action).toEqual({ type: SIGN_IN, payload: token });
  });

  it('returns action with type SIGN_OUT', () => {
    const action = signOut();
    expect(action).toEqual({ type: SIGN_OUT });
  });

  it('return sign out if token is empty', () => {
    const action = signIn('');
    expect(action).toEqual({ type: SIGN_OUT });
  });
});
