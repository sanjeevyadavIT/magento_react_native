import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProductList } from '../../../../common';
import Status from '../../../../magento/Status';
import {
  getFeaturedProducts,
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
}) => {
  const canLoadMoreProducts = false;
  const isLoadingMoreProducts = Status.SUCCESS;
  return (
    <ProductList
      showHorizontalList
      products={products}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
      loadFactor={categoryId}
      status={status}
      errorMessage={errorMessage}
      canLoadMoreProducts={canLoadMoreProducts}
      isLoadingMoreProducts={isLoadingMoreProducts}
      loadProducts={loadProducts}
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
  getFeaturedProducts: PropTypes.func.isRequired,
};

FeaturedCategoryList.defaultProps = {
  products: [],
  errorMessage: '',
};

const mapStateToProps = ({ home, magento }, { categoryId }) => {
  const { status, errorMessage, items } = home[categoryId];
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
})(FeaturedCategoryList);
