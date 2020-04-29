import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CatalogGrid } from '../../../../common';
import Status from '../../../../magento/Status';
import {
  setCurrentProduct,
  getFeaturedProducts,
  getHomeConfigurableProductOptions
} from '../../../../store/actions';
import { ProductType } from '../../../../types';

// NOTE: Here FeaturedCategoriesContainer(connected to redux) is hosting FeaturedCategoryList(connected to redux) which in turn hosting Productlist(dumb component)
const FeaturedCategoryList = ({
  categoryId,
  status,
  errorMessage,
  products,
  currencySymbol,
  currencyRate,
  getFeaturedProducts: loadProducts,
  setCurrentProduct: _setCurrentProduct,
}) => {
  const canLoadMoreProducts = false;
  const isLoadingMoreProducts = Status.SUCCESS;
  const stateAccessor = 'home';
  return (
    <CatalogGrid
      showHorizontalList
      products={products}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
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
};

FeaturedCategoryList.propTypes = {
  products: PropTypes.arrayOf(ProductType),
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
  getFeaturedProducts: PropTypes.func.isRequired,
};

FeaturedCategoryList.defaultProps = {
  products: [],
  errorMessage: '',
};

const mapStateToProps = ({ home, magento }, { categoryId }) => {
  const {
    status,
    errorMessage,
    items,
  } = home[categoryId];
  const {
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;
  return {
    status,
    errorMessage,
    products: items,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps, {
  getFeaturedProducts,
  setCurrentProduct,
})(FeaturedCategoryList);
