import { takeLatest, call, put } from 'redux-saga/effects';
import { magento } from '../magento';
import { MAGENTO } from '../actions/actionsTypes';
import { extractErrorMessage } from '../utils';

const getCategoryTree = function* fetchCategoryTree() {
  try {
    yield put({ type: MAGENTO.CATEGORY_TREE_LOADING });
    const categoryTree = yield call({ context: magento, fn: magento.admin.getCategoryTree });
    yield put({ type: MAGENTO.CATEGORY_TREE_SUCCESS, payload: { categoryTree } });
  } catch (error) {
    yield put({ type: MAGENTO.CATEGORY_TREE_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const categoryTreeSagas = [
  takeLatest(MAGENTO.CATEGORY_TREE_REQUEST, getCategoryTree),
];

export default categoryTreeSagas;
