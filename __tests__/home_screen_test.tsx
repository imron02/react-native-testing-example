import 'react-native';
import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import Snackbar from 'react-native-snackbar';

import HomeScreen from '../src/screens/home_screen';

const setup = () => render(<HomeScreen />);

describe('render all ui correctly', () => {
  let wrapper: RenderAPI;
  beforeEach(() => {
    wrapper = setup();
  });

  it('renders correctly', () => {
    const { getByTestId } = wrapper;
    const element = getByTestId('component-app');
    expect(element).toBeTruthy();
  });

  test('renders button increment', () => {
    const { getByText } = wrapper;
    const element = getByText('Increment counter');
    expect(element).toBeTruthy();
  });

  test('renders counter display', () => {
    const { getByTestId } = wrapper;
    const element = getByTestId('counter-display');
    expect(element).toBeTruthy();
  });

  test('renders button decrement', () => {
    const { getByText } = wrapper;
    const element = getByText('Decrement counter');
    expect(element).toBeTruthy();
  });
});

describe('test increment', () => {
  let wrapper: RenderAPI;
  beforeEach(() => {
    wrapper = setup();
  });

  test('no error message', () => {
    expect(Snackbar.show).not.toHaveBeenCalled();
  });

  test('counter starts at 0', () => {
    const { getByTestId } = wrapper;
    const element = getByTestId('counter-display');
    expect(element).toHaveTextContent('The count is 0');
  });

  test('clicking on button increments counter display ', () => {
    const { getByTestId, getByText } = wrapper;
    fireEvent.press(getByText('Increment counter'));
    const element = getByTestId('counter-display');
    expect(element).toHaveTextContent('The count is 1');
  });
});

describe('test decrement', () => {
  let wrapper: RenderAPI;
  beforeEach(() => {
    wrapper = setup();
  });

  test('clicking on button decrements counter display', () => {
    const { getByTestId, getByText } = wrapper;
    let element;

    // increment counter and counter is 1
    fireEvent.press(getByText('Increment counter'));
    // decrement counter and counter is 0
    fireEvent.press(getByText('Decrement counter'));

    element = getByTestId('counter-display');
    expect(element).toHaveTextContent('The count is 0');
  });

  test('decrement below zero and counter stay at zero', () => {
    const { getByTestId, getByText } = wrapper;
    fireEvent.press(getByText('Decrement counter'));
    const element = getByTestId('counter-display');
    expect(element).toHaveTextContent('The count is 0');
  });

  test('decrement below zero, show error message', () => {
    const { getByText } = wrapper;
    fireEvent.press(getByText('Decrement counter'));
    expect(Snackbar.show).toHaveBeenCalled();
  });
});
