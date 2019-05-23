import {
  OPEN_SELECTED_PRODUCT,
  MAGENTO,
  UI_PRODUCT_UPDATE_OPTIONS,
} from '../../constants/actionsTypes';

export const openSelectedProduct = product => ({
  type: OPEN_SELECTED_PRODUCT,
  payload: product,
});

export const getConfigurableProductOptions = sku => ({
  type: MAGENTO.CONF_OPTIONS_REQUEST,
  payload: sku,
});

export const getProductMedia = sku => ({
  type: MAGENTO.PRODUCT_MEDIA_REQUEST,
  payload: { sku },
});

export const uiProductUpdate = selectedOptions => ({
  type: UI_PRODUCT_UPDATE_OPTIONS,
  payload: selectedOptions,
});

export const addToCart = cartItem => ({
  type: MAGENTO.ADD_TO_CART_REQUEST,
  payload: {
    cartItem
  }
});
