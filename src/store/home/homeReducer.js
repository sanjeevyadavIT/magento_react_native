import { MAGENTO } from '../../constants';
import Status from '../../magento/Status';

const initialState = {
  status: Status.DEFAULT,
  slider: [],
  featuredCategories: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case MAGENTO.HOME_DATA_LOADING:
      return {
        ...state,
        status: Status.LOADING,
      };
    case MAGENTO.INIT_APP_FAILURE: // This will display error message on HomePage
    case MAGENTO.HOME_DATA_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMessage: payload.errorCode
          ? `${payload.errorCode}\n${payload.errorMessage}`
          : payload.errorMessage,
      };
    case MAGENTO.HOME_DATA_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        ...payload,
      };
    case MAGENTO.FEATURED_CATEGORY_PRODUCTS_LOADING: {
      const { categoryId } = payload;
      const featuredCategory = {
        ...state.featuredCategories[categoryId],
        status: Status.LOADING,
      };
      return {
        ...state,
        featuredCategories: {
          ...state.featuredCategories,
          [categoryId]: featuredCategory,
        },
      };
    }
    case MAGENTO.FEATURED_CATEGORY_PRODUCTS_SUCCESS: {
      const { categoryId, items } = payload;
      const featuredCategory = {
        ...state.featuredCategories[categoryId],
        items: [...state.featuredCategories[categoryId].items, ...items],
        status: Status.SUCCESS,
      };
      return {
        ...state,
        featuredCategories: {
          ...state.featuredCategories,
          [categoryId]: featuredCategory,
        },
      };
    }
    case MAGENTO.FEATURED_CATEGORY_PRODUCTS_ERROR: {
      const { categoryId, errorMessage } = payload;
      const featuredCategory = {
        ...state.featuredCategories[categoryId],
        errorMessage,
        status: Status.ERROR,
      };
      return {
        ...state,
        featuredCategories: {
          ...state.featuredCategories,
          [categoryId]: featuredCategory,
        },
      };
    }
    default:
      return state;
  }
};
