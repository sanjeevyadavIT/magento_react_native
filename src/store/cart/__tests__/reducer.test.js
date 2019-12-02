import cartReducer, { INITIAL_STATE } from '../reducer';
import {
  MAGENTO,
  ACTION_USER_LOGOUT,
} from '../../../constants';

describe('cart reducer', () => {
  test('should return the initial state', () => {
    // Exercise
    const newState = cartReducer(undefined, {});

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle remove item from cart loading', () => {
    // Setup
    const action = {
      type: MAGENTO.REMOVE_ITEM_FROM_CART_LOADING,
    };

    // Exercise
    const newState = cartReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle remove item from cart failure', () => {
    // Setup
    const action = {
      type: MAGENTO.REMOVE_ITEM_FROM_CART_FAILURE,
      payload: {
        errorMessage: 'Unable to remove item from cart',
      }
    };

    // Exercise
    const newState = cartReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle customer cart loading', () => {
    // Setup
    const action = {
      type: MAGENTO.CUSTOMER_CART_LOADING,
    };

    // Exercise
    const newState = cartReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle customer cart success', () => {
    // Setup
    const action = {
      type: MAGENTO.CUSTOMER_CART_SUCCESS,
      payload: {
        cart: {
          // Dummy cart object(not actual representation)
          mockCartId: 2
        }
      }
    };

    // Exercise
    const newState = cartReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle customer cart failure', () => {
    // Setup
    const action = {
      type: MAGENTO.CUSTOMER_CART_FAILURE,
      payload: {
        errorMessage: 'Unable to access cart',
      }
    };

    // Exercise
    const newState = cartReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle cart item product info success', () => {
    // Setup
    const action = {
      type: MAGENTO.CART_ITEM_PRODUCT_SUCCESS,
      payload: {
        // dummy object(Not actual representation)
        sku: 'WH02-S',
        title: 'Product Title',
        price: 0
      }
    };

    // Exercise
    const newState = cartReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });

  test('should handle user logout', () => {
    // Setup
    const action = {
      type: ACTION_USER_LOGOUT,
    };

    // Exercise
    const newState = cartReducer(INITIAL_STATE, action);

    // Verify
    expect(newState).toMatchSnapshot();
  });
});
