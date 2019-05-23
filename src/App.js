import React from 'react';
import { Provider } from 'react-redux';
import Navigator from './navigation';
import NavigationService from './navigation/NavigationService';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Navigator
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  </Provider>
);

export default App;
