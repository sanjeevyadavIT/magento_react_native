import React from 'react';
import { Provider } from 'react-redux';
import Navigator from './routes';
import store from './config/store';

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App;
