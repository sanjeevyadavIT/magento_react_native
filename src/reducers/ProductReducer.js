import {
  MAGENTO_SET_CURRENT_PRODUCT_SKU,
  MAGENTO_SET_PRODUCT_DETAIL,
  MAGENTO_ERROR_PRODUCT_DETAIL,
} from '../actions/types';

const getInitialState = (productId, productSku) => ({
  currentProductSku: productSku,
  currentProductid: productId,
  product: null,
  attributes: {},
  qtyInput: 1,
  selectedOptions: {}
});

export default (state = getInitialState(null, null), action) => {
  switch (action.type) {
    case MAGENTO_SET_CURRENT_PRODUCT_SKU:
      return {
        ...state,
        ...getInitialState(null, action.payload),
      };
    case MAGENTO_SET_PRODUCT_DETAIL:
      return {
        ...state,
        product: action.payload,
      };
    case MAGENTO_ERROR_PRODUCT_DETAIL:
    default:
      return state;
  }
}
