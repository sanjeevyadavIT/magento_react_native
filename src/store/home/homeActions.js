import { MAGENTO } from '../../constants';

export const getFeaturedProducts = categoryId => ({
  type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_REQUEST,
  payload: { categoryId },
});
