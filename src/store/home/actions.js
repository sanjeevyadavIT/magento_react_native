import { MAGENTO } from '../../constants';

export const getFeaturedProducts = categoryId => ({
  type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_REQUEST,
  payload: { categoryId },
});

export const getHomeConfigurableProductOptions = sku => ({
  type: MAGENTO.HOME_UPDATE_CONF_PRODUCT_REQUEST,
  payload: { sku },
});
