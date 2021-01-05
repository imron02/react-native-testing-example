import { LoginActionTypes, LoginState } from './types_reducer';

export const initialState: LoginState = {
  isLoading: true,
  isSignOut: false,
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
        isSignOut: false,
        userToken: action.payload
      };
    case 'SIGN_OUT':
      return {
        ...state,
        userToken: null,
        isSignOut: true
      };
    default:
      return state;
  }
};
