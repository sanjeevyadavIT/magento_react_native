import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../../magento';
import { MAGENTO, LOGIN_SUCCESS, ACTION_USER_LOGOUT } from '../../constants';
import { parseOrderDetail } from '../../utils';

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

// worker saga: Add description
function* getOrdersForCustomer({ payload }) {
  try {
    yield put({ type: MAGENTO.GET_ORDERS_LOADING });
    const data = yield call(
      { content: magento, fn: magento.admin.getOrderList },
      payload.customerId,
    );
    const orders = data.items.map(parseOrderDetail);
    yield put({ type: MAGENTO.GET_ORDERS_SUCCESS, payload: { orders } });
  } catch (error) {
    yield put({
      type: MAGENTO.GET_ORDERS_FAILURE,
      payload: { errorMessage: error.message },
    });
  }
}

function* getOrderedProductInfo({ payload }) {
  try {
    const product = yield call(
      { content: magento, fn: magento.admin.getProductBySku },
      payload.sku,
    );
    yield put({
      type: MAGENTO.GET_ORDERED_PRODUCT_INFO_SUCCESS,
      payload: { product, sku: payload.sku },
    });
  } catch (error) {
    console.log(error);
  }
}

function* addAccountAddress({ payload }) {
  try {
    yield put({ type: MAGENTO.ADD_ACCOUNT_ADDRESS_LOADING });
    const customer = yield call(
      { content: magento, fn: magento.admin.updateCustomerData },
      payload.customerId,
      payload.customerData,
    );
    yield put({
      type: MAGENTO.ADD_ACCOUNT_ADDRESS_SUCCESS,
      payload: { customer },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.ADD_ACCOUNT_ADDRESS_FAILURE,
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
  yield takeLatest(MAGENTO.ADD_ACCOUNT_ADDRESS_REQUEST, addAccountAddress);
  yield takeEvery(
    MAGENTO.GET_ORDERED_PRODUCT_INFO_REQUEST,
    getOrderedProductInfo,
  );
}
