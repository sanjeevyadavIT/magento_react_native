import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  saveCustomerToken,
  loadCustomerToken,
  saveThemeType,
  loadThemeType,
  saveCurrencyCode,
  loadCurrencyCode,
} from '../storage';

describe('storage.js', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  test('should save customer token', async () => {
    // Setup
    const customerToken = '123abc';

    // Exercise
    const status = await saveCustomerToken(customerToken);

    // Verify
    expect(status).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'customerToken',
      customerToken,
    );
  });

  test('should load customer token', async () => {
    // setup
    const customerToken = 'abc123';
    await AsyncStorage.setItem('customerToken', customerToken);

    // Exercise
    const result = await loadCustomerToken();

    // Verify
    expect(result).toBe(customerToken);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('customerToken');
  });

  test('should remove customer token', async () => {
    // setup
    const customerToken = 'abc123';
    await AsyncStorage.setItem('customerToken', customerToken);

    // Exercise
    const result = await saveCustomerToken(null);

    // Verify
    expect(result).toBe(true);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('customerToken');
  });

  test('should save theme type', async () => {
    // Setup
    const themeType = 'light';

    // Exercise
    const status = await saveThemeType(themeType);

    // Verify
    expect(status).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('themeType', themeType);
  });

  test('should load theme type', async () => {
    // setup
    const themeType = 'light';
    await AsyncStorage.setItem('themeType', themeType);

    // Exercise
    const result = await loadThemeType();

    // Verify
    expect(result).toBe(themeType);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('themeType');
  });

  test('should remove theme type', async () => {
    // setup
    const themeType = 'light';
    await AsyncStorage.setItem('themeType', themeType);

    // Exercise
    const result = await saveThemeType(null);

    // Verify
    expect(result).toBe(true);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('themeType');
  });

  test('should save currency code', async () => {
    // Setup
    const currencyCode = 'USD';

    // Exercise
    const status = await saveCurrencyCode(currencyCode);

    // Verify
    expect(status).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'currencyCode',
      currencyCode,
    );
  });

  test('should load currency code', async () => {
    // setup
    const currencyCode = 'USD';
    await AsyncStorage.setItem('currencyCode', currencyCode);

    // Exercise
    const result = await loadCurrencyCode();

    // Verify
    expect(result).toBe(currencyCode);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('currencyCode');
  });

  test('should remove currency code', async () => {
    // setup
    const currencyCode = 'USD';
    await AsyncStorage.setItem('currencyCode', currencyCode);

    // Exercise
    const result = await saveCurrencyCode(null);

    // Verify
    expect(result).toBe(true);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('currencyCode');
  });
});
