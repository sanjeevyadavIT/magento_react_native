import {
  MAGENTO_SEARCH_PRODUCTS_ERROR,
  MAGENTO_SEARCH_PRODUCTS_SUCCESS,
  MAGENTO_SEARCH_PRODUCTS_LOADING,
  MAGENTO_LOAD_MORE_SEARCH_PRODUCTS,
} from '../actions/types';

const getInitialState = loadingStatus => ({
  products: null,
  totalCount: 0,
  error: null,
  loading: loadingStatus,
});

export default (state = getInitialState(false), action) => {
  switch (action.type) {
    case MAGENTO_SEARCH_PRODUCTS_LOADING:
      return {
        ...state,
        ...getInitialState(action.payload),
      };
    case MAGENTO_SEARCH_PRODUCTS_SUCCESS: {
      const products = state.products ? state.products : [];
      return {
        ...state,
        loading: false,
        loadingMore: false,
        products: [...products, ...action.payload.items],
        totalCount: action.payload.total_count
      };
    }
    case MAGENTO_LOAD_MORE_SEARCH_PRODUCTS:
      return {
        ...state,
        loadingMore: action.payload,
      };
    case MAGENTO_SEARCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        products: null,
        totalCount: 0,
        error: action.payload
      };
    default:
      return state;
  }
};
