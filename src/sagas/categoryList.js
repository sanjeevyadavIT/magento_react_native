import {
  takeEvery,
  call,
  put
} from 'redux-saga/effects';
import { MAGENTO } from '../actions/actionsTypes';
import { magento } from '../magento';
import { extractErrorMessage } from '../utils';

const getCategoryProducts = function* fetchCategoryProducts(action) {
  if (action.payload.offset) {
    yield put({ type: MAGENTO.MORE_CATEGORY_PRODUCTS_LOADING });
  } else {
    yield put({ type: MAGENTO.CATEGORY_PRODUCTS_LOADING, payload: { categoryId: action.payload.categoryId } });
  }
  try {
    const payload = yield call(
      { context: magento, fn: magento.admin.getCategoryProducts },
      action.payload.categoryId,
      action.payload.offset,
      action.payload.sortOrder
    );
    yield put({
      type: MAGENTO.CATEGORY_PRODUCTS_SUCCESS,
      payload: { items: payload.items, totalCount: payload.total_count }
    });
    /*for( const product of payload.items ) {
      yield put({
        type: MAGENTO.UPDATE_CONF_PRODUCT_REQUEST,
        payload: product,
      });
    }*/
  } catch (error) {
    yield put({ type: MAGENTO.CATEGORY_PRODUCTS_FAILURE, payload:{ errorMessage: extractErrorMessage(error) } });
  }
};

const updateConfigurableProductsPrice = function* fetchConfigurableProductPrice({ payload: product }) {
  if (product.type_id === 'configurable') {
    try {
      const children = yield call({ context: magento, fn: magento.admin.getConfigurableChildren }, product.sku);
      yield put({
        type: MAGENTO.UPDATE_CONF_PRODUCT_SUCCESS,
        payload: {
          children,
          sku: product.sku,
        },
      });
    } catch (error) {
      yield put({
        type: MAGENTO.UPDATE_CONF_PRODUCT_FAILURE,
        payload: extractErrorMessage(error) 
      });
    }
  }
}

const catgeoryListSagas = [
  takeEvery(MAGENTO.CATEGORY_PRODUCTS_REQUEST, getCategoryProducts),
  takeEvery(MAGENTO.UPDATE_CONF_PRODUCT_REQUEST, updateConfigurableProductsPrice),
];

export default catgeoryListSagas;
