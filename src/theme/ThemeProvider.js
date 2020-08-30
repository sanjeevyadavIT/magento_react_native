import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ theme: defaultTheme, children }) => {
  const [theme, setTheme] = useState(defaultTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  theme: PropTypes.shape({
    black: PropTypes.string.isRequired,
    white: PropTypes.string.isRequired,
    transparent: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    surfaceColor: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
    primaryLightColor: PropTypes.string.isRequired,
    primaryColor: PropTypes.string.isRequired,
    primaryDarkColor: PropTypes.string.isRequired,
    disabledColor: PropTypes.string.isRequired,
    disabledDarkColor: PropTypes.string.isRequired,
    headingTextColor: PropTypes.string.isRequired,
    subHeadingTextColor: PropTypes.string.isRequired,
    bodyTextColor: PropTypes.string.isRequired,
    labelTextColor: PropTypes.string.isRequired,
    successColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,
    appbar: PropTypes.shape({
      statusBarColor: PropTypes.string.isRequired,
      barStyle: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      tintColor: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  children: PropTypes.element.isRequired,
};

ThemeProvider.defaultProps = {};

export default ThemeProvider;
