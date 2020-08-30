import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { DrawerHeader, CategoryTreeContainer } from './components';

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

const DrawerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <DrawerHeader navigation={navigation} />
      <CategoryTreeContainer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

DrawerScreen.propTypes = propTypes;

DrawerScreen.defaultPorps = defaultProps;

export default DrawerScreen;
