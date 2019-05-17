import { takeLatest, call, put } from 'redux-saga/effects';
import { magento } from '../magento';
import { MAGENTO } from '../actions/actionsTypes';
import { parseOrderDetail, extractErrorMessage } from '../utils';

const getCountries = function* fetchCountries() {
  try {
    yield put({ type: MAGENTO.COUNTRIES_LOADING });
    const countries = yield call({ content: magento, fn: magento.admin.getCountries });
    yield put({ type: MAGENTO.COUNTRIES_SUCCESS, payload: { countries } });
  } catch (error) {
    yield put({ type: MAGENTO.COUNTRIES_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const addCartBillingAddress = function* postCartBillingAddress({ payload }) {
  try {
    yield put({ type: MAGENTO.ADD_CART_BILLING_ADDRESS_LOADING });
    const result = yield call({ content: magento, fn: magento.customer.addCartBillingAddress }, payload.address);
    yield put({ type: MAGENTO.ADD_CART_BILLING_ADDRESS_SUCCESS, payload: { result } });
  } catch (error) {
    yield put({ type: MAGENTO.ADD_CART_BILLING_ADDRESS_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const getShippingMethod = function* fetchShippingMethod({ payload }) {
  try {
    yield put({ type: MAGENTO.GET_SHIPPING_METHOD_LOADING });
    const shipping = yield call({ content: magento, fn: magento.customer.getShippingMethod }, payload.address);
    yield put({ type: MAGENTO.GET_SHIPPING_METHOD_SUCCESS, payload: { shipping } });
  } catch (error) {
    yield put({ type: MAGENTO.GET_SHIPPING_METHOD_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const addCartShippingInfo = function* postCartShippingInfo({ payload }) {
  try {
    yield put({ type: MAGENTO.ADD_CART_SHIPPING_INFO_LOADING });
    const payment = yield call({ content: magento, fn: magento.customer.addCartShippingInfo }, payload.address);
    yield put({ type: MAGENTO.ADD_CART_SHIPPING_INFO_SUCCESS, payload: { payment } });
  } catch (error) {
    yield put({ type: MAGENTO.ADD_CART_SHIPPING_INFO_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const placeCartOrder = function* placeCartOrder({ payload }) {
  try {
    yield put({ type: MAGENTO.PLACE_CART_ORDER_LOADING });
    const orderId = yield call({ content: magento, fn: magento.customer.placeCartOrder }, payload.paymentInformation);
    yield put({ type: MAGENTO.PLACE_CART_ORDER_SUCCESS, payload: { orderId } });
  } catch (error) {
    yield put({ type: MAGENTO.PLACE_CART_ORDER_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const getOrderDetail = function* getOrderDetail({ payload }) {
  try {
    yield put({ type: MAGENTO.ORDER_DETAIL_LOADING });
    const data = yield call({ content: magento, fn: magento.admin.getOrderDetail }, payload.orderId);
    const order = parseOrderDetail(data);
    yield put({ type: MAGENTO.ORDER_DETAIL_SUCCESS, payload: { order } });
  } catch (error) {
    yield put({ type: MAGENTO.ORDER_DETAIL_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const checkoutSagas = [
  takeLatest(MAGENTO.COUNTRIES_REQUEST, getCountries),
  takeLatest(MAGENTO.ADD_CART_BILLING_ADDRESS_REQUEST, addCartBillingAddress),
  takeLatest(MAGENTO.GET_SHIPPING_METHOD_REQUEST, getShippingMethod),
  takeLatest(MAGENTO.ADD_CART_SHIPPING_INFO_REQUEST, addCartShippingInfo),
  takeLatest(MAGENTO.PLACE_CART_ORDER_REQUEST, placeCartOrder),
  takeLatest(MAGENTO.ORDER_DETAIL_REQUEST, getOrderDetail),
];

export default checkoutSagas;
