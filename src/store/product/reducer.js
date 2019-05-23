import {
  MAGENTO,
  OPEN_SELECTED_PRODUCT,
  MAGENTO_SAVE_PRODUCT_ATTRIBUTE_OPTIONS,
  UI_PRODUCT_UPDATE_OPTIONS,
} from '../../constants/actionsTypes';
import Status from '../../magento/Status';

const getInitialState = product => ({
  current: product,
  medias: {},
  mediaStatus: Status.DEFAULT,
  mediaErrorMessage: '',
  confOptionsLoading: false,
  confOptionsError: null,
  addToCartLoading: false,
  addToCartError: null,
  attributes: {},
  qtyInput: 1,
  selectedOptions: {}
});

export default (state = getInitialState(null), action) => {
  switch (action.type) {
    case OPEN_SELECTED_PRODUCT:
      return {
        ...state,
        current: action.payload,
        mediaLoading: false,
        mediaError: null,
        confOptionsLoading: false,
        confOptionsError: null,
        addToCartLoading: false,
        addToCartError: null,
        qtyInput: 1,
        selectedOptions: {},
      };
    case MAGENTO.PRODUCT_MEDIA_LOADING:
      return {
        ...state,
        mediaStatus: Status.LOADING,
      };
    case MAGENTO.PRODUCT_MEDIA_SUCCESS:
      return {
        ...state,
        mediaStatus: Status.SUCCESS,
        medias: {
          ...state.medias,
          [action.payload.sku]: action.payload.media,
        }
      };
    case MAGENTO.PRODUCT_MEDIA_FAILURE:
      return {
        ...state,
        mediaStatus: Status.ERROR,
        mediaErrorMessage: action.payload.errorMessage,
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
        addToCartError: null,
        selectedOptions: {
          ...selectedOptions,
          ...action.payload,
        }
      };
    }
    case MAGENTO.ADD_TO_CART_LOADING:
      return {
        ...state,
        addToCartLoading: true,
        addToCartError: null,
      };
    case MAGENTO.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addToCartLoading: false,
        addToCartError: null,
      };
    case MAGENTO.ADD_TO_CART_FAILURE:
      return {
        ...state,
        addToCartLoading: false,
        addToCartError: action.payload,
      }
    default:
      return state;
  }
};
