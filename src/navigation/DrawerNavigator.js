import { createDrawerNavigator } from 'react-navigation';
import MainAppNavigator from './MainAppNavigator';
import { DrawerPage } from '../components';

const DrawerNavigator = createDrawerNavigator(
  {
    MainAppNavigator,
  },
  {
    contentComponent: DrawerPage,
  }
);

export default DrawerNavigator;
