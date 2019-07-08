import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from '../../../components';
import { openSelectedProduct, getCategoryProducts, getCategoryConfigurableProductOptions } from '../../../store/actions';

// FIXME: Not optimized, everytime more products will load, items and total_count will change,
// and compoenent will rerender
const CategoryListContainer = ({ categoryId }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.categoryList.items);
  const currencySymbol = useSelector(state => state.magento.currency.default_display_currency_symbol);
  const totalCount = useSelector(state => state.categoryList.totalCount);
  const status = useSelector(state => state.categoryList.status);
  const errorMessage = useSelector(state => state.categoryList.errorMessage);
  const loadingMoreStatus = useSelector(state => state.categoryList.loadingMoreStatus);
  const dispatchOpenSelectedProductAction = product => dispatch(openSelectedProduct(product));
  const loadProducts = (_categoryId, offset, sortOrder) => dispatch(getCategoryProducts(_categoryId, offset, sortOrder));
  const showHorizontalList = false;
  const columnCount = 2;
  const canLoadMoreProducts = items.length < totalCount;

  const stateAccessor = 'categoryList';

  return (
    <ProductList
      loadFactor={categoryId}
      currencySymbol={currencySymbol}
      stateAccessor={stateAccessor}
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
