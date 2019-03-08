import { createStackNavigator, createAppContainer } from 'react-navigation';
import DashboardScreen from '../containers/Dashboard';
import DetailScreen from '../containers/DetailScreen';

const Navigator = createStackNavigator(
  {
    DashboardScreen,
    DetailScreen
  }
)

const RootStack = createAppContainer(Navigator)

export default RootStack;
