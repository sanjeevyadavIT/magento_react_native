import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ACCENT_COLOR } from '../../constants';

const Spinner = ({ style, size, color }) => (
  <View style={[styles.spinnerStyle, style]}>
    <ActivityIndicator size={size || 'large'} color={color || ACCENT_COLOR} />
  </View>
);

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default Spinner;
