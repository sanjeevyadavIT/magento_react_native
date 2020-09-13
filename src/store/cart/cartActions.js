import { MAGENTO } from '../../constants';

export const createQuoteId = () => ({
  type: MAGENTO.CREATE_QUOTE_ID_REQUEST,
});

export const getCustomerCart = () => ({
  type: MAGENTO.CUSTOMER_CART_REQUEST,
});

export const removeItemFromCart = itemId => ({
  type: MAGENTO.REMOVE_ITEM_FROM_CART_REQUEST,
  payload: { itemId },
});
