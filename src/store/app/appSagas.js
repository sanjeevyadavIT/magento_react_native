import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN, CURRENCY_CODE } from '../../magento';
import { MAGENTO, USER_LOGGED_IN_STATUS } from '../../constants';
import { magentoOptions } from '../../../config/magento';
import { priceSignByCode } from '../../utils/price';

// worker saga: Add Description
function* initMagento() {
  if (magento.isConfigured()) return;

  try {
    yield put({ type: MAGENTO.INIT_APP_LOADING });
    // Initiliaze magento, with configuration data
    magento.init(magentoOptions);
    // Fetch store config, containing base media url path
    const storeConfig = yield call({
      context: magento,
      fn: magento.admin.getStoreConfig,
    });
    const config = storeConfig.find(conf => conf.code === magentoOptions.store);
    magento.setStoreConfig(config);
    yield put({ type: MAGENTO.INIT_APP_SUCCESS, payload: { config } });
    // fetch currency data
    yield put({ type: MAGENTO.CURRENCY_REQUEST });
    // fetch HomeBanner and featured product
    yield put({ type: MAGENTO.HOME_DATA_REQUEST });
    // fetch category tree
    yield put({ type: MAGENTO.CATEGORY_TREE_REQUEST });
    // Get Customer token from local db
    const customerToken = yield AsyncStorage.getItem(CUSTOMER_TOKEN);
    magento.setCustomerToken(customerToken);
    if (customerToken) {
      yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST }); // Fetch cart details
      yield put({
        type: USER_LOGGED_IN_STATUS,
        payload: { loggedIn: true },
      });
    }
  } catch (error) {
    yield put({
      type: MAGENTO.INIT_APP_FAILURE,
      payload: {
        errorCode: error.name,
        errorMessage: error.message,
      },
    });
  }
}

// worker saga: Add Description
function* getCountries() {
  try {
    yield put({ type: MAGENTO.COUNTRIES_LOADING });
    const countries = yield call({
      content: magento,
      fn: magento.guest.getCountries,
    });
    yield put({ type: MAGENTO.COUNTRIES_SUCCESS, payload: { countries } });
  } catch (error) {
    yield put({
      type: MAGENTO.COUNTRIES_FAILURE,
      payload: { errorMessage: error.message },
    });
  }
}

// worker saga: fetch available currency support with their exchange rates.
function* getCurrency() {
  try {
    yield put({ type: MAGENTO.CURRENCY_LOADING });
    const currencyData = yield call({
      content: magento,
      fn: magento.guest.getCurrency,
    });
    const displayCurrency = yield getCurrencyToBeDisplayed(currencyData);
    yield put({
      type: MAGENTO.CURRENCY_SUCCESS,
      payload: { currencyData, displayCurrency },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.CURRENCY_FAILURE,
      payload: { errorMessage: error.message },
    });
  }
}

function* getCurrencyToBeDisplayed(currencyData) {
  let code = currencyData.default_display_currency_code;
  let symbol =
    currencyData.default_display_currency_symbol || priceSignByCode(code);
  let rate = 1;

  if (
    'available_currency_codes' in currencyData &&
    currencyData.available_currency_codes.length > 0
  ) {
    const previousSelectedCurrencyCode = yield AsyncStorage.getItem(
      CURRENCY_CODE,
    );
    if (
      previousSelectedCurrencyCode &&
      previousSelectedCurrencyCode !== code &&
      previousSelectedCurrencyCode in currencyData.available_currency_codes
    ) {
      code = previousSelectedCurrencyCode;
      symbol = priceSignByCode(code);
    }
    // TODO: If not and currency get from RNLocalize is supported, then set that and update AsyncStorage
  }

  const exchangeRate = currencyData.exchange_rates.find(
    _exchangeRate => _exchangeRate.currency_to === code,
  );

  if (exchangeRate && 'rate' in exchangeRate) {
    // eslint-disable-next-line prefer-destructuring
    rate = exchangeRate.rate;
  }

  return {
    code,
    symbol,
    rate,
  };
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(MAGENTO.INIT_APP_REQUEST, initMagento);
  yield takeLatest(MAGENTO.CURRENCY_REQUEST, getCurrency);
  yield takeLatest(MAGENTO.COUNTRIES_REQUEST, getCountries);
}
