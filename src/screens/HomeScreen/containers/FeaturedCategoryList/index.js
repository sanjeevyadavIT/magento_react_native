import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProductList } from '../../../../components';
import Status from '../../../../magento/Status';
import { openSelectedProduct, getFeaturedProducts, getHomeConfigurableProductOptions } from '../../../../store/actions';

// Here FeaturedCategoriesContainer(connected to redux) is hosting FeaturedCategoryList(connected to redux) which in turn hosting Productlist(dumb component)
const FeaturedCategoryList = ({
  categoryId,
  status,
  errorMessage,
  items,
  currencySymbol,
  getFeaturedProducts: loadProducts,
  openSelectedProduct: _openSelectedProduct,
  /**
   * constants
   */
  canLoadMoreProducts = false,
  isLoadingMoreProducts = Status.SUCCESS,
  stateAccessor = 'home',
}) => (
  <ProductList
    showHorizontalList
    products={items}
    currencySymbol={currencySymbol}
    stateAccessor={stateAccessor}
    loadFactor={categoryId}
    status={status}
    errorMessage={errorMessage}
    canLoadMoreProducts={canLoadMoreProducts}
    isLoadingMoreProducts={isLoadingMoreProducts}
    openSelectedProduct={_openSelectedProduct}
    loadProducts={loadProducts}
    updateItem={getHomeConfigurableProductOptions}
  />
);

FeaturedCategoryList.propTypes = {
  categoryId: PropTypes.number.isRequired
};

const mapStateToProps = ({ home, magento }, { categoryId }) => {
  const { status, errorMessage, items } = home[categoryId];
  const { default_display_currency_symbol: currencySymbol } = magento.currency;
  return {
    status,
    errorMessage,
    items,
    currencySymbol,
  };
};

export default connect(mapStateToProps, {
  getFeaturedProducts,
  openSelectedProduct,
})(FeaturedCategoryList);
