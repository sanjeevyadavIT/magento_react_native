import { MAGENTO } from '../actions/actionsTypes';

const getInitialState = loadingStatus => ({
  products: null,
  totalCount: 0,
  error: null,
  loading: loadingStatus,
  loadingMore: false,
});

export default (state = getInitialState(false), action) => {
  switch (action.type) {
    case MAGENTO.SEARCH_PRODUCTS_LOADING:
      return {
        ...state,
        ...getInitialState(action.payload),
      };
    case MAGENTO.SEARCH_PRODUCTS_SUCCESS: {
      const products = state.products ? state.products : [];
      return {
        ...state,
        loading: false,
        loadingMore: false,
        products: [...products, ...action.payload.items],
        totalCount: action.payload.total_count
      };
    }
    case MAGENTO.MORE_SEARCH_PRODUCTS_LOADING:
      return {
        ...state,
        loadingMore: action.payload,
      };
    case MAGENTO.SEARCH_PRODUCTS_FAILURE:
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
