import { MAGENTO, ACTION_USER_LOGOUT } from '../../constants';

export const getCurrentCustomer = () => ({
  type: MAGENTO.CURRENT_USER_REQUEST,
});

export const logout = () => ({
  type: ACTION_USER_LOGOUT,
});

export const getOrderList = customerId => ({
  type: MAGENTO.GET_ORDERS_REQUEST,
  payload: { customerId }
});
export const getOrderedProductInfo = sku => ({
  type: MAGENTO.GET_ORDERED_PRODUCT_INFO_REQUEST,
  payload: { sku }
});
