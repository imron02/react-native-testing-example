import React from 'react';
import { render as rtlRender } from '@testing-library/react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from '../redux/root_reducer';

const render = (
  ui: React.ReactElement,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  }: any = {}
) => {
  const Wrapper = ({ children }: { children: any }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

const storeFactory = (initialState: Object = {}) => {
  return createStore(reducer, initialState);
};

export * from '@testing-library/react-native';
export { render, storeFactory };
