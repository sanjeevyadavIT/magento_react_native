import 'react-native-gesture-handler';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider, lightTheme as theme } from './theme';
import RootNavigator from './navigation';
import store from './store';

require('react-native').unstable_enableLogBox();

const App = () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <RootNavigator />
    </ThemeProvider>
  </StoreProvider>
);

export default App;
