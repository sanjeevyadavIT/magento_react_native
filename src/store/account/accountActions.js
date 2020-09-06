import {
  MAGENTO,
  LOGIN_SUCCESS,
  UPDATE_CUSTOMER,
  ACTION_USER_LOGOUT,
} from '../../constants';

/**
 * Dispatch an action, containing logged in user token
 * token which is used as session token in app
 *
 * @param {string} token - Logged in user token
 */
export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
  },
});

/**
 * Dispatch an action to fetch logged in user details
 */
export const getCurrentCustomer = () => ({
  type: MAGENTO.CURRENT_USER_REQUEST,
});

/**
 * Update the user details in reducer
 */
export const updateCustomer = (customer) => ({
  type: UPDATE_CUSTOMER,
  payload: {
    customer,
  },
});

/**
 * Dispatch an action, to logout user and clear caches
 * and session token.
 */
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
