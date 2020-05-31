import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { CategoryListContainer } from './containers';

// TODO: Connect sort icon on appbar, with ui to sort products
const CategoryListScreen = ({ route, navigation }) => {
  const { id = -1 } = route.params;
  return <CategoryListContainer style={styles.container} categoryId={id} />;
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
});

CategoryListScreen.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default CategoryListScreen;
