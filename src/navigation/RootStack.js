import { createStackNavigator } from 'react-navigation';
import DashboardScreen from '../containers/Dashboard';
import DetailScreen from '../containers/DetailScreen';

const Navigator = createStackNavigator(
  {
    DashboardScreen,
    DetailSreen
  }
)

const RootStack = createAppContainer(RootStack)

export default RootStack;
