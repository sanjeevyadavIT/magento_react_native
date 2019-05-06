import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Spinner from '../../atoms/Spinner';
import { ACCENT_COLOR, TRANSPARENT_COLOR } from '../../../constants';

const LoadingView = ({ size, color, backgroundColor }) => (
  <View style={[styles.container, { backgroundColor }]}>
    <Spinner size={size} color={color} />
  </View>
);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

LoadingView.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

LoadingView.defaultProps = {
  size: 'large',
  color: ACCENT_COLOR,
  backgroundColor: TRANSPARENT_COLOR,
};

export default LoadingView;
