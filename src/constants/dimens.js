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
   * Constants related to AddressScreen
   */
  addressScreen: {
    emptyImageSize: 150,
  },
  /**
   * Constants related to AlertDialog
   */
  alertDialog: {
    descriptionFontSize: 16,
  },
  /**
   * Constants related to CartScreen
   */
  cartScreen: {
    imageSize: 120,
    emptyCartImageSize: 150,
    totalPriceFontSize: 18,
  },
  /**
   * Constants related to DrawerScreen
   */
  drawerScreen: {
    headerHeight: 100,
  },
  /**
   * Constants related to LoginScreen
   */
  loginScreen: {
    loginImageSize: 150,
  },
  /**
   * Constants related to MediaViewer
   */
  mediaViewer: {
    closeIconSize: 30,
    paginationFontSize: 12,
  },
  /**
   * Constants related to ProfileScreen
   */
  profileScreen: {
    coverImageHeight: 150,
    profileImageSize: 100,
  },
  /**
   * Constants related to OrderAcknowledgementScreen
   */
  orderAcknowledgementScreen: {
    orderImageSize: 180,
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
};
