import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialAppbarButtons, Item } from '../../components';
import { CategoryListContainer } from './containers';
import { translate } from '../../i18n';

const CategoryListScreen = ({
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

CategoryListScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', translate('common.brandName')),
  headerRight: (
    <MaterialAppbarButtons>
      <Item title={translate('categoryListScreen.menu.sort')} iconName="sort" onPress={navigation.getParam('showSortDialog')} />
    </MaterialAppbarButtons>
  ),
});

CategoryListScreen.propTypes = {};

export default CategoryListScreen;
