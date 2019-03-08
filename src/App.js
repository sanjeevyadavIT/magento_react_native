/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { Provider } from 'react-redux';
import RootStack from './navigation/RootStack';
import store from './store';

class App extends Component{
  render() {
    return (
      <Provider store ={store}>
        <RootStack/>
      </Provider>
    );
  }
}

export default App;
