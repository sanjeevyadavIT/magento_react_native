import { createStackNavigator } from 'react-navigation';
import {
  ForgetPasswordScreen,
  HomeScreen,
  ProductScreen,
  SearchScreen,
  CartScreen,
  CategoryListScreen,
  AccountScreen,
  AddressScreen,
  SignInScreen,
  SignUpScreen,
  ShippingScreen,
  PaymentScreen,
  OrdersScreen,
  OrderDetailScreen,
  OrderAcknowledgementScreen,
  SettingScreen
} from '../screens';
import {

} from '../components';
import {
  defaultHeader,
  NAVIGATION_FORGOT_PASSWORD_SCREEN,
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
  NAVIGATION_ORDER_CONFIRMATION_SCREEN,
  NAVIGATION_SETTING_SCREEN,
} from './types';

const MainAppNavigator = createStackNavigator(
  {
    [NAVIGATION_HOME_SCREEN]: HomeScreen,
    [NAVIGATION_CATEGORY_LIST_SCREEN]: CategoryListScreen,
    [NAVIGATION_SEARCH_SCREEN]: SearchScreen,
    [NAVIGATION_LOGIN_SCREEN]: SignInScreen,
    [NAVIGATION_SIGNUP_SCREEN]: SignUpScreen,
    [NAVIGATION_ACCOUNT_SCREEN]: AccountScreen,
    [NAVIGATION_ORDERS_SCREEN]: OrdersScreen,
    [NAVIGATION_ORDER_DETAIL_SCREEN]: OrderDetailScreen,
    [NAVIGATION_PRODUCT_SCREEN]: ProductScreen,
    [NAVIGATION_CART_SCREEN]: CartScreen,
    [NAVIGATION_ADDRESS_SCREEN]: AddressScreen,
    [NAVIGATION_SHIPPING_SCREEN]: ShippingScreen,
    [NAVIGATION_PAYMENT_SCREEN]: PaymentScreen,
    [NAVIGATION_ORDER_CONFIRMATION_SCREEN]: OrderAcknowledgementScreen,
    [NAVIGATION_FORGOT_PASSWORD_SCREEN]: ForgetPasswordScreen,
    [NAVIGATION_SETTING_SCREEN]: SettingScreen,
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
