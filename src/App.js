import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Provider } from 'react-redux';
import Navigator from './navigation/routes';
import store from './config/store';

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);


export default App;
