import {
  MAGENTO_INIT,
  MAGENTO_GET_CATEGORY_TREE,
  MAGENTO_SET_CURRENT_CATEGORY,
  MAGENTO_GET_CATEGORY_PRODUCTS,
  MAGENTO_SET_CURRENT_PRODUCT_SKU,
  MAGENTO_GET_PRODUCT_DETAIL,
  MAGENTO_GET_SEARCH_PRODUCTS,
} from './types';

export const initMagento = () => ({
  type: MAGENTO_INIT,
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

export const setCurrentProductSku = sku => ({
  type: MAGENTO_SET_CURRENT_PRODUCT_SKU,
  payload: sku,
});

export const getProductDetail = sku => ({
  type: MAGENTO_GET_PRODUCT_DETAIL,
  payload: sku,
});

export const getSearchProducts = searchInput => ({
  type: MAGENTO_GET_SEARCH_PRODUCTS,
  payload: searchInput,
});
