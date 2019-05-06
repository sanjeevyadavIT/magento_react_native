import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../magento';
import { magentoOptions } from '../config/magento';
import { MAGENTO } from '../actions/actionsTypes';
import { delay, extractErrorMessage } from '../utils';
import { formatHomeData } from '../utils/home';

const initMagento = function* initializeMagento() {
  if (magento.isConfigured()) return;

  try {
    yield put({ type: MAGENTO.INIT_APP_LOADING });
    // Set magento base url and admin access
    magento.setOptions(magentoOptions);
    // Get Customer token from local db
    const customerToken = yield AsyncStorage.getItem(CUSTOMER_TOKEN);
    magento.setCustomerToken(customerToken);
    // Fetch admin access token using credentials
    yield call({ context: magento, fn: magento.init });
    // Fetch store config, containing base media url path
    yield call({ context: magento, fn: magento.admin.getStoreConfig });
    yield put({ type: MAGENTO.INIT_APP_SUCCESS });
    // fetch HomeBanner and featured product
    yield put({ type: MAGENTO.HOME_DATA_REQUEST });
    if (customerToken) {
      yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST }); // Fetch cart details
    }
  } catch (error) {
    yield put({ type: MAGENTO.INIT_APP_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const getHomeData = function* fetchHomeData() {
  try {
    yield put({ type: MAGENTO.HOME_DATA_LOADING });
    // Fetch the cms block
    const payload = yield call({ context: magento, fn: magento.getHomeData });
    const formattedPayload = formatHomeData(payload);
    yield put({ type: MAGENTO.HOME_DATA_SUCCESS, payload: formattedPayload });
    yield put({ type: MAGENTO.CATEGORY_TREE_REQUEST }); // fetch category tree
  } catch (error) {
    yield put({ type: MAGENTO.HOME_DATA_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const getFeaturedCategoryProducts = function* fetchFeaturedCategoryProducts({ payload }) {
  const { categoryId } = payload;
  try {
    yield put({
      type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_LOADING,
      payload: {
        categoryId,
        loading: true,
      }
    });
    const products = yield call({ context: magento, fn: magento.admin.getCategoryProducts }, categoryId, 1, undefined, 20);
    yield put({
      type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_SUCCESS,
      payload: {
        categoryId,
        products,
      }
    });
  } catch (error) {
    yield put({ type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_ERROR, payload: { categoryId: payload, errorMessage: extractErrorMessage(error) } });
  }
};

const homeSagas = [
  takeLatest(MAGENTO.INIT_APP_REQUEST, initMagento),
  takeLatest(MAGENTO.HOME_DATA_REQUEST, getHomeData),
  takeEvery(MAGENTO.FEATURED_CATEGORY_PRODUCTS_REQUEST, getFeaturedCategoryProducts),
];

export default homeSagas;
