import 'react-native';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Snackbar from 'react-native-snackbar';

import App from '../App';

const setup = () => render(<App />);

it('renders correctly', () => {
  const { getByTestId } = setup();
  const element = getByTestId('component-app');
  expect(element).toBeTruthy();
});

test('renders button increment', () => {
  const { getByText } = setup();
  const element = getByText('Increment counter');
  expect(element).toBeTruthy();
});

test('renders counter display', () => {
  const { getByTestId } = setup();
  const element = getByTestId('counter-display');
  expect(element).toBeTruthy();
});

test('no error message', () => {
  setup();
  expect(Snackbar.show).not.toHaveBeenCalled();
});

test('counter starts at 0', () => {
  const { getByTestId } = setup();
  const element = getByTestId('counter-display');
  // @ts-ignore
  expect(element).toHaveTextContent('The count is 0');
});

test('clicking on button increments counter display ', () => {
  const { getByTestId, getByText } = setup();
  fireEvent.press(getByText('Increment counter'));
  const element = getByTestId('counter-display');
  // @ts-ignore
  expect(element).toHaveTextContent('The count is 1');
});

test('renders button decrement', () => {
  const { getByText } = setup();
  const element = getByText('Decrement counter');
  expect(element).toBeTruthy();
});

test('clicking on button decrements counter display', () => {
  const { getByTestId, getByText } = setup();
  let element;

  // increment counter and counter is 1
  fireEvent.press(getByText('Increment counter'));
  // decrement counter and counter is 0
  fireEvent.press(getByText('Decrement counter'));

  element = getByTestId('counter-display');
  // @ts-ignore
  expect(element).toHaveTextContent('The count is 0');
});

test('decrement below zero and counter stay at zero', () => {
  const { getByTestId, getByText } = setup();
  fireEvent.press(getByText('Decrement counter'));
  const element = getByTestId('counter-display');
  // @ts-ignore
  expect(element).toHaveTextContent('The count is 0');
});

test('decrement below zero, show error message', () => {
  const { getByText } = setup();
  fireEvent.press(getByText('Decrement counter'));
  expect(Snackbar.show).toHaveBeenCalled();
});
