import { createStackNavigator, createAppContainer } from 'react-navigation';
import DashboardScreen from '../containers/Dashboard';
import CategoryTree from '../components/catalog/CategoryTree';
import CategoryList from '../components/catalog/CategoryList';
import Product from '../components/catalog/Product';
import SearchScreen from '../components/search/SearchScreen';
import {
  NAVIGATION_CATEGORY_TREE_PATH,
  NAVIGATION_CATEGORY_PATH,
  NAVIGATION_SEARCH_SCREEN_PATH,
} from './types';


const HomeStack = createStackNavigator(
  {
    DashboardScreen,
    [NAVIGATION_CATEGORY_TREE_PATH]: CategoryTree,
    [NAVIGATION_CATEGORY_PATH]: CategoryList,
    [NAVIGATION_SEARCH_SCREEN_PATH]: SearchScreen,
    product: Product
  }
);

const Navigator = createAppContainer(HomeStack);

export default Navigator;
