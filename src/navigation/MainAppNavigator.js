import { createStackNavigator } from 'react-navigation';
import {
  ForgetPasswordScreen,
  HomeScreen,
  ProductScreen,
  SearchScreen,
  CartScreen,
  CategoryListScreen,
  EditAccountAddressScreen,
  AccountScreen,
  CheckoutAddressScreen,
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
  defaultHeader,
  NAVIGATION_TO_FORGOT_PASSWORD_SCREEN,
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_CATEGORY_LIST_SCREEN,
  NAVIGATION_TO_PRODUCT_SCREEN,
  NAVIGATION_TO_SEARCH_SCREEN,
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_SIGNUP_SCREEN,
  NAVIGATION_TO_ACCOUNT_SCREEN,
  NAVIGATION_TO_ORDERS_SCREEN,
  NAVIGATION_TO_ORDER_DETAIL_SCREEN,
  NAVIGATION_TO_CART_SCREEN,
  NAVIGATION_TO_CHECKOUT_ADDRESS_SCREEN,
  NAVIGATION_TO_EDIT_ACCOUNT_ADDRESS_SCREEN,
  NAVIGATION_TO_SHIPPING_SCREEN,
  NAVIGATION_TO_PAYMENT_SCREEN,
  NAVIGATION_TO_ORDER_CONFIRMATION_SCREEN,
  NAVIGATION_TO_SETTING_SCREEN,
} from './routes';

const MainAppNavigator = createStackNavigator(
  {
    [NAVIGATION_TO_HOME_SCREEN]: HomeScreen,
    [NAVIGATION_TO_CATEGORY_LIST_SCREEN]: CategoryListScreen,
    [NAVIGATION_TO_SEARCH_SCREEN]: SearchScreen,
    [NAVIGATION_TO_LOGIN_SCREEN]: SignInScreen,
    [NAVIGATION_TO_SIGNUP_SCREEN]: SignUpScreen,
    [NAVIGATION_TO_ACCOUNT_SCREEN]: AccountScreen,
    [NAVIGATION_TO_ORDERS_SCREEN]: OrdersScreen,
    [NAVIGATION_TO_ORDER_DETAIL_SCREEN]: OrderDetailScreen,
    [NAVIGATION_TO_PRODUCT_SCREEN]: ProductScreen,
    [NAVIGATION_TO_CART_SCREEN]: CartScreen,
    [NAVIGATION_TO_CHECKOUT_ADDRESS_SCREEN]: CheckoutAddressScreen,
    [NAVIGATION_TO_SHIPPING_SCREEN]: ShippingScreen,
    [NAVIGATION_TO_PAYMENT_SCREEN]: PaymentScreen,
    [NAVIGATION_TO_ORDER_CONFIRMATION_SCREEN]: OrderAcknowledgementScreen,
    [NAVIGATION_TO_FORGOT_PASSWORD_SCREEN]: ForgetPasswordScreen,
    [NAVIGATION_TO_SETTING_SCREEN]: SettingScreen,
    [NAVIGATION_TO_EDIT_ACCOUNT_ADDRESS_SCREEN]: EditAccountAddressScreen,
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
