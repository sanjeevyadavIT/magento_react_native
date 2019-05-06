import { MAGENTO, ACTION_USER_LOGOUT } from '../actions/actionsTypes';
import Status from '../magento/Status';

const INITIAL_STATE = {
  status: Status.DEFAULT,
  cart: {},
  products: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    // TODO: Move remove item status somewhere else
    case MAGENTO.REMOVE_ITEM_FROM_CART_LOADING:
    case MAGENTO.CUSTOMER_CART_LOADING:
      return {
        ...state,
        status: Status.LOADING,
      };
    case MAGENTO.CUSTOMER_CART_SUCCESS: {
      return {
        ...state,
        status: Status.SUCCESS,
        cart: {
          ...payload.cart
        },
      };
    }
    case MAGENTO.REMOVE_ITEM_FROM_CART_FAILURE:
    case MAGENTO.CUSTOMER_CART_FAILURE:
      return {
        status: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case MAGENTO.CART_ITEM_PRODUCT_SUCCESS: {
      const products = {
        ...state.products,
        [payload.sku]: payload,
      };
      return {
        ...state,
        products,
      };
    }
    case ACTION_USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
