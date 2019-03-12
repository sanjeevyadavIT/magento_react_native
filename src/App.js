import React, {Component} from 'react';
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
