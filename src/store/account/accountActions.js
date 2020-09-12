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
export const updateCustomer = customer => ({
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

/**
 * Fetch logged in user orders
 *
 * @param {number} customerId  - Logged in user id
 * @param {number} offset      - Number of items already fetched
 */
export const getOrders = (customerId, offset = 0) => ({
  type: MAGENTO.GET_ORDERS_REQUEST,
  payload: { customerId, offset },
});
