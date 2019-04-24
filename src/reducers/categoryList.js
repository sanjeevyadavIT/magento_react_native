import { MAGENTO } from '../actions/actionsTypes';
import { getPriceFromChildren } from '../utils/products';

const getInitialState = loadingStatus => ({
  products: null,
  extra: {},
  totalCount: 0,
  error: null,
  loading: loadingStatus,
  loadingMore: false
});

export default (state = getInitialState(null), action) => {
  switch (action.type) {
    case MAGENTO.CATEGORY_PRODUCTS_LOADING:
      return {
        ...state,
        ...getInitialState(action.payload),
      };
    case MAGENTO.CATEGORY_PRODUCTS_SUCCESS: {
      const products = state.products ? state.products : [];
      return {
        ...state,
        loading: false,
        loadingMore: false,
        products: [...products, ...action.payload.items],
        totalCount: action.payload.totalCount,
      };
    }
    case MAGENTO.MORE_CATEGORY_PRODUCTS_LOADING:
      return {
        ...state,
        loadingMore: action.payload,
      };
    case MAGENTO.CATEGORY_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        products: null,
        totalCount: 0,
        error: action.payload
      };
    case MAGENTO.UPDATE_CONF_PRODUCT_SUCCESS: {
      const { sku, children } = action.payload;
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
