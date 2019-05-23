import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../../magento';
import { MAGENTO, ACTION_USER_LOGOUT } from '../../constants/actionsTypes';
import { parseOrderDetail } from '../../utils';

// worker saga: Add description
function* getCurrentUser() {
  try {
    yield put({ type: MAGENTO.CURRENT_USER_LOADING });
    const customer = yield call({ content: magento, fn: magento.customer.getCurrentCustomer });
    yield put({ type: MAGENTO.CURRENT_USER_SUCCESS, payload: { customer } });
  } catch (error) {
    yield put({ type: MAGENTO.CURRENT_USER_FAILURE, payload: { errorMessage: error.message } });
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
    const data = yield call({ content: magento, fn: magento.admin.getOrderList }, payload.customerId);
    const orders = data.items.map(parseOrderDetail);
    yield put({ type: MAGENTO.GET_ORDERS_SUCCESS, payload: { orders } });
  } catch (error) {
    yield put({ type: MAGENTO.GET_ORDERS_FAILURE, payload: { errorMessage: error.message } });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(MAGENTO.CURRENT_USER_REQUEST, getCurrentUser);
  yield takeLatest(ACTION_USER_LOGOUT, clearCustomerAccessToken);
  yield takeLatest(MAGENTO.GET_ORDERS_REQUEST, getOrdersForCustomer);
}
