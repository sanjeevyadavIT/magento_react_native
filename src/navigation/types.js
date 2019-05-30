import { theme } from '../config';

export const NAVIGATION_HOME_PATH = 'DashboardScreen';
export const NAVIGATION_CATEGORY_LIST_PATH = 'CategoryList';
export const NAVIGATION_PRODUCT_DETAIL_PATH = 'ProductDetail';
export const NAVIGATION_SEARCH_SCREEN_PATH = 'SearchScreen';
export const NAVIGATION_LOGIN_SCREEN_PATH = 'LoginScreen';
export const NAVIGATION_SIGNUP_SCREEN_PATH = 'SignupScreen';
export const NAVIGATION_ACCOUNT_SCREEN_PATH = 'AccountScreen';
export const NAVIGATION_ORDERS_SCREEN_PATH = 'OrdersScreen';
export const NAVIGATION_ORDER_DETAIL_SCREEN_PATH = 'OrderDetailPage';
export const NAVIGATION_CART_SCREEN_PATH = 'CartScreen';
export const NAVIGATION_ADDRESS_SCREEN_PATH = 'AddressScreen';
export const NAVIGATION_SHIPPING_SCREEN_PATH = 'ShippingScreen';
export const NAVIGATION_PAYMENT_SCREEN_PATH = 'PaymentScreen';
export const NAVIGATION_ORDER_ACKNOWLEDGEMENT_PAGE = 'OrderAcknowledgementPage';

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
