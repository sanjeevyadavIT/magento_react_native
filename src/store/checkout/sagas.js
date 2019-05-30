import { takeLatest, call, put } from 'redux-saga/effects';
import { magento } from '../../magento';
import { MAGENTO } from '../../constants';
import { parseOrderDetail } from '../../utils';

// worker saga: Add Description
function* getCountries() {
  try {
    yield put({ type: MAGENTO.COUNTRIES_LOADING });
    const countries = yield call({ content: magento, fn: magento.admin.getCountries });
    yield put({ type: MAGENTO.COUNTRIES_SUCCESS, payload: { countries } });
  } catch (error) {
    yield put({ type: MAGENTO.COUNTRIES_FAILURE, payload: { errorMessage: error.message } });
  }
};

// worker saga: Add Description
function* addCartBillingAddress({ payload }) {
  try {
    yield put({ type: MAGENTO.ADD_CART_BILLING_ADDRESS_LOADING });
    const result = yield call({ content: magento, fn: magento.customer.addCartBillingAddress }, payload.address);
    yield put({ type: MAGENTO.ADD_CART_BILLING_ADDRESS_SUCCESS, payload: { result } });
  } catch (error) {
    yield put({ type: MAGENTO.ADD_CART_BILLING_ADDRESS_FAILURE, payload: { errorMessage: error.message } });
  }
};

// worker saga: Add Description
function* getShippingMethod({ payload }) {
  try {
    yield put({ type: MAGENTO.GET_SHIPPING_METHOD_LOADING });
    const shipping = yield call({ content: magento, fn: magento.customer.getShippingMethod }, payload.address);
    yield put({ type: MAGENTO.GET_SHIPPING_METHOD_SUCCESS, payload: { shipping } });
  } catch (error) {
    yield put({ type: MAGENTO.GET_SHIPPING_METHOD_FAILURE, payload: { errorMessage: error.message } });
  }
};

// worker saga: Add Description
function* addCartShippingInfo({ payload }) {
  try {
    yield put({ type: MAGENTO.ADD_CART_SHIPPING_INFO_LOADING });
    const payment = yield call({ content: magento, fn: magento.customer.addCartShippingInfo }, payload.address);
    yield put({ type: MAGENTO.ADD_CART_SHIPPING_INFO_SUCCESS, payload: { payment } });
  } catch (error) {
    yield put({ type: MAGENTO.ADD_CART_SHIPPING_INFO_FAILURE, payload: { errorMessage: error.message } });
  }
};

// worker saga: Add Description
function* placeCartOrder({ payload }) {
  try {
    yield put({ type: MAGENTO.PLACE_CART_ORDER_LOADING });
    const orderId = yield call({ content: magento, fn: magento.customer.placeCartOrder }, payload.paymentInformation);
    yield put({ type: MAGENTO.PLACE_CART_ORDER_SUCCESS, payload: { orderId } });
  } catch (error) {
    yield put({ type: MAGENTO.PLACE_CART_ORDER_FAILURE, payload: { errorMessage: error.message } });
  }
};

// worker saga: Add Description
function* getOrderDetail({ payload }) {
  try {
    yield put({ type: MAGENTO.ORDER_DETAIL_LOADING });
    const data = yield call({ content: magento, fn: magento.admin.getOrderDetail }, payload.orderId);
    const order = parseOrderDetail(data);
    yield put({ type: MAGENTO.ORDER_DETAIL_SUCCESS, payload: { order } });
  } catch (error) {
    yield put({ type: MAGENTO.ORDER_DETAIL_FAILURE, payload: { errorMessage: error.message } });
  }
};

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(MAGENTO.COUNTRIES_REQUEST, getCountries);
  yield takeLatest(MAGENTO.ADD_CART_BILLING_ADDRESS_REQUEST, addCartBillingAddress);
  yield takeLatest(MAGENTO.GET_SHIPPING_METHOD_REQUEST, getShippingMethod);
  yield takeLatest(MAGENTO.ADD_CART_SHIPPING_INFO_REQUEST, addCartShippingInfo);
  yield takeLatest(MAGENTO.PLACE_CART_ORDER_REQUEST, placeCartOrder);
  yield takeLatest(MAGENTO.ORDER_DETAIL_REQUEST, getOrderDetail);
}
