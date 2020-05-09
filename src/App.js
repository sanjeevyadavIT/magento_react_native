import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider, lightTheme as theme } from './theme';
import RootNavigator from './navigation';
import store from './store';
import { initializeApp } from './store/actions';

// require('react-native')
//   .unstable_enableLogBox();

store.dispatch(initializeApp());

const App = () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <RootNavigator />
    </ThemeProvider>
  </StoreProvider>
);

// const App = () => <View style={{ flex: 1, height: 200, backgroundColor: 'pink' }}><Text>Hello</Text></View>

export default App;
