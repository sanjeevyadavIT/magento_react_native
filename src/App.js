import 'react-native-gesture-handler';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { TYPOGRAPHY } from './constants';
import { ThemeProvider, lightTheme as theme } from './theme';
import RootNavigator from './navigation';
import store from './store';

const App = () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <RootNavigator />
      <FlashMessage position="top" titleStyle={TYPOGRAPHY.flashMessageTitle} />
    </ThemeProvider>
  </StoreProvider>
);

export default App;
