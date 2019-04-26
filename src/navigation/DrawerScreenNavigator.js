import { createDrawerNavigator } from 'react-navigation';
import MainAppNavigator from './MainAppNavigator';
import NavigationDrawer from '../pages/NavigationDrawer';

const DrawerScreenNavigator = createDrawerNavigator(
  {
    MainAppNavigator,
  },
  {
    contentComponent: NavigationDrawer,
  }
);

export default DrawerScreenNavigator;
