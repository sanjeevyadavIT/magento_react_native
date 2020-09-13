import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { magento } from '../../magento';
import { MAGENTO } from '../../constants';

// wroker saga: Add description
function* createQuoteId() {
  try {
    yield put({ type: MAGENTO.CREATE_QUOTE_ID_LOADING });
    const quoteId = yield call({
      content: magento,
      fn: magento.customer.createQuoteId,
    });
    yield put({ type: MAGENTO.CREATE_QUOTE_ID_SUCCESS, payload: { quoteId } });
    yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST });
  } catch (error) {
    yield put({
      type: MAGENTO.CREATE_QUOTE_ID_FAILURE,
      payload: { errorMessage: error.message },
    });
  }
}

// wroker saga: Add description
// FIXME: Potential infinite loop, cart error => calls create quote => create quote calls again this function
function* getCustomerCart() {
  try {
    yield put({ type: MAGENTO.CUSTOMER_CART_LOADING });
    const cart = yield call({
      content: magento,
      fn: magento.customer.getCustomerCart,
    });
    yield put({ type: MAGENTO.CUSTOMER_CART_SUCCESS, payload: { cart } });
  } catch (error) {
    yield put({
      type: MAGENTO.CUSTOMER_CART_FAILURE,
      payload: { errorMessage: error.message },
    });
    if (error.message.startsWith('No such entity with')) {
      yield put({ type: MAGENTO.CREATE_QUOTE_ID_REQUEST });
    }
  }
}

// worker saga: Add description
function* removeItemFromCart({ payload }) {
  try {
    yield put({ type: MAGENTO.REMOVE_ITEM_FROM_CART_LOADING });
    const isSuccessfullyRemoved = yield call(
      { content: magento, fn: magento.customer.removeItemFromCart },
      payload.itemId,
    );
    yield put({
      type: MAGENTO.REMOVE_ITEM_FROM_CART_SUCCESS,
      payload: { isSuccessfullyRemoved },
    });
    yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST }); // Refetch the cart
  } catch (error) {
    yield put({
      type: MAGENTO.REMOVE_ITEM_FROM_CART_FAILURE,
      payload: error.message,
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(MAGENTO.CREATE_QUOTE_ID_REQUEST, createQuoteId);
  yield takeLatest(MAGENTO.CUSTOMER_CART_REQUEST, getCustomerCart);
  yield takeEvery(MAGENTO.REMOVE_ITEM_FROM_CART_REQUEST, removeItemFromCart);
}
