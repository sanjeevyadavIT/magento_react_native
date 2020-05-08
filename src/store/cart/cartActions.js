import { MAGENTO } from '../../constants';

export const createQuoteId = () => ({
  type: MAGENTO.CREATE_QUOTE_ID_REQUEST
});

export const getCustomerCart = () => ({
  type: MAGENTO.CUSTOMER_CART_REQUEST
});


export const getCartItemProduct = sku => ({
  type: MAGENTO.CART_ITEM_PRODUCT_REQUEST,
  payload: sku,
});

export const removeItemFromCart = itemId => ({
  type: MAGENTO.REMOVE_ITEM_FROM_CART_REQUEST,
  payload: { itemId },
});
