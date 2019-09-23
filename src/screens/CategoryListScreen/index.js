import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { BRAND_NAME } from '../../constants';
import { MaterialAppbarButtons, Item } from '../../components';
import { CategoryListContainer } from './containers';

const CategoryListPage = ({
  navigation,
}) => {
  useEffect(() => {
    // componentDidMount
    navigation.setParams({ showSortDialog });
  }, []);

  const showSortDialog = () => {
    console.log('WIP: Show short dialog');
  };

  return (
    <CategoryListContainer style={styles.container} categoryId={navigation.getParam('id', -1)} />
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
});

CategoryListPage.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', BRAND_NAME),
  headerRight: (
    <MaterialAppbarButtons>
      <Item title="sort" iconName="sort" onPress={navigation.getParam('showSortDialog')} />
    </MaterialAppbarButtons>
  ),
});

CategoryListPage.propTypes = {};

export default CategoryListPage;
