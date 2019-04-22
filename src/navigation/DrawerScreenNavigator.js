import { createDrawerNavigator } from 'react-navigation';
import MainAppNavigator from './MainAppNavigator';
import NavigationDrawer from '../containers/NavigationDrawer';

const DrawerScreenNavigator = createDrawerNavigator(
  {
    MainAppNavigator,
  },
  {
    contentComponent: NavigationDrawer,
  }
);

export default DrawerScreenNavigator;
