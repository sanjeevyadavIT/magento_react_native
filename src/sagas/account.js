import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../magento';
import { MAGENTO, ACTION_USER_LOGOUT } from '../actions/actionsTypes';
import { parseOrderDetail, extractErrorMessage } from '../utils';

const getCurrentUser = function* fetchCurrentUser() {
  try {
    yield put({ type: MAGENTO.CURRENT_USER_LOADING });
    const customer = yield call({ content: magento, fn: magento.customer.getCurrentCustomer });
    yield put({ type: MAGENTO.CURRENT_USER_SUCCESS, payload: { customer } });
  } catch (error) {
    yield put({ type: MAGENTO.CURRENT_USER_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const clearCustomerAccessToken = function* clearCustomerAccessToken() {
  magento.setCustomerToken(null);
  yield AsyncStorage.removeItem(CUSTOMER_TOKEN);
};

const getOrdersForCustomer = function* getOrdersForCustomer({ payload }) {
  try {
    yield put({ type: MAGENTO.GET_ORDERS_LOADING });
    const data = yield call({ content: magento, fn: magento.admin.getOrderList }, payload.customerId);
    const orders = data.items.map(parseOrderDetail);
    yield put({ type: MAGENTO.GET_ORDERS_SUCCESS, payload: { orders } });
  } catch (error) {
    yield put({ type: MAGENTO.GET_ORDERS_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const accountSagas = [
  takeLatest(MAGENTO.CURRENT_USER_REQUEST, getCurrentUser),
  takeLatest(ACTION_USER_LOGOUT, clearCustomerAccessToken),
  takeLatest(MAGENTO.GET_ORDERS_REQUEST, getOrdersForCustomer),
];

export default accountSagas;
