import { createStackNavigator } from 'react-navigation';
import {
  HomePage,
  WishlistPage,
  CategoryListPage,
  LoginPage,
  SignupPage,
  AccountPage,
  CartPage,
  ProductDetailPage,
} from '../components';
import Search from '../containers/Search';
import {
  defaultHeader,
  NAVIGATION_HOME_PATH,
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
    [NAVIGATION_HOME_PATH]: HomePage,
    [NAVIGATION_CATEGORY_LIST_PATH]: CategoryListPage,
    [NAVIGATION_SEARCH_SCREEN_PATH]: Search,
    [NAVIGATION_LOGIN_SCREEN_PATH]: LoginPage,
    [NAVIGATION_SIGNUP_SCREEN_PATH]: SignupPage,
    [NAVIGATION_WISHLIST_SCREEN_PATH]: WishlistPage,
    [NAVIGATION_ACCOUNT_SCREEN_PATH]: AccountPage,
    [NAVIGATION_PRODUCT_DETAIL_PATH]: ProductDetailPage,
    [NAVIGATION_CART_SCREEN_PATH]: CartPage,
  },
  {
    defaultNavigationOptions: defaultHeader,
  }
);

export default MainAppNavigator;
