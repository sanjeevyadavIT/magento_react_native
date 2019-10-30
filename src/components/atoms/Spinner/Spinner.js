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
}) => {
  const theme = useContext(ThemeContext);
  return (
    <ActivityIndicator
      size={size}
      color={theme.colors.secondary}
    />
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['large', 'small']),
};

Spinner.defaultProps = {
  size: 'large',
};

export default Spinner;
