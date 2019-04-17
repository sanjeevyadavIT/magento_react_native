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
    yield put({ type: MAGENTO.MORE_CATEGORY_PRODUCTS_LOADING, payload: true });
  } else {
    yield put({ type: MAGENTO.CATEGORY_PRODUCTS_LOADING, payload: true });
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
  } catch (error) {
    yield put({ type: MAGENTO.CATEGORY_PRODUCTS_FAILURE, payload: extractErrorMessage(error) });
  }
};

const catgeoryListSagas = [
  takeEvery(MAGENTO.CATEGORY_PRODUCTS_REQUEST, getCategoryProducts),
];

export default catgeoryListSagas;
