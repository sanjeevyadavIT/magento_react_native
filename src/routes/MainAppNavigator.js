import { createStackNavigator } from 'react-navigation';
import Dashboard from '../containers/Dashboard';
import CategoryTree from '../components/catalog/CategoryTree';
import CategoryList from '../containers/CategoryList';
import Product from '../components/catalog/Product';
import SearchScreen from '../components/search/SearchScreen';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import {
  NAVIGATION_HOME_PATH,
  NAVIGATION_CATEGORY_TREE_PATH,
  NAVIGATION_CATEGORY_LIST_PATH,
  NAVIGATION_SEARCH_SCREEN_PATH,
  NAVIGATION_LOGIN_SCREEN_PATH,
  NAVIGATION_SIGNUP_SCREEN_PATH,
} from './types';


const MainAppNavigator = createStackNavigator(
  {
    [NAVIGATION_HOME_PATH]: Dashboard,
    [NAVIGATION_CATEGORY_TREE_PATH]: CategoryTree,
    [NAVIGATION_CATEGORY_LIST_PATH]: CategoryList,
    [NAVIGATION_SEARCH_SCREEN_PATH]: SearchScreen,
    [NAVIGATION_LOGIN_SCREEN_PATH]: Login,
    [NAVIGATION_SIGNUP_SCREEN_PATH]: Signup,
    product: Product
  }
);

export default MainAppNavigator;
