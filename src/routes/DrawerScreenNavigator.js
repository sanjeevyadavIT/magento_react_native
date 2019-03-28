import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import MainAppNavigator from './MainAppNavigator';
import NavigationDrawer from '../containers/NavigationDrawer';

const DrawerScreenNavigator = createDrawerNavigator(
  {
    MainAppNavigator,
  },
  {
    contentComponent: props => <NavigationDrawer {...props} />,
  }
);

export default DrawerScreenNavigator;
