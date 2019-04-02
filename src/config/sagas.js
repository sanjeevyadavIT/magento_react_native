/**
 * Don't call any function from this file,
 * all the possible actions are defined in src/actions/RestActions.js
 */
import { takeEvery, call, put } from 'redux-saga/effects'
import {
  MAGENTO_INIT,
  MAGENTO_GET_HOME_DATA,
  MAGENTO_SET_HOME_DATA,
  MAGENTO_NO_HOME_DATA,
  MAGENTO_ERROR_HOME_DATA,
  MAGENTO_GET_CATEGORY_TREE,
  MAGENTO_SET_CATEGORY_TREE,
  MAGENTO_ERROR_CATEGORY_TREE,
  MAGENTO_GET_CATEGORY_PRODUCTS,
  MAGENTO_SET_CATEGORY_PRODUCTS,
  MAGENTO_ERROR_CATEGORY_PRODUCTS,
  MAGENTO_GET_PRODUCT_MEDIA,
  MAGENTO_SET_PRODUCT_MEDIA,
  MAGENTO_ERROR_PRODUCT_MEDIA,
  MAGENTO_GET_CONF_OPTIONS,
  MAGENTO_SET_CONF_OPTIONS,
  MAGENTO_ERROR_CONF_OPTIONS,
  MAGENTO_SET_PRODUCT_ATTRIBUTE_OPTIONS,
  MAGENTO_GET_SEARCH_PRODUCTS,
  MAGENTO_SET_SEARCH_PRODUCTS,
  MAGENTO_ERROR_SEARCH_PRODUCTS,
  MAGENTO_AUTH,
  MAGENTO_AUTH_ERROR,
  MAGENTO_AUTH_SUCCESS,
  MAGENTO_AUTH_LOADING,
} from '../actions/types';
import { magento } from '../magento';
import { magentoOptions } from './magento';


const initMagento = function* initializeMagento() {
  if (magento.isConfigured()) return;

  try {
    // Set magento url and admin access
    magento.setOptions(magentoOptions);
    // Fetch access token using admin credentials
    yield call({ context: magento, fn: magento.init });
    // Fetch store configuration details
    yield call(magento.admin.getStoreConfig);
    // fetch HomeData
    yield put({ type: MAGENTO_GET_HOME_DATA });
  } catch (error) {
    console.log(error);
  }
};

const getHomeData = function* fetchHomeData() {
  try {
    // Fetch the cms block
    const payload = yield call({ context: magento, fn: magento.getHomeData });
    // if false, no CMS block is configured
    if (payload !== false) {
      payload.content = payload.content.replace(/<\/?[^>]+(>|$)/g, '');
      yield put({ type: MAGENTO_SET_HOME_DATA, payload });
    } else {
      yield put({ type: MAGENTO_NO_HOME_DATA });
    }
  } catch (error) {
    yield put({ type: MAGENTO_ERROR_HOME_DATA, error });
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

// TODO: Function not optimized
const getConfigurableProductOptions = function* fetchConfigurableProductOptions({ payload: sku }) {
  try {
    const payload = yield call({ content: magento, fn: magento.admin.getConfigurableProductOptions }, sku);
    yield put({ type: MAGENTO_SET_CONF_OPTIONS, payload });
    // FIXME: ESlint suggests not to use for loop inside generator
    // eslint-disable-next-line no-restricted-syntax
    for (const option of payload) {
      const attributeOptions = yield call({ content: magento, fn: magento.admin.getAttributeByCode }, option.attribute_id);
      yield put({
        type: MAGENTO_SET_PRODUCT_ATTRIBUTE_OPTIONS,
        payload: {
          attributeId: option.attribute_id,
          options: attributeOptions.options,
          attributeCode: attributeOptions.attribute_code,
        }
      });
    }
  } catch (error) {
    yield put({ type: MAGENTO_ERROR_CONF_OPTIONS, error });
    console.log(error);
  }
};

const getProductMedia = function* fetchProductMedia({ payload: sku }) {
  try {
    const payload = yield call({ content: magento, fn: magento.admin.getProductMedia }, sku);
    yield put({ type: MAGENTO_SET_PRODUCT_MEDIA, payload: { sku, media: payload } });
  } catch (error) {
    yield put({ type: MAGENTO_ERROR_PRODUCT_MEDIA, error });
    console.log(error);
  }
};

const getSearchProducts = function* fetchSearchProducts(action) {
  try {
    const payload = yield call({ context: magento, fn: magento.admin.getProductsWithAttribute }, 'name', `%${action.payload}%`);
    // dispatch an action to set products data
    yield put({ type: MAGENTO_SET_SEARCH_PRODUCTS, payload: { searchInput: action.payload, products: payload, totalCount: payload.total_count } });
  } catch (error) {
    yield put({ type: MAGENTO_ERROR_SEARCH_PRODUCTS, error });
    console.log(error);
  }
};

const auth = function* auth(action) {
  yield put({ type: MAGENTO_AUTH_LOADING, payload: true });
  try {
    const payload = yield call({ content: magento, fn: magento.guest.auth }, action.payload.email, action.payload.password);
    if (payload.message) {
      yield put({ type: MAGENTO_AUTH_ERROR, payload: payload.message });
    } else {
      yield put({ type: MAGENTO_AUTH_SUCCESS, payload });
    }
  } catch (e) {
    console.log(e);
    yield put({ type: MAGENTO_AUTH_ERROR, payload: e.message });
  }
};

const rootSaga = function* processActionDispatch() {
  yield takeEvery(MAGENTO_INIT, initMagento);
  yield takeEvery(MAGENTO_GET_HOME_DATA, getHomeData);
  yield takeEvery(MAGENTO_GET_CATEGORY_TREE, getCategoryTree);
  yield takeEvery(MAGENTO_GET_CATEGORY_PRODUCTS, getCategoryProducts);
  yield takeEvery(MAGENTO_GET_CONF_OPTIONS, getConfigurableProductOptions);
  yield takeEvery(MAGENTO_GET_PRODUCT_MEDIA, getProductMedia);
  yield takeEvery(MAGENTO_GET_SEARCH_PRODUCTS, getSearchProducts);
  yield takeEvery(MAGENTO_AUTH, auth);
};

export default rootSaga;
