import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { magento } from '../magento';
import { MAGENTO } from '../actions/actionsTypes';
import { extractErrorMessage } from '../utils';

const getCustomerCart = function* fetchCustomerCart() {
  try {
    yield put({ type: MAGENTO.CUSTOMER_CART_LOADING, payload: true });
    const payload = yield call({ content: magento, fn: magento.customer.getCustomerCart });
    yield put({ type: MAGENTO.CUSTOMER_CART_SUCCESS, payload });
  } catch (error) {
    yield put({ type: MAGENTO.CUSTOMER_CART_FAILURE, payload: extractErrorMessage(error) });
  }
};

const getCartItemProduct = function* fetchCartItemProduct(action) {
  try {
    const payload = yield call({ content: magento, fn: magento.admin.getProductBySku }, action.payload);
    yield put({ type: MAGENTO.CART_ITEM_PRODUCT_SUCCESS, payload });
  } catch (error) {
    yield put({ type: MAGENTO.CART_ITEM_PRODUCT_FAILURE, payload: extractErrorMessage(error) });
  }
};

const cartSagas = [
  takeLatest(MAGENTO.CUSTOMER_CART_REQUEST, getCustomerCart),
  takeEvery(MAGENTO.CART_ITEM_PRODUCT_REQUEST, getCartItemProduct),
];

export default cartSagas;
