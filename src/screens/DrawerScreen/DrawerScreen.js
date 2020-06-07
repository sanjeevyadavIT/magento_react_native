import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { DrawerHeader, CategoryTreeContainer } from './components';
import { DIMENS } from '../../constants';

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const defaultProps = {};

const DrawerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <DrawerHeader navigation={navigation}/>
      </View>
      <CategoryTreeContainer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: DIMENS.headerViewHeight,
  },
});

DrawerScreen.propTypes = propTypes;

DrawerScreen.defaultPorps = defaultProps;

export default DrawerScreen;
