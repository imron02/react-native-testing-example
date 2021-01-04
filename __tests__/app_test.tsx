import 'react-native';
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import '@testing-library/jest-native/extend-expect';

import App from '../App';
import store from '../src/redux/store';

it('renders correctly', async () => {
  const { getByRole } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const header = await waitFor(() => getByRole('header'));

  expect(header).toHaveTextContent('Login');
});
