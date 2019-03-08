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
import { Navigator } from './navigation/Navigator';
import store from './store';

class App extends Component{
  render() {
    return (
      <Provider store ={store}>
        <Navigator/>
      </Provider>
    );
  }
}

export default App;
