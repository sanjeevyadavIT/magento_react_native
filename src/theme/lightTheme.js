/**
 * Colors containing for light theme
 */
const WHITE = '#fff';
const GRAY_100 = '#f9f9f9';
const GRAY_200 = '#e0e0e0';
const GRAY_300 = '#ced2d9';
const GRAY_400 = '#979da0';
const GRAY_500 = '#6d787e';
const GRAY_600 = '#354052';
const BLACK = '#000';
const PRIMARY_COLOR = '#2196F3';
export default {
  // grey scale
  white: WHITE,
  gray100: GRAY_100,
  gray200: GRAY_200,
  gray300: GRAY_300,
  gray400: GRAY_400,
  gray500: GRAY_500,
  gray600: GRAY_600,
  black: BLACK,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'transparent',
  /**
   * The background color appears behind scrollable content
   */
  backgroundColor: GRAY_100,
  /**
   * Surface colors affect surfaces(background) of components, such as cards, sheets, and menus
   */
  surfaceColor: WHITE,
  /**
   * Use it for card border, InputText border etc.
   */
  borderColor: GRAY_300,
  /**
   * Default icon color
   */
  iconColor: GRAY_500,
  /**
   * ========================= Primary color : (Brand color) =========================
   * primaryLightColor: Lighter shade of primary color, (can be used for hover effects)
   * primaryColor: To be used as background color for components which denotes primary action
   * primaryDarkColor: Darker shade of primary color, (can be used for border color or text color of components)
   */
  primaryLightColor: '#53c3f8',
  primaryColor: PRIMARY_COLOR,
  primaryDarkColor: '#1976D2',
  /**
   * Color which will replace primary color,
   * when component is in disabled state
   *
   * disabledDarkColor: to be used for border color & text color of disabled component
   */
  disabledColor: '#E3E6E8',
  disabledDarkColor: '#99A1A8',
  /**
   * To be used for heading text
   */
  headingTextColor: BLACK,
  /**
   * To be used for sub-heading text
   */
  subHeadingTextColor: GRAY_600,
  /**
   * The default color of text in many components.
   * To be used for normal text like paragraph
   */
  bodyTextColor: GRAY_500,
  /**
   * To be used for hint/label text component
   */
  labelTextColor: GRAY_400,
  /**
   * Green shade for success messages and icons.
   */
  successColor: '#52c41a',
  /**
   * Red shade for error messages and icons
   */
  errorColor: '#ff190c',
  // ===========================================================
  // ================ Component Specific Style =================
  // ===========================================================
  /**
   * ========================= Appbar =========================
   * appbar.statusBarColor: color for the status bar
   * appbar.barStyle: Sets the color of the status bar text.
   * appbar.backgroundColor: background color for appbar(toolbar)
   * appbar.tintColor: to be used for appbar title text, appbar icons color and for back button
   *
   * Note: If appbarColor color is dark, make appbarTintColor light
   * Note: If statusBarColor is light, set barStyle to `dark-content` else `light-content`
   */
  appbar: {
    statusBarColor: '#135E99',
    barStyle: 'light-content',
    backgroundColor: PRIMARY_COLOR,
    tintColor: '#fff',
  },
};
