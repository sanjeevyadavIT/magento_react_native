import { MAGENTO, SET_NEW_CATEGORY } from '../../constants/actionsTypes';

export const setNewCategory = categoryId => ({
  type: SET_NEW_CATEGORY,
  payload: { categoryId },
});

export const getCategoryProducts = (categoryId, offset, sortOrder) => ({
  type: MAGENTO.CATEGORY_PRODUCTS_REQUEST,
  payload: { categoryId, offset, sortOrder },
});

export const getCategoryConfigurableProductOptions = sku => ({
  type: MAGENTO.CATEGORY_UPDATE_CONF_PRODUCT_REQUEST,
  payload: { sku },
});
