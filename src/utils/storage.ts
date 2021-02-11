import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNonEmptyString } from './primitiveChecks';

const THEME_TYPE_ASYNC_KEY = 'themeType';
const CUSTOMER_TOKEN_ASYNC_KEY = 'customerToken';
const CURRENCY_CODE_ASYNC_KEY = 'currencyCode';

const saveValue = async (key, value) => {
  try {
    if (isNonEmptyString(value)) {
      await AsyncStorage.setItem(key, value);
    } else {
      await AsyncStorage.removeItem(key);
    }
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const loadValue = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    // error reading value
    return null;
  }
};

export const saveCustomerToken = async token =>
  saveValue(CUSTOMER_TOKEN_ASYNC_KEY, token);

export const loadCustomerToken = async () =>
  loadValue(CUSTOMER_TOKEN_ASYNC_KEY);

export const saveThemeType = async themeType =>
  saveValue(THEME_TYPE_ASYNC_KEY, themeType);

export const loadThemeType = async () => loadValue(THEME_TYPE_ASYNC_KEY);

export const saveCurrencyCode = async code =>
  saveValue(CURRENCY_CODE_ASYNC_KEY, code);

export const loadCurrencyCode = async () =>
  loadValue(CURRENCY_CODE_ASYNC_KEY);
