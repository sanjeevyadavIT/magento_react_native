import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import CategoryTree from '../components/catalog/CategoryTree';
import CategoryList from '../containers/CategoryList';
import Product from '../containers/Product';
import Search from '../containers/Search';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import WishList from '../containers/WishList';
import Account from '../containers/Account';
import Cart from '../containers/Cart';
import {
  defaultHeader,
  NAVIGATION_HOME_PATH,
  NAVIGATION_CATEGORY_TREE_PATH,
  NAVIGATION_CATEGORY_LIST_PATH,
  NAVIGATION_PRODUCT_DETAIL_PATH,
  NAVIGATION_SEARCH_SCREEN_PATH,
  NAVIGATION_LOGIN_SCREEN_PATH,
  NAVIGATION_SIGNUP_SCREEN_PATH,
  NAVIGATION_WISHLIST_SCREEN_PATH,
  NAVIGATION_ACCOUNT_SCREEN_PATH,
  NAVIGATION_CART_SCREEN_PATH,
} from './types';


const MainAppNavigator = createStackNavigator(
  {
    [NAVIGATION_HOME_PATH]: Home,
    [NAVIGATION_CATEGORY_TREE_PATH]: CategoryTree,
    [NAVIGATION_CATEGORY_LIST_PATH]: CategoryList,
    [NAVIGATION_SEARCH_SCREEN_PATH]: Search,
    [NAVIGATION_LOGIN_SCREEN_PATH]: Login,
    [NAVIGATION_SIGNUP_SCREEN_PATH]: Signup,
    [NAVIGATION_WISHLIST_SCREEN_PATH]: WishList,
    [NAVIGATION_ACCOUNT_SCREEN_PATH]: Account,
    [NAVIGATION_PRODUCT_DETAIL_PATH]: Product,
    [NAVIGATION_CART_SCREEN_PATH]: Cart,
  },
  {
    defaultNavigationOptions: defaultHeader,
  }
);

export default MainAppNavigator;
