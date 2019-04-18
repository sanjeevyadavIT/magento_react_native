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

const removeItemFromCart = function* deleteItemFromCart(action) {
  try {
    yield put({ type: MAGENTO.REMOVE_ITEM_FROM_CART_LOADING, payload: true });
    const payload = yield call({ content: magento, fn: magento.customer.removeItemFromCart }, action.payload);
    yield put({ type: MAGENTO.REMOVE_ITEM_FROM_CART_SUCCESS, payload });
    yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST, payload: true }); // Refetch the cart
  } catch (error) {
    yield put({ type: MAGENTO.REMOVE_ITEM_FROM_CART_FAILURE, payload: extractErrorMessage(error) });
  }
};

const cartSagas = [
  takeLatest(MAGENTO.CUSTOMER_CART_REQUEST, getCustomerCart),
  takeEvery(MAGENTO.CART_ITEM_PRODUCT_REQUEST, getCartItemProduct),
  takeEvery(MAGENTO.REMOVE_ITEM_FROM_CART_REQUEST, removeItemFromCart),
];

export default cartSagas;
