import React from 'react';
import { useSelector } from 'react-redux';
import { GenericTemplate, CategoryTree } from '../../../components';

const CategoryTreeContainer = () => {
  const status = useSelector(state => state.categoryTree.status);
  const errorMessage = useSelector(state => state.categoryTree.errorMessage);
  const categories = useSelector(state => state.categoryTree.children_data);

  const renderChildren = () => {
    if (categories) {
      return <CategoryTree categories={categories} />;
    }
    return <></>;
  };

  return (
    <GenericTemplate
      isScrollable={false}
      status={status}
      errorMessage={errorMessage}
    >
      {renderChildren()}
    </GenericTemplate>
  );
};

CategoryTreeContainer.propTypes = {};

CategoryTreeContainer.defaultPorps = {};

export default CategoryTreeContainer;
