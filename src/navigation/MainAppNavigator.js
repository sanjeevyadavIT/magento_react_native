import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from '../screens';
import {
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
  NAVIGATION_HOME_SCREEN,
  NAVIGATION_CATEGORY_LIST_SCREEN,
  NAVIGATION_PRODUCT_SCREEN,
  NAVIGATION_SEARCH_SCREEN,
  NAVIGATION_LOGIN_SCREEN,
  NAVIGATION_SIGNUP_SCREEN,
  NAVIGATION_ACCOUNT_SCREEN,
  NAVIGATION_ORDERS_SCREEN,
  NAVIGATION_ORDER_DETAIL_SCREEN,
  NAVIGATION_CART_SCREEN,
  NAVIGATION_ADDRESS_SCREEN,
  NAVIGATION_SHIPPING_SCREEN,
  NAVIGATION_PAYMENT_SCREEN,
  NAVIGATION_ORDER_CONFIRMATION_SCREEN
} from './types';

const MainAppNavigator = createStackNavigator(
  {
    [NAVIGATION_HOME_SCREEN]: HomeScreen,
    [NAVIGATION_CATEGORY_LIST_SCREEN]: CategoryListPage,
    [NAVIGATION_SEARCH_SCREEN]: Search,
    [NAVIGATION_LOGIN_SCREEN]: SignInPage,
    [NAVIGATION_SIGNUP_SCREEN]: SignupPage,
    [NAVIGATION_ACCOUNT_SCREEN]: AccountPage,
    [NAVIGATION_ORDERS_SCREEN]: OrdersPage,
    [NAVIGATION_ORDER_DETAIL_SCREEN]: OrderDetailPage,
    [NAVIGATION_PRODUCT_SCREEN]: ProductDetailPage,
    [NAVIGATION_CART_SCREEN]: CartPage,
    [NAVIGATION_ADDRESS_SCREEN]: AddressPage,
    [NAVIGATION_SHIPPING_SCREEN]: ShippingPage,
    [NAVIGATION_PAYMENT_SCREEN]: PaymentPage,
    [NAVIGATION_ORDER_CONFIRMATION_SCREEN]: OrderAcknowledgementPage,
  },
  {
    defaultNavigationOptions: defaultHeader,
  }
);
// Disable drawer on all screen except Home Page
MainAppNavigator.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }

  return {
    drawerLockMode,
  };
};

export default MainAppNavigator;
