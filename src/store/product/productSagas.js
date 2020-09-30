import { takeEvery, call, put } from 'redux-saga/effects';
import { magento } from '../../magento';
import { MAGENTO } from '../../constants';

/*
 * Selector. Access attributes from the store
 */
// export const getAttributesFromStore = state => state.product.attributes;

// worker saga: Add Description
// TODO: Remove this
function* getAttributeById({ payload: { id } }) {
  try {
    yield put({ type: MAGENTO.GET_ATTRIBUTE_LOADING, payload: { id } });
    const response = yield call(
      { content: magento, fn: magento.admin.getAttributeById },
      id,
    );
    yield put({
      type: MAGENTO.GET_ATTRIBUTE_SUCCESS,
      payload: {
        id,
        data: formatAttributesResponse(response),
      },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.GET_ATTRIBUTE_FAILURE,
      payload: { id, errorMessage: error.message },
    });
  }
}

// Helper function to format array reponse into key value pairs in object
function formatAttributesResponse(response) {
  const newResponse = {
    code: response.attribute_code,
    label: response.default_frontend_label,
    options: {},
  };
  response.options.forEach(item => {
    newResponse.options[item.value] = item.label;
  });
  return newResponse;
}

/**
 * Fetch product detail using it's sku
 *
 * @param {object} action - Redux action object
 * @param {string} sku    - Id of the product whose details need to be fetched
 */
function* getProductDetail({ payload: { sku } }) {
  try {
    const productDetail = yield call(
      { content: magento, fn: magento.admin.getProductBySku },
      sku,
    );
    yield put({
      type: MAGENTO.PRODUCT_DETAIL_SUCCESS,
      payload: {
        sku,
        productDetail,
      },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.PRODUCT_DETAIL_FAILURE,
      payload: error.message,
    });
  }
}

function* getProductMedia({ payload: { sku } }) {
  try {
    yield put({ type: MAGENTO.GET_PRODUCT_MEDIA_LOADING, payload: { sku } });
    const response = yield call(
      { content: magento, fn: magento.admin.getProductMedia },
      sku,
    );
    yield put({
      type: MAGENTO.GET_PRODUCT_MEDIA_SUCCESS,
      payload: { sku, media: response },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.GET_PRODUCT_MEDIA_FAILURE,
      payload: { sku, errorMessage: error.message },
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeEvery(MAGENTO.GET_ATTRIBUTE_REQUEST, getAttributeById);
  yield takeEvery(MAGENTO.PRODUCT_DETAIL_REQUEST, getProductDetail);
  yield takeEvery(MAGENTO.GET_PRODUCT_MEDIA_REQUEST, getProductMedia);
}
