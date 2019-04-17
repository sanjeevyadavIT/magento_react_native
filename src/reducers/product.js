import {
  MAGENTO,
  UI_SET_CURRENT_PRODUCT,
  MAGENTO_SAVE_PRODUCT_ATTRIBUTE_OPTIONS,
  UI_PRODUCT_UPDATE_OPTIONS,
} from '../actions/actionsTypes';

const getInitialState = product => ({
  current: product,
  medias: {},
  mediaLoading: false,
  mediaError: null,
  confOptionsLoading: false,
  confOptionsError: null,
  attributes: {},
  qtyInput: 1,
  selectedOptions: {}
});

export default (state = getInitialState(null), action) => {
  switch (action.type) {
    case UI_SET_CURRENT_PRODUCT:
      return {
        ...state,
        current: action.payload,
        mediaLoading: false,
        mediaError: null,
        confOptionsLoading: false,
        confOptionsError: null,
        qtyInput: 1,
        selectedOptions: {},
      };
    case MAGENTO.PRODUCT_MEDIA_LOADING:
      return {
        ...state,
        mediaLoading: true,
      };
    case MAGENTO.PRODUCT_MEDIA_SUCCESS:
      return {
        ...state,
        mediaLoading: false,
        medias: {
          ...state.medias,
          [action.payload.sku]: action.payload.media,
        }
      };
    case MAGENTO.PRODUCT_MEDIA_FAILURE:
      return {
        ...state,
        mediaLoading: false,
        mediaError: action.payload,
      };
    case MAGENTO.CONF_OPTIONS_LOADING:
      return {
        ...state,
        confOptionsLoading: true,
      };
    case MAGENTO.CONF_OPTIONS_SUCCESS: {
      const current = { ...state.current, options: action.payload };
      return {
        ...state,
        current,
        confOptionsLoading: false,
      };
    }
    case MAGENTO.CONF_OPTIONS_FAILURE:
      return {
        ...state,
        confOptionsLoading: false,
        confOptionsError: action.payload,
      };
    case MAGENTO_SAVE_PRODUCT_ATTRIBUTE_OPTIONS: {
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
      const { selectedOptions } = state;
      return {
        ...state,
        selectedOptions: {
          ...selectedOptions,
          ...action.payload,
        }
      };
    }
    default:
      return state;
  }
};
