import {
  MAGENTO,
  UI,
  RESET_ADD_TO_CART_STATE,
} from '../../constants';

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
  payload: { sku }
});

export const getProductMedia = sku => ({
  type: MAGENTO.PRODUCT_MEDIA_REQUEST,
  payload: { sku },
});

export const addToCart = cartItem => ({
  type: MAGENTO.ADD_TO_CART_REQUEST,
  payload: {
    cartItem
  }
});

export const resetAddToCartState = sku => ({
  type: RESET_ADD_TO_CART_STATE,
  payload: {
    sku
  }
});
