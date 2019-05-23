import { takeEvery, call, put } from 'redux-saga/effects';
import { magento } from '../../magento';
import { MAGENTO, MAGENTO_SAVE_PRODUCT_ATTRIBUTE_OPTIONS } from '../../constants/actionsTypes';
import { parseImageArray } from '../../utils';

// worker saga: Add Description
// TODO: Function not optimized
function* getConfigurableProductOptions({ payload: sku }) {
  try {
    yield put({ type: MAGENTO.CONF_OPTIONS_LOADING, payload: true });
    const payload = yield call(
      { content: magento, fn: magento.admin.getConfigurableProductOptions },
      sku,
    );
    yield put({ type: MAGENTO.CONF_OPTIONS_SUCCESS, payload });
    // FIXME: ESlint suggests not to use for loop inside generator
    // eslint-disable-next-line no-restricted-syntax
    for (const option of payload) {
      const attributeOptions = yield call(
        { content: magento, fn: magento.admin.getAttributeByCode },
        option.attribute_id,
      );
      yield put({
        type: MAGENTO_SAVE_PRODUCT_ATTRIBUTE_OPTIONS,
        payload: {
          attributeId: option.attribute_id,
          options: attributeOptions.options,
          attributeCode: attributeOptions.attribute_code,
        }
      });
    }
  } catch (error) {
    yield put({ type: MAGENTO.CONF_OPTIONS_FAILURE, payload: error.message });
  }
}

// worker saga: Add Description
function* getProductMedia({ payload }) {
  try {
    yield put({ type: MAGENTO.PRODUCT_MEDIA_LOADING });
    const response = yield call({ content: magento, fn: magento.admin.getProductMedia }, payload.sku);
    const imageArray = parseImageArray(response);
    yield put({ type: MAGENTO.PRODUCT_MEDIA_SUCCESS, payload: { sku: payload.sku, media: imageArray } });
  } catch (error) {
    yield put({ type: MAGENTO.PRODUCT_MEDIA_FAILURE, payload: { errorMessage: error.message } });
  }
}

// worker saga: Add Description
function* addToCart({ payload }) {
  try {
    yield put({ type: MAGENTO.ADD_TO_CART_LOADING, payload: true });
    if (payload.cartItem.quote_id) {
      const response = yield call({ content: magento, fn: magento.customer.addItemToCart }, payload);
      yield put({ type: MAGENTO.ADD_TO_CART_SUCCESS, payload: response });
      yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST }); // refresh cart
    } else {
      throw new Error('Guest cart not implemented');
    }
  } catch (error) {
    yield put({ type: MAGENTO.ADD_TO_CART_FAILURE, payload: error.message });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeEvery(MAGENTO.CONF_OPTIONS_REQUEST, getConfigurableProductOptions);
  yield takeEvery(MAGENTO.PRODUCT_MEDIA_REQUEST, getProductMedia);
  yield takeEvery(MAGENTO.ADD_TO_CART_REQUEST, addToCart);
}
