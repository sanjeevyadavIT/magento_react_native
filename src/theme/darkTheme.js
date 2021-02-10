import { DarkTheme } from '@react-navigation/native';

/**
 * Colors containing for light theme
 */
const WHITE = '#000';
const GRAY_100 = '#354052';
const GRAY_200 = '#6d787e';
const GRAY_300 = '#979da0';
const GRAY_400 = '#ced2d9';
const GRAY_500 = '#e0e0e0';
const GRAY_600 = '#f9f9f9';
const BLACK = '#fff';
const PRIMARY_COLOR = '#2196F3';
const ERROR_COLOR = '#CC0000';
export default {
  colors: {
    white: WHITE,
    gray100: GRAY_100,
    gray200: GRAY_200,
    gray300: GRAY_300,
    gray400: GRAY_400,
    gray500: GRAY_500,
    gray600: GRAY_600,
    black: BLACK,
    transparent: 'transparent',
    surface: WHITE,
    border: GRAY_300,
    disabled: '#E3E6E8',
    disabledDark: '#99A1A8',
    icon: GRAY_500,
    primary: PRIMARY_COLOR,
    success: '#007E33',
    error: ERROR_COLOR,
    warning: '#33b5e5',
    info: '#0099CC',
  },
  // ===========================================================
  // ============ GLOBAL React Navigation Theme ================
  // ===========================================================
  navigation: {
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: '#fff',
      notification: ERROR_COLOR,
    },
  },
  // ===========================================================
  // ================ Component Specific Style =================
  // ===========================================================
  appbar: {
    statusBarColor: '#000',
  },
};
