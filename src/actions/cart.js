import { MAGENTO } from './actionsTypes';

export const getCustomerCart = () => ({
  type: MAGENTO.CUSTOMER_CART_REQUEST
});


export const getCartItemProduct = sku => ({
  type: MAGENTO.CART_ITEM_PRODUCT_REQUEST,
  payload: sku,
});
