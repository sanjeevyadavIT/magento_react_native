import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../../magento';
import Status from '../../magento/Status';
import { MAGENTO, USER_LOGGED_IN_STATUS } from '../../constants';
import { magentoOptions } from '../../config/magento';

// worker saga: Add Description
function* initMagento() {
  if (magento.isConfigured()) return;

  try {
    yield put({ type: MAGENTO.INIT_APP_LOADING });
    // Set magento base url
    magento.setOptions(magentoOptions);
    // Set magento integration token
    magento.init();
    // Get Customer token from local db
    const customerToken = yield AsyncStorage.getItem(CUSTOMER_TOKEN);
    magento.setCustomerToken(customerToken);
    // Fetch store config, containing base media url path
    const storeConfig = yield call({ context: magento, fn: magento.admin.getStoreConfig });
    magento.setStoreConfig(storeConfig);
    yield put({ type: MAGENTO.INIT_APP_SUCCESS, payload: { storeConfig } });
    // fetch currency data
    yield put({ type: MAGENTO.CURRENCY_REQUEST });
    // fetch HomeBanner and featured product
    yield put({ type: MAGENTO.HOME_DATA_REQUEST });
    if (customerToken) {
      yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST }); // Fetch cart details
      yield put({ type: USER_LOGGED_IN_STATUS, payload: { status: Status.SUCCESS } })
    }
  } catch (error) {
    yield put({ type: MAGENTO.INIT_APP_FAILURE, payload: { errorMessage: error.message } });
  }
}

// worker saga: Add Description
function* getCountries() {
  try {
    yield put({ type: MAGENTO.COUNTRIES_LOADING });
    const countries = yield call({ content: magento, fn: magento.admin.getCountries });
    yield put({ type: MAGENTO.COUNTRIES_SUCCESS, payload: { countries } });
  } catch (error) {
    yield put({ type: MAGENTO.COUNTRIES_FAILURE, payload: { errorMessage: error.message } });
  }
}

// worker saga: Add Description
function* getCurrency() {
  try {
    yield put({ type: MAGENTO.CURRENCY_LOADING });
    const currency = yield call({ content: magento, fn: magento.guest.getCurrency });
    yield put({ type: MAGENTO.CURRENCY_SUCCESS, payload: { currency } });
  } catch (error) {
    yield put({ type: MAGENTO.CURRENCY_FAILURE, payload: { errorMessage: error.message } });
  }
}


// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(MAGENTO.INIT_APP_REQUEST, initMagento);
  yield takeLatest(MAGENTO.CURRENCY_REQUEST, getCurrency);
  yield takeLatest(MAGENTO.COUNTRIES_REQUEST, getCountries);
}
