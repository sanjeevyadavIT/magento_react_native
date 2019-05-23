import { createStackNavigator } from 'react-navigation';
import {
  HomePage,
  CategoryListPage,
  SignInPage,
  SignupPage,
  AccountPage,
  OrdersPage,
  OrderDetailPage,
  CartPage,
  ProductDetailPage,
  AddressPage,
  ShippingPage,
  PaymentPage,
  OrderAcknowledgementPage,
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
  NAVIGATION_ACCOUNT_SCREEN_PATH,
  NAVIGATION_ORDERS_SCREEN_PATH,
  NAVIGATION_ORDER_DETAIL_SCREEN_PATH,
  NAVIGATION_CART_SCREEN_PATH,
  NAVIGATION_ADDRESS_SCREEN_PATH,
  NAVIGATION_SHIPPING_SCREEN_PATH,
  NAVIGATION_PAYMENT_SCREEN_PATH,
  NAVIGATION_ORDER_ACKNOWLEDGEMENT_PAGE
} from './types';

const MainAppNavigator = createStackNavigator(
  {
    [NAVIGATION_HOME_PATH]: HomePage,
    [NAVIGATION_CATEGORY_LIST_PATH]: CategoryListPage,
    [NAVIGATION_SEARCH_SCREEN_PATH]: Search,
    [NAVIGATION_LOGIN_SCREEN_PATH]: SignInPage,
    [NAVIGATION_SIGNUP_SCREEN_PATH]: SignupPage,
    [NAVIGATION_ACCOUNT_SCREEN_PATH]: AccountPage,
    [NAVIGATION_ORDERS_SCREEN_PATH]: OrdersPage,
    [NAVIGATION_ORDER_DETAIL_SCREEN_PATH]: OrderDetailPage,
    [NAVIGATION_PRODUCT_DETAIL_PATH]: ProductDetailPage,
    [NAVIGATION_CART_SCREEN_PATH]: CartPage,
    [NAVIGATION_ADDRESS_SCREEN_PATH]: AddressPage,
    [NAVIGATION_SHIPPING_SCREEN_PATH]: ShippingPage,
    [NAVIGATION_PAYMENT_SCREEN_PATH]: PaymentPage,
    [NAVIGATION_ORDER_ACKNOWLEDGEMENT_PAGE]: OrderAcknowledgementPage,
  },
  {
    defaultNavigationOptions: defaultHeader,
  }
);

export default MainAppNavigator;
