import React from 'react';
import { View, ActivityIndicator } from 'react-native';


const Spinner = ({ style, size }) => (
  <View style={[styles.spinnerStyle, style]}>
    <ActivityIndicator size={size || 'large'} />
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
