import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default {
  /**
   * App level constants
   */
  WINDOW_WIDTH: screenWidth,
  WINDOW_HEIGHT: screenHeight,
  borderRadius: 2,
  catalogGridItemWidth: 150,
  catalogGridItemHeight: 200,
  catalogGridItemImageHeight: 120,
  /**
   * Appbar constants
   */
  appbarButtonHeight: 23,
  /**
   * HomeScreen constnats
   */
  homePageSliderHeight: 200,
  /**
   * Drawer Navigation constants
   */
  headerViewHeight: 100,
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
