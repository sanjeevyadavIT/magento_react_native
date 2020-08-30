/**
 * Colors containing for light theme
 */
const PRIMARY_COLOR = '#2196F3';
export default {
  // grey scale
  black: '#000000',
  white: '#ffffff',
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'transparent',
  /**
   * The background color appears behind scrollable content
   */
  backgroundColor: '#F7F6F4',
  /**
   * Surface colors affect surfaces(background) of components, such as cards, sheets, and menus
   */
  surfaceColor: '#fff',
  /**
   * Use it for card border, InputText border etc.
   */
  borderColor: '#d9d9d9',
  /**
   * Default icon color
   */
  iconColor: '#6d787e',
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
  headingTextColor: '#333d47',
  /**
   * To be used for sub-heading text
   */
  subHeadingTextColor: '#6C718B',
  /**
   * The default color of text in many components.
   * To be used for normal text like paragraph
   */
  bodyTextColor: '#A4A7C5',
  /**
   * To be used for hint/label text component
   */
  labelTextColor: '#6C718B',
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
