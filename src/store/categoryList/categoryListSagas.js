import { takeEvery, call, put } from 'redux-saga/effects';
import { MAGENTO } from '../../constants';
import { magento } from '../../magento';

// worker saga: Add Description
function* getCategoryProducts(action) {
  if (action.payload.offset) {
    yield put({ type: MAGENTO.MORE_CATEGORY_PRODUCTS_LOADING });
  } else {
    yield put({
      type: MAGENTO.CATEGORY_PRODUCTS_LOADING,
      payload: { categoryId: action.payload.categoryId },
    });
  }
  try {
    const payload = yield call(
      { context: magento, fn: magento.admin.getCategoryProducts },
      action.payload.categoryId,
      action.payload.offset,
      action.payload.sortOrder,
    );
    yield put({
      type: MAGENTO.CATEGORY_PRODUCTS_SUCCESS,
      payload: { items: payload.items, totalCount: payload.total_count },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.CATEGORY_PRODUCTS_FAILURE,
      payload: { errorMessage: error.message },
    });
  }
}

// worker saga: Add Description
function* updateConfigurableProductsPrice({ payload }) {
  try {
    const children = yield call(
      { context: magento, fn: magento.admin.getConfigurableChildren },
      payload.sku,
    );
    yield put({
      type: MAGENTO.CATEGORY_UPDATE_CONF_PRODUCT_SUCCESS,
      payload: {
        children,
        sku: payload.sku,
      },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.UPDATE_CONF_PRODUCT_FAILURE,
      payload: { errorMessage: error.message },
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeEvery(MAGENTO.CATEGORY_PRODUCTS_REQUEST, getCategoryProducts);
  yield takeEvery(
    MAGENTO.CATEGORY_UPDATE_CONF_PRODUCT_REQUEST,
    updateConfigurableProductsPrice,
  );
}
