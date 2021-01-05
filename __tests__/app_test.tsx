import 'react-native';
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import '@testing-library/jest-native/extend-expect';

import App, { RootNav } from '../App';
import { render as customRender } from '../src/utils/test_util';

it('renders correctly', async () => {
  const { getByTestId } = render(<App />);
  const header = getByTestId('splash-text');

  await waitFor(() => {
    expect(header).toHaveTextContent('Loading..');
  });
});

describe('test redux', () => {
  // Store getState() not working in here because store from import above is
  // different with store inside customRender

  const setup = (initialState?: Object) =>
    customRender(
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>,
      { initialState }
    );

  it('show splash screen if isLoading true', async () => {
    const { getByText } = setup({ login: { isLoading: true } });

    await waitFor(() => {
      expect(getByText('Loading..')).toBeTruthy();
    });
  });

  it('show login screen if isLoading false', async () => {
    const { getByRole } = setup({ login: { isLoading: false } });

    await waitFor(() => {
      expect(getByRole('header')).toHaveTextContent('Login');
    });
  });

  it('show home screen if userToken not null', async () => {
    const { getByRole } = setup({ login: { userToken: 'dummy-token' } });

    await waitFor(() => {
      expect(getByRole('header')).toHaveTextContent('Home');
    });
  });

  it('should useEffect is called', async () => {
    const useEffect = jest.spyOn(React, 'useEffect');
    setup();

    await waitFor(() => {
      expect(useEffect).toHaveBeenCalled();
    });
  });
});
