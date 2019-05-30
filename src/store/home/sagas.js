import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../../magento';
import { magentoOptions } from '../../config/magento';
import { MAGENTO } from '../../constants';
import { formatHomeData } from '../../utils/home';

// worker saga: Add Description
function* initMagento() {
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
    yield put({ type: MAGENTO.INIT_APP_FAILURE, payload: { errorMessage: error.message } });
  }
}

// worker saga: Add Description
function* getHomeData() {
  try {
    yield put({ type: MAGENTO.HOME_DATA_LOADING });
    // Fetch the cms block
    const payload = yield call({ context: magento, fn: magento.getHomeData });
    const formattedPayload = formatHomeData(payload);
    yield put({ type: MAGENTO.HOME_DATA_SUCCESS, payload: formattedPayload });
    yield put({ type: MAGENTO.CATEGORY_TREE_REQUEST }); // fetch category tree
  } catch (error) {
    yield put({ type: MAGENTO.HOME_DATA_FAILURE, payload: { errorMessage: error.message } });
  }
}

// worker saga: Add Description
function* getFeaturedCategoryProducts({ payload }) {
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
    yield put({ type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_ERROR, payload: { categoryId: payload, errorMessage: error.message } });
  }
}

// worker saga: Add Description
function* updateConfigurableProductsPrice({ payload }) {
  const { sku } = payload;
  try {
    const children = yield call({ context: magento, fn: magento.admin.getConfigurableChildren }, sku);
    yield put({
      type: MAGENTO.HOME_UPDATE_CONF_PRODUCT_SUCCESS,
      payload: {
        sku,
        children,
      }
    });
  } catch (error) {
    yield put({ type: MAGENTO.HOME_UPDATE_CONF_PRODUCT_ERROR, payload: { sku, errorMessage: error.message } });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(MAGENTO.INIT_APP_REQUEST, initMagento);
  yield takeLatest(MAGENTO.HOME_DATA_REQUEST, getHomeData);
  yield takeEvery(MAGENTO.FEATURED_CATEGORY_PRODUCTS_REQUEST, getFeaturedCategoryProducts);
  yield takeEvery(MAGENTO.HOME_UPDATE_CONF_PRODUCT_REQUEST, updateConfigurableProductsPrice);
}
