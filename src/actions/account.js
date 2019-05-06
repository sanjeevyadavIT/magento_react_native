import { MAGENTO, ACTION_USER_LOGOUT } from './actionsTypes';

export const getCurrentCustomer = () => ({
  type: MAGENTO.CURRENT_USER_REQUEST,
});

export const logout = () => ({
  type: ACTION_USER_LOGOUT,
});
