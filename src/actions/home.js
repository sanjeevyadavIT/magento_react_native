import { MAGENTO } from './actionsTypes';

export const initializeApp = () => ({
  type: MAGENTO.INIT_APP_REQUEST,
});

export const getFeaturedProducts = categoryId => ({
  type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_REQUEST,
  payload: { categoryId },
});

export const getHomeConfigurableProductOptions = sku => ({
  type: MAGENTO.HOME_UPDATE_CONF_PRODUCT_REQUEST,
  payload: { sku },
});
