import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { withTheme } from '../../../config';

const Spinner = ({
  /**
   * size of the spinner, can be
   * 1. 'large'
   * 2. 'small'
   */
  size,
  theme,
}) => (
  <ActivityIndicator
    size={size}
    color={theme.colors.secondary}
  />
);

Spinner.propTypes = {
  size: PropTypes.oneOf(['large', 'small']),
};

Spinner.defaultProps = {
  size: 'large',
};

export default withTheme(Spinner);
