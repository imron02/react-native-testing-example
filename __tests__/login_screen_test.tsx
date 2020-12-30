import 'react-native';
import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor
} from '@testing-library/react-native';

import LoginScreen from '../src/screens/login_screen';

let mockProps: any = { navigation: { navigate: jest.fn() } };

const setup = () => render(<LoginScreen {...mockProps} />);

let wrapper: RenderAPI;
beforeEach(() => {
  wrapper = setup();
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
  it('on login success', async () => {
    const { getByPlaceholderText, getByTestId } = wrapper;
    const email = getByPlaceholderText('Input email');
    const pass = getByPlaceholderText('Input password');

    fireEvent.changeText(email, 'test@mail.com');
    fireEvent.changeText(pass, 'password');
    fireEvent.press(getByTestId('btn-login'));

    await waitFor(() => {
      expect(mockProps.navigation.navigate).toHaveBeenCalledWith('Home');
    });
  });
});
