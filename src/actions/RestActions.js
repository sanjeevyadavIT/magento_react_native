import {
  MAGENTO_INIT,
  MAGENTO_GET_HOME_DATA,
  MAGENTO_GET_CATEGORY_TREE,
  MAGENTO_SET_CURRENT_CATEGORY,
  MAGENTO_GET_CATEGORY_PRODUCTS,
  MAGENTO_SET_CURRENT_PRODUCT,
  MAGENTO_GET_PRODUCT_MEDIA,
  MAGENTO_GET_SEARCH_PRODUCTS,
} from './types';

export const initMagento = () => ({
  type: MAGENTO_INIT,
});

export const getHomeData = () => ({
  type: MAGENTO_GET_HOME_DATA,
});

export const getCategoryTree = () => ({
  type: MAGENTO_GET_CATEGORY_TREE,
});

export const setCurrentCategory = categoryId => ({
  type: MAGENTO_SET_CURRENT_CATEGORY,
  payload: categoryId,
});

export const getCategoryProducts = categoryId => ({
  type: MAGENTO_GET_CATEGORY_PRODUCTS,
  payload: categoryId,
});

export const setCurrentProduct = product => ({
  type: MAGENTO_SET_CURRENT_PRODUCT,
  payload: product,
});

export const getProductMedia = sku => ({
  type: MAGENTO_GET_PRODUCT_MEDIA,
  payload: sku,
});

export const getSearchProducts = searchInput => ({
  type: MAGENTO_GET_SEARCH_PRODUCTS,
  payload: searchInput,
});
