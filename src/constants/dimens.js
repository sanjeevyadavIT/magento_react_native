import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default {
  /**
   * App level constants
   */
  common: {
    WINDOW_WIDTH: screenWidth,
    WINDOW_HEIGHT: screenHeight,
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    iconSize: 23,
    checkboxIconSize: 23,
    textInputHeight: 40,
  },
  /**
   * Constants related to DrawerScreen
   */
  drawerScreen: {
    headerHeight: 100,
  },
  /**
   * Constants related to ProfileScreen
   */
  profileScreen: {
    coverImageHeight: 150,
    profileImageSize: 100,
  },
  /**
   * Constants related to OrdersScreen
   */
  ordersScreen: {
    productWidth: 70,
    productHeight: 100,
  },
  catalogGridItemWidth: 150,
  catalogGridItemHeight: 200,
  catalogGridItemImageHeight: 120,
  /**
   * HomeScreen constnats
   */
  homePageSliderHeight: 200,
  /**
   * ProductScreen constants
   */
  productDetailPageSliderHeight: 300,
  optionBoxMinHeight: 100,
  /**
   * CartScreen constants
   */
  cartListImageHeight: 120,
  cartListImageWidth: 120,
};
