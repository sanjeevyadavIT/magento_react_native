import {
  MAGENTO_SET_SEARCH_PRODUCTS,
  MAGENTO_ERROR_SEARCH_PRODUCTS,
} from '../actions/types';


const initialState = {
  searchInput: null,
  products: null,
  totalCount: 0,
  loadingMore: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAGENTO_SET_SEARCH_PRODUCTS:
      return {
        ...state,
        searchInput: action.payload.searchInput,
        products: action.payload.products,
        totalCount: action.payload.totalCount,
      };
    case MAGENTO_ERROR_SEARCH_PRODUCTS:
    default:
      return state;
  }
};
