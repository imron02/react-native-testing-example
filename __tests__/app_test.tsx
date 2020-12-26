import 'react-native';
import React from 'react';

import App from '../App';
import { act, render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

it('renders correctly', async () => {
  const { getByRole } = render(<App />);
  const header = getByRole('header');

  await act(async () => {
    expect(header).toHaveTextContent('Login');
  });
});
