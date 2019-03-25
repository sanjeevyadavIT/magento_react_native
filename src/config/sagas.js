/**
 * Don't call any function from this file,
 * all the possible actions are defined in src/actions/RestActions.js
 */
import { takeEvery, call, put } from 'redux-saga/effects'
import {
  MAGENTO_INIT,
  MAGENTO_GET_CATEGORY_TREE,
  MAGENTO_SET_CATEGORY_TREE,
  MAGENTO_ERROR_CATEGORY_TREE,
  MAGENTO_GET_CATEGORY_PRODUCTS,
  MAGENTO_SET_CATEGORY_PRODUCTS,
  MAGENTO_ERROR_CATEGORY_PRODUCTS,
  MAGENTO_GET_PRODUCT_DETAIL,
  MAGENTO_SET_PRODUCT_DETAIL,
  MAGENTO_ERROR_PRODUCT_DETAIL,
} from '../actions/types';
import { magento } from '../magento';
import { magentoOptions } from './magento';


const initMagento = function* initializeMagento() {
  try {
    // Set magento url and admin access
    magento.setOptions(magentoOptions);
    // Fetch access token using admin credentials
    yield call({ context: magento, fn: magento.init });
    // Fetch store configuration details
    yield call(magento.admin.getStoreConfig);
  } catch (error) {
    console.log(error);
  }
};

const getCategoryTree = function* fetchCategoryTree() {
  try {
    const payload = yield call({ context: magento, fn: magento.admin.getCategoryTree });
    // dispatch an action to set category tree data
    yield put({ type: MAGENTO_SET_CATEGORY_TREE, payload });
  } catch (error) {
    yield put({ type: MAGENTO_ERROR_CATEGORY_TREE, error });
    console.log(error);
  }
};

const getCategoryProducts = function* fetchCategoryProducts(action) {
  try {
    const payload = yield call({ context: magento, fn: magento.admin.getCategoryProducts }, action.payload);
    // dispatch an action to set products data
    yield put({ type: MAGENTO_SET_CATEGORY_PRODUCTS, payload: { products: payload, totalCount: payload.total_count } });
  } catch (error) {
    yield put({ type: MAGENTO_ERROR_CATEGORY_PRODUCTS, error });
    console.log(error);
  }
};

const getProductDetail = function* fetchProductDetail(action) {
  try {
    const payload = yield call({ context: magento, fn: magento.admin.getProductBySku }, action.payload);
    // dispatch an action to set products data
    yield put({ type: MAGENTO_SET_PRODUCT_DETAIL, payload });
  } catch (error) {
    yield put({ type: MAGENTO_ERROR_PRODUCT_DETAIL, error });
    console.log(error);
  }
};

const rootSaga = function* processActionDispatch() {
  yield takeEvery(MAGENTO_INIT, initMagento);
  yield takeEvery(MAGENTO_GET_CATEGORY_TREE, getCategoryTree);
  yield takeEvery(MAGENTO_GET_CATEGORY_PRODUCTS, getCategoryProducts);
  yield takeEvery(MAGENTO_GET_PRODUCT_DETAIL, getProductDetail);
};

export default rootSaga;
