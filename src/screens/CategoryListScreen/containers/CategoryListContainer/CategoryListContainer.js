import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CatalogGrid } from '../../../../common';
import {
  setCurrentProduct,
  getCategoryProducts,
  getCategoryConfigurableProductOptions,
} from '../../../../store/actions';
import Status from '../../../../magento/Status';
import { ProductType } from '../../../../types';

// FIXME: Not optimized, everytime more products will load, items and total_count will change,
// and compoenent will rerender
const CategoryListContainer = ({
  categoryId,
  products,
  currencySymbol,
  currencyRate,
  totalCount,
  status,
  errorMessage,
  loadingMoreStatus,
  getCategoryProducts: _getCategoryProducts,
  setCurrentProduct: _setCurrentProduct,
}) => {
  const canLoadMoreProducts = products.length < totalCount;
  const showHorizontalList = false;
  const columnCount = 2;
  const stateAccessor = 'categoryList';

  return (
    <CatalogGrid
      loadFactor={categoryId}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
      stateAccessor={stateAccessor}
      updateItem={getCategoryConfigurableProductOptions}
      products={products}
      status={status}
      errorMessage={errorMessage}
      showHorizontalList={showHorizontalList}
      columnCount={columnCount}
      canLoadMoreProducts={canLoadMoreProducts}
      isLoadingMoreProducts={loadingMoreStatus}
      onItemClick={_setCurrentProduct}
      loadProducts={_getCategoryProducts}
    />
  );
};

CategoryListContainer.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  loadingMoreStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  categoryId: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(ProductType),
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  totalCount: PropTypes.number,
  setCurrentProduct: PropTypes.func.isRequired,
  getCategoryProducts: PropTypes.func.isRequired,
};

CategoryListContainer.defaultProps = {
  products: [],
  totalCount: 0,
  errorMessage: '',
};

const mapStateToProps = ({ categoryList, magento }) => {
  const {
    items,
    totalCount,
    status,
    errorMessage,
    loadingMoreStatus,
  } = categoryList;
  const {
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;
  return {
    status,
    errorMessage,
    products: items,
    totalCount,
    currencySymbol,
    currencyRate,
    loadingMoreStatus,
  };
};

export default connect(mapStateToProps, {
  setCurrentProduct,
  getCategoryProducts,
})(CategoryListContainer);
