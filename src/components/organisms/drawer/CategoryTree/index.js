import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { CategoryTreeItem } from '../../..';

const CategoryTree = ({
  categories,
  style,
  ...props
}) => {
  const renderRow = category => <CategoryTreeItem category={category.item} />;

  return (
    <FlatList
      data={categories}
      renderItem={renderRow}
      keyExtractor={item => String(item.id)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({});

CategoryTree.propTypes = {
  categories: PropTypes.array.isRequired,
};

CategoryTree.defaultProps = {};

export default CategoryTree;
