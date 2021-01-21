import { appInit, signIn, signOut } from '../src/redux/login_action';
import { APP_INIT, SIGN_IN, SIGN_OUT } from '../src/utils/constant_util';
import request from '../src/utils/request_util';

jest.mock('../src/utils/request_util');

const mockAxios = (response: Object) => {
  (request.post as jest.Mock).mockResolvedValueOnce(response);
};
const mockAxiosCatch = (response: Object) => {
  (request.post as jest.Mock).mockRejectedValueOnce(response);
};

describe('login action', () => {
  const user = { email: 'test@mail.com', password: 'P4ssw0rd' };
  const token = 'dummy-token';

  const errorMessage = 'login failed, user not found';
  const errorResponse = {
    status: 404,
    response: {
      data: { message: errorMessage }
    }
  };

  it('returns action with type APP_INIT', () => {
    const action = appInit();
    expect(action).toEqual({ type: APP_INIT });
  });

  it('returns action with type SIGN_IN', async () => {
    const response = {
      status: 200,
      data: {
        message: 'login success',
        data: { ...user, token }
      }
    };
    mockAxios(response);
    const action = await signIn(user.email, user.password);
    expect(action).toEqual({ type: SIGN_IN, payload: response.data.data });
  });

  it('return sign out if wrong email', async () => {
    mockAxiosCatch(errorResponse);
    return signIn('user.email', user.password).catch((e) => {
      expect(e).toEqual({ type: SIGN_OUT, message: errorMessage });
    });
  });

  it('return sign out if wrong password', async () => {
    mockAxiosCatch(errorResponse);
    return signIn(user.email, 'user.password').catch((e) => {
      expect(e).toEqual({ type: SIGN_OUT, message: errorMessage });
    });
  });

  it('return sign out if wrong email and password', async () => {
    mockAxiosCatch(errorResponse);
    return signIn('user.email', 'user.password').catch((e) => {
      expect(e).toEqual({ type: SIGN_OUT, message: errorMessage });
    });
  });

  it('returns action with type SIGN_OUT', () => {
    const action = signOut();
    expect(action).toEqual({ type: SIGN_OUT });
  });
});
