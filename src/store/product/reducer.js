import {
  MAGENTO,
  UI,
  UI_PRODUCT_UPDATE_OPTIONS_SUCCESS,
} from '../../constants';
import Status from '../../magento/Status';

const getInitialState = {
  /**
   * medias cache the images of the product
   * by using it's sku as key and images link as property
   */
  medias: {},
  mediaStatus: Status.DEFAULT,
  mediaErrorMessage: '',
  /**
   * Holds detail of the product, currently selected
   * like name, sku, description etc.
   */
  detail: {},
  /**
   * If product is configurable type, hasOptions will be true and
   * fetch it's options
   */
  hasOptions: false,
  confOptionsStatus: Status.DEFAULT,
  confOptionsErrorMessage: '',
  /**
   * attributes are cached which conatin attribute code with their name,
   * so if aattribute set is fetched, it will be used from here.
   */
  attributes: {},
  /**
   * Saves the attributeId along with it's key which is selcted by user.
   * Example, if user choose size `s` where attribute_id of size is 97 and key of `s` is 101
   * ```
   * selectedOptions = {
   *    97: 101
   * }
   * ```
   */
  selectedOptions: {},
  /**
   * In case of all options are selected for `configurable` product, find out
   * `simple` type product that it represent.
   */
  selectedProduct: null,
  //-------------------------
  addToCartLoading: false,
  addToCartError: null,
  qtyInput: 1,
};

export default (state = getInitialState, { type, payload }) => {
  switch (type) {
    case UI.OPEN_SELECTED_PRODUCT_SUCCESS:
      return {
        ...state,
        detail: { ...payload.productDetail, children: payload.children },
        //-------------------------
        mediaStatus: Status.DEFAULT,
        mediaErrorMessage: '',
        //-------------------------
        hasOptions: payload.hasOptions,
        confOptionsStatus: Status.DEFAULT,
        confOptionsErrorMessage: '',
        //-------------------------
        selectedOptions: {},
        selectedProduct: null,
        //-------------------------
        addToCartLoading: false,
        addToCartError: null,
        qtyInput: 1,
      };
    case MAGENTO.PRODUCT_MEDIA_LOADING:
      return {
        ...state,
        mediaStatus: Status.LOADING,
      };
    case MAGENTO.PRODUCT_MEDIA_SUCCESS: {
      const medias = { ...state.medias, [payload.sku]: payload.media };
      return {
        ...state,
        mediaStatus: Status.SUCCESS,
        medias,
      };
    }
    case MAGENTO.PRODUCT_MEDIA_FAILURE:
      return {
        ...state,
        mediaStatus: Status.ERROR,
        mediaErrorMessage: payload.errorMessage,
      };
    case MAGENTO.CONF_OPTIONS_LOADING:
      return {
        ...state,
        confOptionsStatus: Status.LOADING,
      };
    case MAGENTO.CONF_OPTIONS_SUCCESS: {
      const detail = { ...state.detail, options: payload.options };
      const attributes = { ...state.attributes, ...payload.attributes };
      return {
        ...state,
        detail,
        attributes,
        confOptionsStatus: Status.SUCCESS,
      };
    }
    case MAGENTO.CONF_OPTIONS_FAILURE:
      return {
        ...state,
        confOptionsStatus: Status.ERROR,
        confOptionsErrorMessage: payload.errorMessage,
      };
    case MAGENTO.CONFIGURABLE_CHILDREN_SUCCESS: {
      const detail = { ...state.detail, children: payload.children };
      return {
        ...state,
        detail,
      };
    }
    case UI_PRODUCT_UPDATE_OPTIONS_SUCCESS: {
      const selectedOptions = { ...state.selectedOptions, ...payload.selectedOption };
      return {
        ...state,
        addToCartError: null,
        selectedOptions,
        selectedProduct: payload.selectedProduct,
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
        addToCartError: payload,
      };
    default:
      return state;
  }
};
