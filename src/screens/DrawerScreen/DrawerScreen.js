import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerHeader } from './components';
import { CategoryTreeContainer } from './containers';
import { ThemeContext } from '../../theme';
import { DIMENS } from '../../constants';

const Drawer = ({
  navigation,
}) => {
  console.log('Navigation Drawer render!');
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <View style={styles.header(theme)}>
        <DrawerHeader navigation={navigation} />
      </View>
      <CategoryTreeContainer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: theme => ({
    height: DIMENS.headerViewHeight,
  }),
});


Drawer.propTypes = {};

Drawer.defaultPorps = {};

export default Drawer;
