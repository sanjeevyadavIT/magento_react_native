import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { GenericTemplate, CategoryTree } from '../../../components';
import { ThemeContext } from '../../../config';

const CategoryTreeContainer = () => {
  const status = useSelector(state => state.categoryTree.status);
  const errorMessage = useSelector(state => state.categoryTree.errorMessage);
  const categories = useSelector(state => state.categoryTree.children_data);
  const theme = useContext(ThemeContext);

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
      style={styles.container(theme)}
    >
      {renderChildren()}
    </GenericTemplate>
  );
};

const styles = {
  container: theme => ({
    backgroundColor: theme.colors.white
  })
};

CategoryTreeContainer.propTypes = {};

CategoryTreeContainer.defaultPorps = {};

export default CategoryTreeContainer;
