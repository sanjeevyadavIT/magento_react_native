import {
  MAGENTO,
} from '../actions/actionsTypes';

const initialState = {
  loading: null,
  error: null,
  slider: [],
  featuredProducts: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAGENTO.INIT_APP_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MAGENTO.INIT_APP_FAILURE:
    case MAGENTO.HOME_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case MAGENTO.HOME_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MAGENTO.HOME_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case MAGENTO.FEATURED_CATEGORY_PRODUCTS_SUCCESS: {
      const { categoryId, products } = action.payload;
      const category = { ...state.featuredCategories[categoryId], ...products };
      return {
        ...state,
        featuredCategories: {
          ...state.featuredCategories,
          [categoryId]: category,
        },
      };
    }
    case MAGENTO.INIT_APP_SUCCESS: // Don't perform any action, wait for Home data
    default:
      return state;
  }
};
