import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerHeader } from '../../components';
import { CategoryTreeContainer } from './containers';
import { ThemeContext } from '../../theme';

const DrawerPage = () => {
  console.log('Navigation Drawer render!');
  const theme = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <View style={styles.header(theme)}>
        <DrawerHeader />
      </View>
      <CategoryTreeContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: theme => ({
    height: theme.dimens.headerViewHeight,
  }),
});


DrawerPage.propTypes = {};

DrawerPage.defaultPorps = {};

export default DrawerPage;
