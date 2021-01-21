import loginReducer, { initialState } from '../src/redux/login_reducer';
import { APP_INIT, SIGN_IN, SIGN_OUT } from '../src/utils/constant_util';
import { LoginActionTypes } from '../src/redux/types_reducer';

describe('login reducer', () => {
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
    const action: LoginActionTypes = {
      type: SIGN_IN,
      payload: {
        email: 'test@mail.com',
        token: dummyToken
      }
    };
    const newState = loginReducer(undefined, action);
    expect(newState).toEqual({
      isLoading: false,
      isSignOut: false,
      email: action.payload.email,
      userToken: action.payload.token
    });
  });

  it('returns isSignOut true and userToken null upon receiving an action type SIGN_OUT', () => {
    const newState = loginReducer(initialState, { type: SIGN_OUT });
    expect(newState).toEqual({
      ...initialState,
      email: null,
      userToken: null,
      isSignOut: true
    });
  });
});
