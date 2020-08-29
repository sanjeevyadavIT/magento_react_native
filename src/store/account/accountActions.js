import {
  MAGENTO,
  LOGIN_SUCCESS,
  ACTION_USER_LOGOUT,
  RESET_ADDRESS_STATUS,
} from '../../constants';

/**
 * Dispatch an action, containing logged in user token
 * token is used as session token in app
 *
 * @param {string} token - Logged in user token
 */
export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
  },
});

export const getCurrentCustomer = () => ({
  type: MAGENTO.CURRENT_USER_REQUEST,
});

export const logout = () => ({
  type: ACTION_USER_LOGOUT,
});

export const getOrderList = customerId => ({
  type: MAGENTO.GET_ORDERS_REQUEST,
  payload: { customerId },
});

export const getOrderedProductInfo = sku => ({
  type: MAGENTO.GET_ORDERED_PRODUCT_INFO_REQUEST,
  payload: { sku },
});

export const addAccountAddress = (customerId, customerData) => ({
  type: MAGENTO.ADD_ACCOUNT_ADDRESS_REQUEST,
  payload: {
    customerId,
    customerData,
  },
});

export const resetAddressStatus = () => ({
  type: RESET_ADDRESS_STATUS,
});
