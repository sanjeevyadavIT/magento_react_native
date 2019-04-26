import { PRIMARY_COLOR, ACCENT_COLOR } from '../constants';

export const NAVIGATION_HOME_PATH = 'DashboardScreen';
export const NAVIGATION_CATEGORY_LIST_PATH = 'CategoryList';
export const NAVIGATION_PRODUCT_DETAIL_PATH = 'ProductDetail';
export const NAVIGATION_SEARCH_SCREEN_PATH = 'SearchScreen';
export const NAVIGATION_LOGIN_SCREEN_PATH = 'LoginScreen';
export const NAVIGATION_SIGNUP_SCREEN_PATH = 'SignupScreen';
export const NAVIGATION_WISHLIST_SCREEN_PATH = 'WishListScreen';
export const NAVIGATION_ACCOUNT_SCREEN_PATH = 'AccountScreen';
export const NAVIGATION_CART_SCREEN_PATH = 'CartScreen';

export const defaultHeader = {
  headerStyle: {
    backgroundColor: PRIMARY_COLOR,
  },
  headerTitleStyle: {
    color: ACCENT_COLOR,
  },
  headerBackTitle: null,
  headerTintColor: ACCENT_COLOR,
};
