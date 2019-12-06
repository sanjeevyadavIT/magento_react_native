import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './ThemeContext';
import { ThemePropType } from '../types';

const ThemeProvider = ({ theme, children }) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
);

ThemeProvider.propTypes = {
  theme: ThemePropType.isRequired,
  children: PropTypes.element.isRequired,
};

ThemeProvider.defaultProps = {};

export default ThemeProvider;
