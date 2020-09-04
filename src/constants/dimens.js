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
    textInputHeight: 40,
  },
  catalogGridItemWidth: 150,
  catalogGridItemHeight: 200,
  catalogGridItemImageHeight: 120,
  /**
   * Constants related to DrawerScreen
   */
  drawerScreen: {
    headerHeight: 100,
  },
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
  /**
   * OrderDetailScreen constants
   */
  orderDetailImageWidth: 100,
  orderDetailImageHeight: 100,
};
