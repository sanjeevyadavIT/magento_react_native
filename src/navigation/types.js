import { theme } from '../theme';

export const NAVIGATION_HOME_SCREEN = 'HomeScreen';
export const NAVIGATION_CATEGORY_LIST_SCREEN = 'CategoryListScreen';
export const NAVIGATION_PRODUCT_SCREEN = 'ProductDetailScreen';
export const NAVIGATION_SEARCH_SCREEN = 'SearchScreen';
export const NAVIGATION_LOGIN_SCREEN = 'LoginScreen';
export const NAVIGATION_SIGNUP_SCREEN = 'SignupScreen';
export const NAVIGATION_ACCOUNT_SCREEN = 'AccountScreen';
export const NAVIGATION_ORDERS_SCREEN = 'OrdersScreen';
export const NAVIGATION_ORDER_DETAIL_SCREEN = 'OrderDetailScreen';
export const NAVIGATION_CART_SCREEN = 'CartScreen';
export const NAVIGATION_ADDRESS_SCREEN = 'AddressScreen';
export const NAVIGATION_SHIPPING_SCREEN = 'ShippingScreen';
export const NAVIGATION_PAYMENT_SCREEN = 'PaymentScreen';
export const NAVIGATION_ORDER_CONFIRMATION_SCREEN = 'OrderConfirmationScreen';
export const NAVIGATION_FORGOT_PASSWORD_SCREEN = 'ForgetPasswordScreen';
export const NAVIGATION_SETTING_SCREEN = 'SettingScreen';

export const defaultHeader = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTitleStyle: {
    ...theme.typography.titleTextBold,
  },
  headerBackTitle: null,
  headerTintColor: theme.colors.appbarTintColor,
};
