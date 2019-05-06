import { MAGENTO, SET_NEW_CATEGORY } from './actionsTypes';

export const setNewCategory = categoryId => ({
  type: SET_NEW_CATEGORY,
  payload: { categoryId },
});

export const getCategoryProducts = (categoryId, offset, sortOrder) => ({
  type: MAGENTO.CATEGORY_PRODUCTS_REQUEST,
  payload: { categoryId, offset, sortOrder },
});
