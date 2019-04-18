import { MAGENTO } from '../actions/actionsTypes';

const INITIAL_STATE = {
  loading: false,
  error: null,
  cart: {},
  products: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAGENTO.REMOVE_ITEM_FROM_CART_LOADING:
    case MAGENTO.CUSTOMER_CART_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MAGENTO.CUSTOMER_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: {
          ...action.payload
        },
      };
    case MAGENTO.REMOVE_ITEM_FROM_CART_FAILURE:
    case MAGENTO.CUSTOMER_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case MAGENTO.CART_ITEM_PRODUCT_SUCCESS: {
      const products = {
        ...state.products,
        [action.payload.sku]: action.payload,
      };
      return {
        ...state,
        products,
      };
    }
    default:
      return state;
  }
};
