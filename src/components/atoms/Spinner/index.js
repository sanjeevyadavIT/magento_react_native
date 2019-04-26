import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { ACCENT_COLOR } from '../../../constants';

const Spinner = ({ size, color }) => <ActivityIndicator size={size} color={color} />;

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

Spinner.defaultProps = {
  size: 'large',
  color: ACCENT_COLOR,
};

export default Spinner;
