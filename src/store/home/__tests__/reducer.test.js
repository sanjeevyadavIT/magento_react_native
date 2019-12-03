import homeReducer, { INITIAL_STATE } from '../reducer';
import { MAGENTO } from '../../../constants';
import Status from '../../../magento/Status';

describe('home reducer', () => {
  test('should return the initial state', () => {
    // Exercise
    const newState = homeReducer(undefined, {});

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle init app failure', () => {
    // Setup
    const action = {
      type: MAGENTO.INIT_APP_FAILURE,
      payload: {
        errorMessage: 'Invalid intregation token'
      }
    };

    // Exercise
    const newState = homeReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle home data loading', () => {
    // Setup
    const action = {
      type: MAGENTO.HOME_DATA_LOADING,
    };

    // Exercise
    const newState = homeReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle home data success', () => {
    // Setup
    const action = {
      type: MAGENTO.HOME_DATA_SUCCESS,
      payload: {
        30: {
          // dummy object
        },
        31: {
          // dummy object
        },
        slider: [
          // dummy object
        ]
      }
    };

    // Exercise
    const newState = homeReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle home data failure', () => {
    // Setup
    const action = {
      type: MAGENTO.HOME_DATA_FAILURE,
      payload: {
        errorCode: 23,
        errorMessage: 'Inavlid block id.'
      }
    };

    // Exercise
    const newState = homeReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle featured category products loading', () => {
    // Setup
    const categoryId = 30;
    const action = {
      type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_LOADING,
      payload: {
        categoryId,
      }
    };
    const initialState = {
      ...INITIAL_STATE,
      [categoryId]: {
        errorMessage: '',
        items: [],
        status: Status.DEFAULT,
      }
    };

    // Exercise
    const newState = homeReducer(initialState, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle featured category products success', () => {
    // Setup
    const action = {
      type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_SUCCESS,
      payload: {
        categoryId: 30,
        products: {
          items: [
            {
              // dummy object
              id: 968
            }
          ]
        }
      }
    };

    // Exercise
    const newState = homeReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle featured category products failure', () => {
    // Setup
    const action = {
      type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_FAILURE,
      payload: {
        categoryId: 30,
        errorMessage: 'Inavlid category Id.'
      }
    };

    // Exercise
    const newState = homeReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle home update configurable product detail success', () => {
    // Setup
    const action = {
      type: MAGENTO.HOME_UPDATE_CONF_PRODUCT_SUCCESS,
      payload: {
        sku: 'MSH12',
        children: [{}, {}, {}],
        price: {
          starting: 27,
          ending: 27,
        }
      }
    };
    const initialState = {
      ...INITIAL_STATE,
      extra: {
        MSH07: {
          price: {
            starting: 35,
            ending: 35,
          },
          children: [{}, {}]
        }
      }
    };

    // Exercise
    const newState = homeReducer(initialState, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });
});
