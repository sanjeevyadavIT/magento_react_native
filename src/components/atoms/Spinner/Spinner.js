import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../../theme';

const Spinner = ({
  /**
   * size of the spinner, can be
   * 1. 'large'
   * 2. 'small'
   */
  size,
  /**
   * custom color for the spinner
   */
  color,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <ActivityIndicator
      size={size}
      color={color || theme.colors.secondary}
    />
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['large', 'small']),
  color: PropTypes.string,
};

Spinner.defaultProps = {
  size: 'large',
  color: '',
};

export default Spinner;
