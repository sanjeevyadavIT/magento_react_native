import { MAGENTO } from './actionsTypes';

export const initMagento = () => ({
  type: MAGENTO.INIT_APP_REQUEST,
});

export const getFeaturedProducts = categoryId => ({
  type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_REQUEST,
  payload: { categoryId },
});
