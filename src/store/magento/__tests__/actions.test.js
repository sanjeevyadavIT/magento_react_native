import {
  initializeApp,
  changeCurrency,
} from '../actions';

describe('magento actions', () => {
  test('initializeApp()', () => {
    // Exercise
    const result = initializeApp();

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('changeCurrency()', () => {
    // Setup
    const currencyCode = 'USD';
    const currencySymbol = '$';
    const currencyExchangeRate = 1;

    // Exercise
    const result = changeCurrency(currencyCode, currencySymbol, currencyExchangeRate);

    // Verify
    expect(result).toMatchSnapshot();
  });
});
