import checkoutReducer, { INITIAL_STATE } from '../reducer';
import {
  MAGENTO,
  RESET_PAYMENT_STATE,
  RESET_CHECKOUT_STATE,
  RESET_SHIPPING_STATE,
  RESET_CHECKOUT_ADDRESS_STATE,
} from '../../../constants';
import Status from '../../../magento/Status';

describe('checkout reducer', () => {
  test('should return the initial state', () => {
    // Exercise
    const newState = checkoutReducer(undefined, {});

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle add cart billing address loading', () => {
    // Setup
    const action = {
      type: MAGENTO.ADD_CART_BILLING_ADDRESS_LOADING,
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle add cart billing address success', () => {
    // Setup
    const action = {
      type: MAGENTO.ADD_CART_BILLING_ADDRESS_SUCCESS,
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle add cart billing address failure', () => {
    // Setup
    const action = {
      type: MAGENTO.ADD_CART_BILLING_ADDRESS_FAILURE,
      payload: {
        errorMessage: 'Unable to add billing address to cart.',
      }
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle shipping method loading', () => {
    // Setup
    const action = {
      type: MAGENTO.GET_SHIPPING_METHOD_LOADING,
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle shipping method success', () => {
    // Setup
    const action = {
      type: MAGENTO.GET_SHIPPING_METHOD_SUCCESS,
      payload: {
        shipping: [
          {
            base_amount: 5,
            carrier_title: 'Mock Shipping title',
            method_title: 'MST',
            carrier_code: 'MST',
          }
        ]
      }
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle shipping method failure', () => {
    // Setup
    const action = {
      type: MAGENTO.GET_SHIPPING_METHOD_FAILURE,
      payload: {
        errorMessage: 'No shipping method available.',
      }
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle add cart shipping info loading', () => {
    // Setup
    const action = {
      type: MAGENTO.ADD_CART_SHIPPING_INFO_LOADING,
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle add cart shipping info success', () => {
    // Setup
    const action = {
      type: MAGENTO.ADD_CART_SHIPPING_INFO_SUCCESS,
      payload: {
        payment: {
          totals: {
            // data related to price
          },
          payment_methods: [
            {
              code: 'COD',
              title: 'Cash On Delivery',
            }
          ]
        }
      }
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle add cart shipping info failure', () => {
    // Setup
    const action = {
      type: MAGENTO.ADD_CART_SHIPPING_INFO_FAILURE,
      payload: {
        errorMessage: 'Unable to add cart shipping info.',
      }
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle place cart order loading', () => {
    // Setup
    const action = {
      type: MAGENTO.PLACE_CART_ORDER_LOADING,
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle place cart order success', () => {
    // Setup
    const action = {
      type: MAGENTO.PLACE_CART_ORDER_SUCCESS,
      payload: {
        orderId: 23
      }
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle place cart order failure', () => {
    // Setup
    const action = {
      type: MAGENTO.PLACE_CART_ORDER_FAILURE,
      payload: {
        errorMessage: 'Unable to place order, something went wrong.',
      }
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle order detail loading', () => {
    // Setup
    const action = {
      type: MAGENTO.ORDER_DETAIL_LOADING,
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle order detail success', () => {
    // Setup
    const action = {
      type: MAGENTO.ORDER_DETAIL_SUCCESS,
      payload: {
        order: {
          // dummy order object, not actual representation
          orderId: 23
        }
      }
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle order detail failure', () => {
    // Setup
    const action = {
      type: MAGENTO.ORDER_DETAIL_FAILURE,
      payload: {
        errorMessage: 'Unable to get order detail.',
      }
    };

    // Exercise
    const newState = checkoutReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle reset payment state', () => {
    // Setup
    const action = {
      type: RESET_PAYMENT_STATE,
    };
    const initialState = {
      ...INITIAL_STATE,
      paymentMethodStatus: Status.SUCCESS,
      payment: {
        totals: {},
        payment_methods: [
          {
            code: 'COD',
            title: 'Cash On Delivery',
          }
        ]
      },
    };

    // Exercise
    const newState = checkoutReducer(initialState, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle reset shipping state', () => {
    // Setup
    const action = {
      type: RESET_SHIPPING_STATE,
    };
    const initialState = {
      ...INITIAL_STATE,
      shippingMethodStatus: Status.SUCCESS,
      billingAddressStatus: Status.SUCCESS,
      shipping: [
        {
          base_amount: 5,
          carrier_title: 'Mock Shipping title',
          method_title: 'MST',
          carrier_code: 'MST',
        }
      ],
    };

    // Exercise
    const newState = checkoutReducer(initialState, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle reset checkout address state', () => {
    // Setup
    const action = {
      type: RESET_CHECKOUT_ADDRESS_STATE,
    };
    const initialState = {
      ...INITIAL_STATE,
      billingAddressStatus: Status.SUCCESS
    };

    // Exercise
    const newState = checkoutReducer(initialState, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle reset entire checkout state', () => {
    // Setup
    const action = {
      type: RESET_CHECKOUT_STATE,
    };
    const initialState = {
      ...INITIAL_STATE,
      shippingMethodStatus: Status.SUCCESS,
      billingAddressStatus: Status.SUCCESS,
      shipping: [
        {
          base_amount: 5,
          carrier_title: 'Mock Shipping title',
          method_title: 'MST',
          carrier_code: 'MST',
        }
      ],
      paymentMethodStatus: Status.SUCCESS,
      payment: {
        totals: {},
        payment_methods: [
          {
            code: 'COD',
            title: 'Cash On Delivery',
          }
        ]
      },
    };

    // Exercise
    const newState = checkoutReducer(initialState, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });
});
