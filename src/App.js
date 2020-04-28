import 'react-native-gesture-handler';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider, theme } from './theme';
import RootNavigator from './navigation';
import store from './store';
import { initializeApp } from './store/actions';

store.dispatch(initializeApp());

const App = () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <RootNavigator />
    </ThemeProvider>
  </StoreProvider>
);

export default App;
