import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CatalogGrid } from '../../../../components';
import Status from '../../../../magento/Status';
import { setCurrentProduct, getFeaturedProducts, getHomeConfigurableProductOptions } from '../../../../store/actions';

// NOTE: Here FeaturedCategoriesContainer(connected to redux) is hosting FeaturedCategoryList(connected to redux) which in turn hosting Productlist(dumb component)
const FeaturedCategoryList = ({
  categoryId,
  status,
  errorMessage,
  items,
  currencySymbol,
  getFeaturedProducts: loadProducts,
  setCurrentProduct: _setCurrentProduct,
  /**
   * constants
   */
  canLoadMoreProducts = false,
  isLoadingMoreProducts = Status.SUCCESS,
  stateAccessor = 'home',
}) => (
  <CatalogGrid
    showHorizontalList
    products={items}
    currencySymbol={currencySymbol}
    stateAccessor={stateAccessor}
    loadFactor={categoryId}
    status={status}
    errorMessage={errorMessage}
    canLoadMoreProducts={canLoadMoreProducts}
    isLoadingMoreProducts={isLoadingMoreProducts}
    onItemClick={_setCurrentProduct}
    loadProducts={loadProducts}
    updateItem={getHomeConfigurableProductOptions}
  />
);

FeaturedCategoryList.propTypes = {
  categoryId: PropTypes.number.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
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
  setCurrentProduct,
})(FeaturedCategoryList);
