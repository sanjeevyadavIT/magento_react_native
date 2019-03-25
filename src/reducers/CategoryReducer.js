import {
  MAGENTO_SET_CURRENT_CATEGORY,
  MAGENTO_SET_CATEGORY_PRODUCTS,
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
    case MAGENTO_SET_CATEGORY_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        totalCount: action.payload.totalCount,
      };
    case MAGENTO_ERROR_CATEGORY_PRODUCTS:
    default:
      return state;
  }
};
