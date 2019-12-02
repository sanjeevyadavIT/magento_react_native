import { MAGENTO, ACTION_USER_LOGOUT } from '../../constants';
import Status from '../../magento/Status';

export const INITIAL_STATE = {
  status: Status.DEFAULT,
  errorMessage: '',
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
        ...state,
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
