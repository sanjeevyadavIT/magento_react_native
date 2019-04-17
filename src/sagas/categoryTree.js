import { takeLatest, call, put } from 'redux-saga/effects';
import { magento } from '../magento';
import { MAGENTO } from '../actions/actionsTypes';
import { extractErrorMessage } from '../utils';

const getCategoryTree = function* fetchCategoryTree() {
  try {
    yield put({ type: MAGENTO.CATEGORY_TREE_LOADING, payload: true });
    const payload = yield call({ context: magento, fn: magento.admin.getCategoryTree });
    yield put({ type: MAGENTO.CATEGORY_TREE_SUCCESS, payload });
  } catch (error) {
    yield put({ type: MAGENTO.CATEGORY_TREE_FAILURE, payload: extractErrorMessage(error) });
  }
};

const categoryTreeSagas = [
  takeLatest(MAGENTO.CATEGORY_TREE_REQUEST, getCategoryTree),
];

export default categoryTreeSagas;
