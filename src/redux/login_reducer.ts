import { LoginActionTypes, LoginState } from './types_reducer';

export const initialState: LoginState = {
  isLoading: true,
  isSignOut: false,
  email: null,
  userToken: null
};

export default (state = initialState, action: LoginActionTypes): LoginState => {
  switch (action.type) {
    case 'APP_INIT':
      return {
        ...state,
        isLoading: false
      };
    case 'SIGN_IN':
      return {
        ...state,
        isLoading: false,
        email: action.payload.email,
        userToken: action.payload.token,
        isSignOut: false
      };
    case 'SIGN_OUT':
      return {
        ...state,
        email: null,
        userToken: null,
        isSignOut: true
      };
    default:
      return state;
  }
};
