import {
  MAGENTO,
} from '../actions/actionsTypes';
import Status from '../magento/Status';

const initialState = {
  status: Status.DEFAULT,
  slider: [],
  featuredProducts: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case MAGENTO.INIT_APP_LOADING:
    case MAGENTO.HOME_DATA_LOADING:
      return {
        ...state,
        status: Status.LOADING,
      };
    case MAGENTO.INIT_APP_FAILURE:
    case MAGENTO.HOME_DATA_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case MAGENTO.HOME_DATA_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        ...payload,
      };
    case MAGENTO.FEATURED_CATEGORY_PRODUCTS_LOADING: {
      const { categoryId } = payload.categoryId;
      const featuredCategory = { ...state[categoryId], status: Status.LOADING };

      return {
        ...state,
        [categoryId]: featuredCategory,
      };
    }
    case MAGENTO.FEATURED_CATEGORY_PRODUCTS_SUCCESS: {
      const { categoryId, products } = payload;
      const featuredCategory = { ...state[categoryId], ...products, status: Status.SUCCESS };
      return {
        ...state,
        [categoryId]: featuredCategory,
      };
    }
    case MAGENTO.FEATURED_CATEGORY_PRODUCTS_ERROR: {
      const { categoryId, errorMessage } = payload;
      const featuredCategory = { ...state[categoryId], status: Status.ERROR, errorMessage };

      return {
        ...state,
        [categoryId]: featuredCategory,
      };
    }
    case MAGENTO.INIT_APP_SUCCESS: // Don't perform any action, wait for Home data
    default:
      return state;
  }
};
