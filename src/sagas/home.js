import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../magento';
import { magentoOptions } from '../config/magento';
import { MAGENTO } from '../actions/actionsTypes';
import { extractErrorMessage } from '../utils';

const initMagento = function* initializeMagento() {
  if (magento.isConfigured()) return;

  try {
    yield put({ type: MAGENTO.INIT_APP_LOADING, payload: true });
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
    // yield app ready
  } catch (error) {
    yield put({ type: MAGENTO.INIT_APP_FAILURE, payload: extractErrorMessage(error) });
  }
};

const getHomeData = function* fetchHomeData() {
  try {
    yield put({ type: MAGENTO.HOME_DATA_LOADING, payload: true });
    // Fetch the cms block
    const payload = yield call({ context: magento, fn: magento.getHomeData });
    // if false, no CMS block is configured
    payload.content = payload.content.replace(/<\/?[^>]+(>|$)/g, '');
    yield put({ type: MAGENTO.HOME_DATA_SUCCESS, payload });

    const homeData = JSON.parse(payload.content);
    const keys = Object.keys(homeData.featuredCategories);
    // Eslint showing error, iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.
    for (const key of keys) {
      yield put({
        type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_REQUEST,
        payload: {
          categoryId: key,
          categoryTitle: homeData.featuredCategories[key].title,
        }
      });
    }
    console.log(keys);
  } catch (error) {
    yield put({ type: MAGENTO.HOME_DATA_FAILURE, payload: extractErrorMessage(error) });
  }
};

const getFeaturedCategoryProducts = function* fetchFeaturedCategoryProducts({ payload }) {
  const { categoryId, categoryTitle } = payload;
  try {
    const products = yield call({ context: magento, fn: magento.admin.getCategoryProducts }, categoryId, 1, undefined, 20);
    yield put({
      type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_SUCCESS,
      payload: {
        categoryId,
        categoryTitle,
        products,
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const homeSagas = [
  takeLatest(MAGENTO.INIT_APP_REQUEST, initMagento),
  takeLatest(MAGENTO.HOME_DATA_REQUEST, getHomeData),
  takeEvery(MAGENTO.FEATURED_CATEGORY_PRODUCTS_REQUEST, getFeaturedCategoryProducts),
];

export default homeSagas;
