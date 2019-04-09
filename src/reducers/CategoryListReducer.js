import {
  MAGENTO_SET_CURRENT_CATEGORY,
  MAGENTO_SET_CATEGORY_PRODUCTS,
  MAGENTO_LOAD_MORE_CATEGORY_PRODUCTS,
  MAGENTO_ERROR_CATEGORY_PRODUCTS,
} from '../actions/types';


const getInitialState = categoryId => ({
  currentCategoryId: categoryId,
  products: null,
  totalCount: 0,
  loadingMore: false
});

export default (state = getInitialState(null), action) => {
  switch (action.type) {
    case MAGENTO_SET_CURRENT_CATEGORY:
      return {
        ...state,
        ...getInitialState(action.payload),
      };
    case MAGENTO_SET_CATEGORY_PRODUCTS: {
      const products = state.products ? state.products : [];
      return {
        ...state,
        products: [...products, ...action.payload.items],
        totalCount: action.payload.totalCount,
      };
    }
    case MAGENTO_LOAD_MORE_CATEGORY_PRODUCTS:
      return {
        ...state,
        loadingMore: action.payload,
      };
    case MAGENTO_ERROR_CATEGORY_PRODUCTS:
    default:
      return state;
  }
};
