import { createStackNavigator, createAppContainer } from 'react-navigation';
import DashboardScreen from '../containers/Dashboard';
import CategoryTree from '../components/catalog/CategoryTree';
import CategoryList from '../components/catalog/CategoryList';

const Navigator = createStackNavigator(
  {
    DashboardScreen,
    CategoryTree,
    category: CategoryList
  }
)

const RootStack = createAppContainer(Navigator)

export default RootStack;
