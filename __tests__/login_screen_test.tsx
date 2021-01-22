import 'react-native';
import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor
} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import * as redux from 'react-redux';

import { storeFactory } from '../src/utils/test_util';
import { SIGN_IN, SIGN_OUT } from '../src/utils/constant_util';
import LoginScreen from '../src/screens/login_screen';
import request from '../src/utils/request_util';

jest.mock('../src/utils/request_util');
const mockAxios = (response: Object) => {
  (request.post as jest.Mock).mockResolvedValueOnce(response);
};
const mockAxiosCatch = (response: Object) => {
  (request.post as jest.Mock).mockRejectedValueOnce(response);
};
const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
const mockDispatchFn = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatchFn);

const store = storeFactory();
const setup = () => {
  return render(
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  );
};

let wrapper: RenderAPI;
beforeEach(() => {
  wrapper = setup();
});

beforeEach(() => {
  useDispatchSpy.mockClear();
});

describe('renders all ui correctly', () => {
  it('render username input', () => {
    const { getByPlaceholderText } = wrapper;
    const element = getByPlaceholderText('Input email');
    expect(element).toBeTruthy();
  });

  it('render password input', () => {
    const { getByPlaceholderText } = wrapper;
    const element = getByPlaceholderText('Input password');
    expect(element).toBeTruthy();
  });

  it('render button login', () => {
    const { getByTestId } = wrapper;
    const element = getByTestId('btn-login');
    expect(element).toBeTruthy();
  });
});

describe('fire change text event', () => {
  it('onChangeText email', async () => {
    const changeText = 'test@mail.com';
    const { getByPlaceholderText } = wrapper;

    const element = getByPlaceholderText('Input email');
    fireEvent.changeText(element, changeText);
    await waitFor(() => expect(element.props.value).toBe(changeText));
  });

  it('onChangeText password', async () => {
    const changeText = 'password';
    const { getByPlaceholderText } = wrapper;

    const element = getByPlaceholderText('Input password');
    fireEvent.changeText(element, changeText);
    await waitFor(() => expect(element.props.value).toBe(changeText));
  });
});

describe('disabled button login', () => {
  it('button login disabled if email & password is empty', async () => {
    const { getByTestId } = wrapper;
    const element = getByTestId('btn-login');

    expect(element).toBeDisabled();
  });

  it('button login disabled if email is empty and password not empty', async () => {
    const changeText = 'password';
    const { getByPlaceholderText, getByTestId } = wrapper;

    const element = getByPlaceholderText('Input password');
    fireEvent.changeText(element, changeText);
    await waitFor(() => expect(getByTestId('btn-login')).toBeDisabled());
  });

  it('button login disabled if email not empty and password is empty', async () => {
    const changeText = 'test@mail.com';
    const { getByPlaceholderText, getByTestId } = wrapper;

    const element = getByPlaceholderText('Input email');
    fireEvent.changeText(element, changeText);
    await waitFor(() => expect(getByTestId('btn-login')).toBeDisabled());
  });

  it('button login disabled if email format is wrong', async () => {
    const { getByPlaceholderText, getByTestId } = wrapper;

    const email = getByPlaceholderText('Input email');
    const pass = getByPlaceholderText('Input password');

    fireEvent.changeText(email, 'email');
    fireEvent.changeText(pass, 'password');
    await waitFor(() => {
      expect(getByTestId('btn-login')).toBeDisabled();
    });
  });

  it('button login disabled if password format is wrong', async () => {
    const { getByPlaceholderText, getByTestId } = wrapper;

    const email = getByPlaceholderText('Input email');
    const pass = getByPlaceholderText('Input password');

    fireEvent.changeText(email, 'test@mail.com');
    fireEvent.changeText(pass, 'p');
    await waitFor(() => {
      expect(getByTestId('btn-login')).toBeDisabled();
    });
  });

  it('button enable if all input is right', async () => {
    const { getByPlaceholderText, getByTestId } = wrapper;
    const email = getByPlaceholderText('Input email');
    const pass = getByPlaceholderText('Input password');

    fireEvent.changeText(email, 'test@mail.com');
    fireEvent.changeText(pass, 'password');

    await waitFor(() => {
      expect(getByTestId('btn-login')).toBeEnabled();
    });
  });
});

describe('login flow', () => {
  const user = { email: 'test@mail.com', password: 'P4ssw0rd' };
  const token = 'dummy-token';
  const errorMessage = 'login failed, user not found';
  const errorResponse = {
    status: 404,
    response: {
      data: { message: errorMessage }
    }
  };

  it('on login success', async () => {
    const response = {
      status: 200,
      message: 'login success',
      data: {
        data: { email: user.email, token }
      }
    };
    mockAxios(response);
    const { getByPlaceholderText, getByTestId } = wrapper;
    const email = getByPlaceholderText('Input email');
    const pass = getByPlaceholderText('Input password');

    fireEvent.changeText(email, user.email);
    fireEvent.changeText(pass, user.password);
    fireEvent.press(getByTestId('btn-login'));

    await waitFor(() => {
      expect(mockDispatchFn).toHaveBeenCalledWith({
        type: SIGN_IN,
        payload: {
          email: user.email,
          token
        }
      });
    });
  });

  it('login failure with wrong email, show snackbar', async () => {
    mockAxiosCatch(errorResponse);
    const { getByPlaceholderText, getByTestId } = wrapper;
    const email = getByPlaceholderText('Input email');
    const pass = getByPlaceholderText('Input password');

    fireEvent.changeText(email, 'wrong@mail.com');
    fireEvent.changeText(pass, user.password);
    fireEvent.press(getByTestId('btn-login'));

    await waitFor(() => {
      expect(Snackbar.show).toHaveBeenCalledWith({
        text: 'login failed, user not found',
        duration: Snackbar.LENGTH_SHORT
      });
      expect(mockDispatchFn).toHaveBeenCalledWith({
        type: SIGN_OUT
      });
    });
  });

  it('login failure with wrong password, show snackbar', async () => {
    mockAxiosCatch(errorResponse);
    const { getByPlaceholderText, getByTestId } = wrapper;
    const email = getByPlaceholderText('Input email');
    const pass = getByPlaceholderText('Input password');

    fireEvent.changeText(email, user.email);
    fireEvent.changeText(pass, 'user.password');
    fireEvent.press(getByTestId('btn-login'));

    await waitFor(() => {
      expect(Snackbar.show).toHaveBeenCalledWith({
        text: 'login failed, user not found',
        duration: Snackbar.LENGTH_SHORT
      });
      expect(mockDispatchFn).toHaveBeenCalledWith({
        type: SIGN_OUT
      });
    });
  });
});
