import 'react-native';
import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';

import LoginScreen from '../src/screens/login_screen';

let mockProps: any = { navigation: { navigate: jest.fn() } };

const setup = () => render(<LoginScreen {...mockProps} />);

describe('renders all ui correctly', () => {
  let wrapper: RenderAPI;
  beforeEach(() => {
    wrapper = setup();
  });

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
  let wrapper: RenderAPI;
  beforeEach(() => {
    wrapper = setup();
  });

  it('onChangeText email', async () => {
    const changeText = 'test@mail.com';
    const { getByPlaceholderText } = wrapper;

    const element = getByPlaceholderText('Input email');
    fireEvent.changeText(element, changeText);

    expect(element.props.value).toBe(changeText);
  });

  it('onChangeText password', async () => {
    const changeText = 'password';
    const { getByPlaceholderText } = wrapper;

    const element = getByPlaceholderText('Input password');
    fireEvent.changeText(element, changeText);

    expect(element.props.value).toBe(changeText);
  });
});
