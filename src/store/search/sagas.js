import { takeLatest, call, put } from 'redux-saga/effects';
import { magento } from '../../magento';
import { MAGENTO } from '../../constants';

// worker saga: Add Description
function* getSearchProducts(action) {
  if (action.payload.offset) {
    yield put({ type: MAGENTO.MORE_SEARCH_PRODUCTS_LOADING, payload: true });
  } else {
    yield put({ type: MAGENTO.SEARCH_PRODUCTS_LOADING, payload: { loading: true, searchText: action.payload.searchInput } });
  }
  try {
    const payload = yield call(
      { context: magento, fn: magento.admin.getProductsWithAttribute },
      'name',
      `%${action.payload.searchInput}%`,
      action.payload.offset,
      action.payload.sortOrder
    );
    yield put({ type: MAGENTO.SEARCH_PRODUCTS_SUCCESS, payload });
  } catch (error) {
    yield put({ type: MAGENTO.SEARCH_PRODUCTS_FAILURE, payload: error.message });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(MAGENTO.SEARCH_PRODUCTS_REQUEST, getSearchProducts);
}
