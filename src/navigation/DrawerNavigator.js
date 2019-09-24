import { createDrawerNavigator } from 'react-navigation';
import MainAppNavigator from './MainAppNavigator';
import { DrawerScreen } from '../screens';

const DrawerNavigator = createDrawerNavigator(
  {
    MainAppNavigator,
  },
  {
    contentComponent: DrawerScreen,
  }
);

export default DrawerNavigator;
