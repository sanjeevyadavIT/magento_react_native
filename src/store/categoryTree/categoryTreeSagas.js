import { takeLatest, call, put } from 'redux-saga/effects';
import { magento } from '../../magento';
import { MAGENTO } from '../../constants';

// worker saga: Add description
function* getCategoryTree() {
  try {
    yield put({ type: MAGENTO.CATEGORY_TREE_LOADING });
    const categoryTree = yield call({
      context: magento,
      fn: magento.admin.getCategoryTree,
    });
    yield put({
      type: MAGENTO.CATEGORY_TREE_SUCCESS,
      payload: { categoryTree },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.CATEGORY_TREE_FAILURE,
      payload: { errorMessage: error.message },
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(MAGENTO.CATEGORY_TREE_REQUEST, getCategoryTree);
}
