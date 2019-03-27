import {
  MAGENTO_SET_CURRENT_PRODUCT,
  MAGENTO_SET_PRODUCT_MEDIA,
} from '../actions/types';

const initialState = {
  current: null,
  medias: {},
  attributes: {},
  qtyInput: 1,
  selectedOptions: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAGENTO_SET_CURRENT_PRODUCT:
      return {
        ...state,
        selectedOptions: {},
        current: action.payload,
      };
    case MAGENTO_SET_PRODUCT_MEDIA:
      return {
        ...state,
        medias: {
          ...state.medias,
          [action.payload.sku]: action.payload.media,
        }
      };
    default:
      return state;
  }
};
