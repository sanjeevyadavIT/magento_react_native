import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ theme, children }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      black: PropTypes.string.isRequired,
      gray100: PropTypes.string.isRequired,
      gray200: PropTypes.string.isRequired,
      gray300: PropTypes.string.isRequired,
      gray400: PropTypes.string.isRequired,
      gray500: PropTypes.string.isRequired,
      gray600: PropTypes.string.isRequired,
      white: PropTypes.string.isRequired,
      /**
       * A helper for making something see-thru. Use sparingly as many layers of transparency
       * can cause older Android devices to slow down due to the excessive compositing required
       * by their under-powered GPUs.
       */
      transparent: PropTypes.string.isRequired,
      /**
       * Surface colors affect surfaces(background) of components, such as cards, sheets, and menus
       */
      surface: PropTypes.string.isRequired,
      /**
       * Use it for card border, InputText border etc.
       */
      border: PropTypes.string.isRequired,
      /**
       * Default icon color
       */
      icon: PropTypes.string.isRequired,
      /**
       *  To be used as background color for components which denotes primary action
       */
      primary: PropTypes.string.isRequired,
      /**
       * Color which will replace primary color,
       * when component is in disabled state
       */
      disabledColor: PropTypes.string.isRequired,
      /**
       * disabledDark: to be used for border color & text color of disabled component
       */
      disabledDarkColor: PropTypes.string.isRequired,
      /**
       * Green shade for success messages and icons.
       */
      success: PropTypes.string.isRequired,
      /**
       * Red shade for error messages and icons
       */
      error: PropTypes.string.isRequired,
      warning: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
    }),
    navigation: PropTypes.shape({
      /**
       *  Whether this is a dark theme or a light theme
       */
      dark: PropTypes.bool.isRequired,
      colors: PropTypes.shape({
        /**
         * The primary color of the app used to tint various elements.
         * Usually you'll want to use your brand color for this.
         */
        primary: PropTypes.string.isRequired,
        /**
         * The color of various backgrounds, such as background color for the screens.
         */
        background: PropTypes.string.isRequired,
        /**
         *  The background color of card-like elements, such as headers, tab bars etc.
         */
        card: PropTypes.string.isRequired,
        /**
         * The text color of various elements.
         */
        text: PropTypes.string.isRequired,
        /**
         * The color of borders, e.g. header border, tab bar border etc.
         */
        border: PropTypes.string.isRequired,
        /**
         * The color of Tab Navigator badge.
         */
        notification: PropTypes.string.isRequired,
      }).isRequired,
    }),
    appbar: PropTypes.shape({
      statusBarColor: PropTypes.string.isRequired,
    }).isRequired,
    bottomBar: PropTypes.shape({
      activeTintColor: PropTypes.string,
      inactiveTintColor: PropTypes.string,
      activeBackgroundColor: PropTypes.string,
      inactiveBackgroundColor: PropTypes.string,
    }),
  }).isRequired,
  children: PropTypes.element.isRequired,
};

ThemeProvider.defaultProps = {};

export default ThemeProvider;
