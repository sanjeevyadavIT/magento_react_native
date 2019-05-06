import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useActions } from 'react-redux';
import { ProductList } from '../../../components';
import { CATEGORY_LIST } from '../../../reducers/types';
import { openSelectedProduct, getCategoryProducts } from '../../../actions';

// FIXME: Not optimized, everytime more products will load, items and total_count will change,
// and compoenent will rerender
const CategoryListContainer = ({ categoryId }) => {
  const { items, totalCount, status, errorMesage, loadingMoreStatus } = useSelector(state => state[CATEGORY_LIST]);
  // eslint-disable-next-line no-underscore-dangle
  const dispatchOpenSelectedProductAction = useActions(product => openSelectedProduct(product), []);
  const loadProducts = useActions((_categoryId, offset, sortOrder) => getCategoryProducts(_categoryId, offset, sortOrder), []);
  const showHorizontalList = false;
  const columnCount = 2;
  const canLoadMoreProducts = items.length < totalCount;

  return (
    <ProductList
      loadFactor={categoryId}
      products={items}
      status={status}
      errorMessage={errorMesage}
      showHorizontalList={showHorizontalList}
      columnCount={columnCount}
      canLoadMoreProducts={canLoadMoreProducts}
      isLoadingMoreProducts={loadingMoreStatus}
      openSelectedProduct={dispatchOpenSelectedProductAction}
      loadProducts={loadProducts}
    />
  );
};

CategoryListContainer.propTypes = {
  categoryId: PropTypes.number.isRequired
};

export default CategoryListContainer;
