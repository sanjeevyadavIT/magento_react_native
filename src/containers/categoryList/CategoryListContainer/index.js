import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from '../../../components';
import { CATEGORY_LIST } from '../../../reducers/types';
import { openSelectedProduct, getCategoryProducts, getCategoryConfigurableProductOptions } from '../../../actions';

// FIXME: Not optimized, everytime more products will load, items and total_count will change,
// and compoenent will rerender
const CategoryListContainer = ({ categoryId }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state[CATEGORY_LIST].items);
  const totalCount = useSelector(state => state[CATEGORY_LIST].totalCount);
  const status = useSelector(state => state[CATEGORY_LIST].status);
  const errorMessage = useSelector(state => state[CATEGORY_LIST].errorMessage);
  const loadingMoreStatus = useSelector(state => state[CATEGORY_LIST].loadingMoreStatus);
  const dispatchOpenSelectedProductAction = product => dispatch(openSelectedProduct(product));
  const loadProducts = (_categoryId, offset, sortOrder) => dispatch(getCategoryProducts(_categoryId, offset, sortOrder));
  const showHorizontalList = false;
  const columnCount = 2;
  const canLoadMoreProducts = items.length < totalCount;

  return (
    <ProductList
      loadFactor={categoryId}
      stateAccessor={CATEGORY_LIST}
      updateItem={getCategoryConfigurableProductOptions}
      products={items}
      status={status}
      errorMessage={errorMessage}
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
