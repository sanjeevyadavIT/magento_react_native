import { MAGENTO } from './actionsTypes';

export const getCategoryProducts = (categoryId, offset, sortOrder) => ({
  type: MAGENTO.CATEGORY_PRODUCTS_REQUEST,
  payload: { categoryId, offset, sortOrder },
});
