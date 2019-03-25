import { createStackNavigator, createAppContainer } from 'react-navigation';
import DashboardScreen from '../containers/Dashboard';
import CategoryTree from '../components/catalog/CategoryTree';
import CategoryList from '../components/catalog/CategoryList';
import Product from '../components/catalog/Product';
import {
  NAVIGATION_CATEGORY_TREE_PATH,
  NAVIGATION_CATEGORY_PATH,
} from './types';


const HomeStack = createStackNavigator(
  {
    DashboardScreen,
    [NAVIGATION_CATEGORY_TREE_PATH]: CategoryTree,
    [NAVIGATION_CATEGORY_PATH]: CategoryList,
    product: Product
  }
);

const Navigator = createAppContainer(HomeStack);

export default Navigator;
