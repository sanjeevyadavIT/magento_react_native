import { takeEvery, call, put } from 'redux-saga/effects';
import { magento } from '../magento';
import { MAGENTO, MAGENTO_SAVE_PRODUCT_ATTRIBUTE_OPTIONS } from '../actions/actionsTypes';
import { extractErrorMessage } from '../utils';

// TODO: Function not optimized
const getConfigurableProductOptions = function* fetchConfigurableProductOptions({ payload: sku }) {
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
    yield put({ type: MAGENTO.CONF_OPTIONS_FAILURE, payload: extractErrorMessage(error) });
  }
};

const getProductMedia = function* fetchProductMedia({ payload: sku }) {
  try {
    yield put({ type: MAGENTO.PRODUCT_MEDIA_LOADING, payload: true });
    const payload = yield call({ content: magento, fn: magento.admin.getProductMedia }, sku);
    yield put({ type: MAGENTO.PRODUCT_MEDIA_SUCCESS, payload: { sku, media: payload } });
  } catch (error) {
    yield put({ type: MAGENTO.PRODUCT_MEDIA_FAILURE, payload: extractErrorMessage(error) });
  }
};

const addToCart = function* addTocart({ payload }) {
  try {
    yield put({ type: MAGENTO.ADD_TO_CART_LOADING, payload: true });
    if (payload.cartItem.quote_id) {
      const response = yield call({ content: magento, fn: magento.customer.addToCart }, payload);
      yield put({ type: MAGENTO.ADD_TO_CART_SUCCESS, payload: response });
      yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST }); // refresh cart
    } else {
      throw new Error('Guest cart not implemented');
    }
  } catch (error) {
    yield put({ type: MAGENTO.PADD_TO_CART_FAILURE, payload: extractErrorMessage(error) });
  }
};

const productSagas = [
  takeEvery(MAGENTO.CONF_OPTIONS_REQUEST, getConfigurableProductOptions),
  takeEvery(MAGENTO.PRODUCT_MEDIA_REQUEST, getProductMedia),
  takeEvery(MAGENTO.ADD_TO_CART_REQUEST, addToCart),
];

export default productSagas;
