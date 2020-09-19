import { MAGENTO, UI, RESET_ADD_TO_CART_STATE } from '../../constants';

/**
 * Make an api call, to fetch product data
 *
 * @param {string} sku - Id of the product whose detail need to be fetched
 */
export const getProductDetail = sku => ({
  type: MAGENTO.PRODUCT_DETAIL_REQUEST,
  payload: { sku },
});

export const setCurrentProduct = (productType, sku, children) => ({
  type: UI.OPEN_SELECTED_PRODUCT_REQUEST,
  payload: {
    productType,
    sku,
    children,
  },
});

export const getConfigurableProductOptions = sku => ({
  type: MAGENTO.CONF_OPTIONS_REQUEST,
  payload: { sku },
});

export const getConfigurableChildren = sku => ({
  type: MAGENTO.CONFIGURABLE_CHILDREN_REQUEST,
  payload: { sku },
});

export const getProductMedia = sku => ({
  type: MAGENTO.GET_PRODUCT_MEDIA_REQUEST,
  payload: { sku },
});

export const addToCart = cartItem => ({
  type: MAGENTO.ADD_TO_CART_REQUEST,
  payload: {
    cartItem,
  },
});

export const resetAddToCartState = sku => ({
  type: RESET_ADD_TO_CART_STATE,
  payload: {
    sku,
  },
});
