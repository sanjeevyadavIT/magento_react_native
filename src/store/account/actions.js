import { MAGENTO, ACTION_USER_LOGOUT } from '../../constants/actionsTypes';

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
