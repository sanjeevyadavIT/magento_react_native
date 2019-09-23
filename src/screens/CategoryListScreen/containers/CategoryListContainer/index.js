import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProductList } from '../../../../components';
import { openSelectedProduct, getCategoryProducts, getCategoryConfigurableProductOptions } from '../../../../store/actions';
import Status from '../../../../magento/Status';

// FIXME: Not optimized, everytime more products will load, items and total_count will change,
// and compoenent will rerender
const CategoryListContainer = ({
  categoryId,
  items,
  currencySymbol,
  totalCount,
  status,
  errorMessage,
  loadingMoreStatus,
  getCategoryProducts: _getCategoryProducts,
  openSelectedProduct: _openSelectedProduct,
  /**
   * constants
   */
  showHorizontalList = false,
  columnCount = 2,
  stateAccessor = 'categoryList',
}) => {
  const canLoadMoreProducts = items.length < totalCount;

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
      openSelectedProduct={_openSelectedProduct}
      loadProducts={_getCategoryProducts}
    />
  );
};

CategoryListContainer.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  loadingMoreStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  categoryId: PropTypes.number.isRequired,
  items: PropTypes.array,
  currencySymbol: PropTypes.string.isRequired,
  totalCount: PropTypes.number,
  openSelectedProduct: PropTypes.func.isRequired,
  getCategoryProducts: PropTypes.func.isRequired,
};

CategoryListContainer.defaultProps = {
  items: [],
  totalCount: 0,
  errorMessage: '',
};

const mapStateToProps = ({ categoryList, magento }) => {
  const { items, totalCount, status, errorMessage, loadingMoreStatus } = categoryList;
  const { default_display_currency_symbol: currencySymbol } = magento.currency;
  return {
    status,
    errorMessage,
    items,
    totalCount,
    currencySymbol,
    loadingMoreStatus
  };
};

export default connect(mapStateToProps, {
  openSelectedProduct,
  getCategoryProducts
})(CategoryListContainer);
