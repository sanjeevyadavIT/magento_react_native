import { createStackNavigator } from 'react-navigation';
import DashboardScreen from '../containers/Dashboard';
import CategoryTree from '../components/catalog/CategoryTree';
import CategoryList from '../components/catalog/CategoryList';
import Product from '../components/catalog/Product';
import SearchScreen from '../components/search/SearchScreen';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import {
  NAVIGATION_CATEGORY_TREE_PATH,
  NAVIGATION_CATEGORY_PATH,
  NAVIGATION_SEARCH_SCREEN_PATH,
  NAVIGATION_LOGIN_SCREEN_PATH,
  NAVIGATION_SIGNUP_SCREEN_PATH,
} from './types';


const MainAppNavigator = createStackNavigator(
  {
    DashboardScreen,
    [NAVIGATION_CATEGORY_TREE_PATH]: CategoryTree,
    [NAVIGATION_CATEGORY_PATH]: CategoryList,
    [NAVIGATION_SEARCH_SCREEN_PATH]: SearchScreen,
    [NAVIGATION_LOGIN_SCREEN_PATH]: Login,
    [NAVIGATION_SIGNUP_SCREEN_PATH]: Signup,
    product: Product
  }
);

export default MainAppNavigator;
