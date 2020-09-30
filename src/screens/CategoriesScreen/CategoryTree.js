import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import CategoryTreeItem from './CategoryTreeItem';

const propTypes = {
  categories: PropTypes.array.isRequired,
};

const defaultProps = {};

const CategoryTree = ({ categories, ...props }) => {
  const renderRow = category => <CategoryTreeItem category={category.item} />;

  return (
    <FlatList
      data={categories.filter(
        category =>
          category.product_count !== 0 || category.children_data.length !== 0,
      )}
      renderItem={renderRow}
      keyExtractor={item => String(item.id)}
      {...props}
    />
  );
};

CategoryTree.propTypes = propTypes;

CategoryTree.defaultProps = defaultProps;

export default CategoryTree;
