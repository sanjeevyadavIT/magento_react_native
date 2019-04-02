import {
  MAGENTO_SET_CURRENT_PRODUCT,
  MAGENTO_SET_PRODUCT_MEDIA,
  MAGENTO_SET_CONF_OPTIONS,
  MAGENTO_ERROR_CONF_OPTIONS,
  MAGENTO_SET_PRODUCT_ATTRIBUTE_OPTIONS,
  UI_PRODUCT_UPDATE_OPTIONS,
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
    case MAGENTO_SET_CONF_OPTIONS: {
      const current = { ...state.current, options: action.payload };
      return {
        ...state,
        current,
      };
    }
    case MAGENTO_SET_PRODUCT_ATTRIBUTE_OPTIONS: {
      const attributes = {
        ...state.attributes,
        [action.payload.attributeId]: {
          options: action.payload.options,
          attributeCode: action.payload.attributeCode,
        }
      };
      return {
        ...state,
        attributes,
      };
    }
    case UI_PRODUCT_UPDATE_OPTIONS: {
      const selectedOptions = state.selectedOptions;
      return {
        ...state,
        selectedOptions: {
          ...selectedOptions,
          ...action.payload,
        }
      }
    }
    default:
      return state;
  }
};
