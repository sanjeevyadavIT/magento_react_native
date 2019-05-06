import { MAGENTO, SET_NEW_CATEGORY } from '../actions/actionsTypes';
import { getPriceFromChildren } from '../utils/products';
import Status from '../magento/Status';

const initialState = {
  items: [],
  extra: {},
  totalCount: 0,
  errorMessage: '',
  status: Status.DEFAULT,
  loadingMoreStatus: Status.DEFAULT,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NEW_CATEGORY:
      return {
        ...state,
        ...initialState,
        categoryId: payload.categoryId,
      };
    case MAGENTO.CATEGORY_PRODUCTS_LOADING:
      return {
        ...state,
        status: Status.LOADING,
      };
    case MAGENTO.CATEGORY_PRODUCTS_SUCCESS: {
      return {
        ...state,
        status: Status.SUCCESS,
        loadingMoreStatus: Status.SUCCESS,
        items: [...state.items, ...payload.items],
        totalCount: payload.totalCount,
      };
    }
    case MAGENTO.MORE_CATEGORY_PRODUCTS_LOADING:
      return {
        ...state,
        loadingMoreStatus: Status.LOADING,
      };
    case MAGENTO.CATEGORY_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: Status.ERROR,
        errorMessage: payload.errorMessage,
      };
    case MAGENTO.UPDATE_CONF_PRODUCT_SUCCESS: {
      const { sku, children } = payload;
      const extra = {
        ...state.extra,
        [sku]: {
          children,
          price: getPriceFromChildren(children)
        }
      };
      return {
        ...state,
        extra,
      };
    }
    default:
      return state;
  }
};
