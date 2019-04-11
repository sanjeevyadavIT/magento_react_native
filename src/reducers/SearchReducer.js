import {
  MAGENTO_SEARCH_PRODUCTS_ERROR,
  MAGENTO_SEARCH_PRODUCTS_SUCCESS,
  MAGENTO_SEARCH_PRODUCTS_LOADING,
} from '../actions/types';

const INITIAL_STATE = {
  products: null,
  totalCount: 0,
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAGENTO_SEARCH_PRODUCTS_LOADING:
      return {
        ...state,
        loading: action.payload,
        totalCount: 0,
        products: null,
        error: null,
      };
    case MAGENTO_SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.items,
        totalCount: action.payload.total_count
      };
    case MAGENTO_SEARCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        products: null,
        totalCount: 0,
        error: action.payload
      };
    default:
      return state;
  }
};
