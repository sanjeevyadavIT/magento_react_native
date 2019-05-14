import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from '../../../components';
import { HOME } from '../../../reducers/types';
import { openSelectedProduct, getFeaturedProducts } from '../../../actions';

// Here FeaturedCategoriesContainer(connected to redux) is hosting FeaturedCategoryList(connected to redux) which in turn hosting Productlist(dumb component)
const FeaturedCategoryList = ({ categoryId }) => {
  const dispatch = useDispatch();
  const { items, status, errorMesage } = useSelector(state => state[HOME][categoryId]);
  // eslint-disable-next-line no-underscore-dangle
  const dispatchOpenSelectedProductAction = product => dispatch(openSelectedProduct(product));
  const loadProducts = _categoryId => dispatch(getFeaturedProducts(_categoryId));
  const showHorizontalList = true;
  const canLoadMoreProducts = false;
  const isLoadingMoreProducts = false;

  return (
    <ProductList
      loadFactor={categoryId}
      products={items}
      status={status}
      errorMessage={errorMesage}
      showHorizontalList={showHorizontalList}
      canLoadMoreProducts={canLoadMoreProducts}
      isLoadingMoreProducts={isLoadingMoreProducts}
      openSelectedProduct={dispatchOpenSelectedProductAction}
      loadProducts={loadProducts}
    />
  );
};

FeaturedCategoryList.propTypes = {
  categoryId: PropTypes.number.isRequired
};

export default FeaturedCategoryList;
