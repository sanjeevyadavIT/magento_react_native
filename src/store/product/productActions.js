import { MAGENTO } from '../../constants';

/**
 * Make an api call, to fetch product data
 *
 * @param {string} sku - Id of the product whose detail need to be fetched
 */
export const getProductDetail = sku => ({
  type: MAGENTO.PRODUCT_DETAIL_REQUEST,
  payload: { sku },
});

export const getProductMedia = sku => ({
  type: MAGENTO.GET_PRODUCT_MEDIA_REQUEST,
  payload: { sku },
});

export const getAttributeById = id => ({
  type: MAGENTO.GET_ATTRIBUTE_REQUEST,
  payload: { id },
});
