import loginReducer from '../src/redux/login_reducer';
import { APP_INIT, SIGN_IN, SIGN_OUT } from '../src/utils/constant_util';

describe('login reducer', () => {
  const initialState = {
    isLoading: true,
    isSignOut: false,
    userToken: null
  };

  it('returns default initial state if no action passed', () => {
    // @ts-ignore
    const newState = loginReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('returns isLoading false upon receiving an action type APP_INIT', () => {
    const newState = loginReducer(initialState, { type: APP_INIT });
    expect(newState).toEqual({ ...initialState, isLoading: false });
  });

  it('returns user token & isSignOut false upon receiving an action type SIGN_IN', () => {
    const dummyToken = 'dummy-token';
    const newState = loginReducer(undefined, {
      type: SIGN_IN,
      payload: dummyToken
    });
    expect(newState).toEqual({
      ...initialState,
      userToken: dummyToken,
      isSignOut: false
    });
  });

  it('returns isSignOut true and userToken null upon receiving an action type SIGN_OUT', () => {
    const newState = loginReducer(initialState, { type: SIGN_OUT });
    expect(newState).toEqual({
      ...initialState,
      userToken: null,
      isSignOut: true
    });
  });
});
