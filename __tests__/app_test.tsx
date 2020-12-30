import 'react-native';
import React from 'react';

import App from '../App';
import { render, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

it('renders correctly', async () => {
  const { getByRole } = render(<App />);
  const header = await waitFor(() => getByRole('header'));

  expect(header).toHaveTextContent('Login');
});
