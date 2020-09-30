import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../../magento';
import { MAGENTO, LOGIN_SUCCESS, ACTION_USER_LOGOUT } from '../../constants';
import { getProductsSkuFromOrders } from '../../utils';

/**
 * worker saga: After successful login, dispatch actions
 * to fetch user details and user cart data
 *
 * @param {Object} action               - action object dispatched
 * @param {number} action.payload.token - unique token for current logged in user
 */
function* onLoginSuccess({ payload: { token } }) {
  try {
    magento.setCustomerToken(token);
    yield put({ type: MAGENTO.CURRENT_USER_REQUEST }); // Fetch details of current user
    yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST }); // Fetch current user cart
    yield AsyncStorage.setItem(CUSTOMER_TOKEN, token);
  } catch (error) {
    console.log(error);
  }
}

// worker saga: Add description
function* getCurrentUser() {
  try {
    yield put({ type: MAGENTO.CURRENT_USER_LOADING });
    const customer = yield call({
      content: magento,
      fn: magento.customer.getCurrentCustomer,
    });
    yield put({ type: MAGENTO.CURRENT_USER_SUCCESS, payload: { customer } });
  } catch (error) {
    yield put({
      type: MAGENTO.CURRENT_USER_FAILURE,
      payload: { errorMessage: error.message },
    });
  }
}

// worker saga: Add description
function* clearCustomerAccessToken() {
  magento.setCustomerToken(null);
  yield AsyncStorage.removeItem(CUSTOMER_TOKEN);
}

/**
 * Make an api call to fetch user orders, code handle pagination
 *
 * @param {Object} action        - action dispatch by user
 * @param {number} customerId    - logged in user id
 * @param {number} offset        - number of items already fetched
 */
function* getOrdersForCustomer({ payload: { customerId, offset } }) {
  try {
    yield put({
      type:
        offset === 0
          ? MAGENTO.GET_ORDERS_LOADING
          : MAGENTO.GET_MORE_ORDERS_LOADING,
    });
    const response = yield call(
      { content: magento, fn: magento.admin.getOrders },
      { customerId, offset },
    );
    yield put({
      type:
        offset === 0
          ? MAGENTO.GET_ORDERS_SUCCESS
          : MAGENTO.GET_MORE_ORDERS_SUCCESS,
      payload: {
        orders: response.items,
        totalOrders: response.total_count,
      },
    });
    /**
     * Order data doesn't contain products images,
     * to show product image, manually hit priduct/{sku}/media api
     * to get media
     */
    const productSkuList = getProductsSkuFromOrders(response.items);
    // TODO: Fetch product media of each sku in productSkuList
    console.log(productSkuList);
  } catch (error) {
    yield put({
      type:
        offset === 0
          ? MAGENTO.GET_ORDERS_FAILURE
          : MAGENTO.GET_MORE_ORDERS_FAILURE,
      payload: { errorMessage: error.message },
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(LOGIN_SUCCESS, onLoginSuccess);
  yield takeLatest(MAGENTO.CURRENT_USER_REQUEST, getCurrentUser);
  yield takeLatest(ACTION_USER_LOGOUT, clearCustomerAccessToken);
  yield takeLatest(MAGENTO.GET_ORDERS_REQUEST, getOrdersForCustomer);
}
