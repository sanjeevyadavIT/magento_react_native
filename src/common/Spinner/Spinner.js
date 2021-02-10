import React, { useContext } from 'react';
import { ActivityIndicator, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../theme';

const propTypes = {
  /**
   * size of the spinner, can be
   * 1. 'large'
   * 2. 'small'
   */
  size: PropTypes.oneOf(['large', 'small']),
  /**
   * custom color for the spinner
   */
  color: PropTypes.string,
  /**
   * style containing padding & margin
   */
  style: ViewPropTypes.style,
};

const defaultProps = {
  size: 'large',
  color: '',
  style: {},
};

const Spinner = ({ size, color, style }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ActivityIndicator
      style={style}
      size={size}
      color={color || theme.colors.primary}
    />
  );
};

Spinner.propTypes = propTypes;

Spinner.defaultProps = defaultProps;

export default Spinner;
