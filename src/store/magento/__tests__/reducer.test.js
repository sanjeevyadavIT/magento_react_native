import magentoReducer, { INITIAL_STATE } from '../reducer';
import { MAGENTO } from '../../../constants';

describe('magento reducer', () => {
  test('should return the initial state', () => {
    // Exercise
    const newState = magentoReducer(undefined, {});

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle init app loading', () => {
    // Setup
    const action = {
      type: MAGENTO.INIT_APP_LOADING,
    };

    // Exercise
    const newState = magentoReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle init app success', () => {
    // Setup
    const action = {
      type: MAGENTO.INIT_APP_SUCCESS,
      payload: {
        storeConfig: [
          {
            id: 1,
          }
        ]
      }
    };

    // Exercise
    const newState = magentoReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle init app failure', () => {
    // Setup
    const action = {
      type: MAGENTO.INIT_APP_FAILURE,
      payload: {
        errorMessage: 'Unable to initialize app.'
      }
    };

    // Exercise
    const newState = magentoReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle currency loading', () => {
    // Setup
    const action = {
      type: MAGENTO.CURRENCY_LOADING,
    };

    // Exercise
    const newState = magentoReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle currency success', () => {
    // Setup
    const action = {
      type: MAGENTO.CURRENCY_SUCCESS,
      payload: {
        currencyData: {
          available_currency_codes: ['INR', 'USD'],
          base_currency_code: 'USD',
          base_currency_symbol: '$',
          default_display_currency_code: 'INR',
          default_display_currency_symbol: '₹',
          exchange_rates: [],
        },
        displayCurrency: {
          code: 'USD',
          symbol: '$',
          rate: 1
        }
      }
    };

    // Exercise
    const newState = magentoReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle currency failure', () => {
    // Setup
    const action = {
      type: MAGENTO.CURRENCY_FAILURE,
      payload: {
        errorMessage: 'Unable to fetch currency.'
      }
    };

    // Exercise
    const newState = magentoReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle country loading', () => {
    // Setup
    const action = {
      type: MAGENTO.COUNTRIES_LOADING,
    };

    // Exercise
    const newState = magentoReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle country success', () => {
    // Setup
    const action = {
      type: MAGENTO.COUNTRIES_SUCCESS,
      payload: {
        countries: [
          {
            id: 'IN'
          },
          {
            id: 'US'
          }
        ]
      }
    };

    // Exercise
    const newState = magentoReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle country failure', () => {
    // Setup
    const action = {
      type: MAGENTO.COUNTRIES_FAILURE,
      payload: {
        errorMessage: 'Unable to fetch country data.'
      }
    };

    // Exercise
    const newState = magentoReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });
});
