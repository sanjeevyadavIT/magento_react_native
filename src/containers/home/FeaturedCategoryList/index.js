import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from '../../../components';
import { openSelectedProduct, getFeaturedProducts, getHomeConfigurableProductOptions } from '../../../store/actions';

// Here FeaturedCategoriesContainer(connected to redux) is hosting FeaturedCategoryList(connected to redux) which in turn hosting Productlist(dumb component)
const FeaturedCategoryList = ({ categoryId }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.home[categoryId].status);
  const errorMesage = useSelector(state => state.home[categoryId].errorMesage);
  const items = useSelector(state => state.home[categoryId].items);
  const dispatchOpenSelectedProductAction = product => dispatch(openSelectedProduct(product));
  const loadProducts = _categoryId => dispatch(getFeaturedProducts(_categoryId));
  const showHorizontalList = true;
  const canLoadMoreProducts = false;
  const isLoadingMoreProducts = false;

  const stateAccessor = 'home';

  return (
    <ProductList
      products={items}
      stateAccessor={stateAccessor}
      loadFactor={categoryId}
      status={status}
      errorMessage={errorMesage}
      showHorizontalList={showHorizontalList}
      canLoadMoreProducts={canLoadMoreProducts}
      isLoadingMoreProducts={isLoadingMoreProducts}
      openSelectedProduct={dispatchOpenSelectedProductAction}
      loadProducts={loadProducts}
      updateItem={getHomeConfigurableProductOptions}
    />
  );
};

FeaturedCategoryList.propTypes = {
  categoryId: PropTypes.number.isRequired
};

export default FeaturedCategoryList;
