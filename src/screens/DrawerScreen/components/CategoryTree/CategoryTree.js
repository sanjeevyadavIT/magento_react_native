import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import CategoryTreeItem from '../CategoryTreeItem/CategoryTreeItem';

const CategoryTree = ({
  categories,
  style,
  navigation,
  ...props
}) => {
  const renderRow = category => (
    <CategoryTreeItem navigation={navigation} category={category.item} />
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderRow}
      keyExtractor={item => String(item.id)}
      {...props}
    />
  );
};

CategoryTree.propTypes = {
  categories: PropTypes.array.isRequired,
};

CategoryTree.defaultProps = {
};

export default CategoryTree;
