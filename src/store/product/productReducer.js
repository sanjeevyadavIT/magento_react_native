import {
  MAGENTO,
  UI,
  RESET_ADD_TO_CART_STATE,
} from '../../constants';
import Status from '../../magento/Status';

const getInitialState = {
  current: {
    // This is a dummy object, which mimics an open product in ProductScreen
    default: {
      children: undefined,
      /**
       * Product image are stored in medias
       */
      medias: [],
      mediaStatus: Status.DEFAULT,
      mediaErrorMessage: '',
      /**
       * Product configurable options, if product type is `configurable`
       */
      options: [],
      confOptionsStatus: Status.DEFAULT,
      confOptionsErrorMessage: '',
      /**
       * Add to cart related logic
       */
      addToCartStatus: Status.DEFAULT,
      addToCartErrorMessage: '',
    }
  },
  /**
   * attributes are cached which conatin attribute code with their name,
   * so if attribute set is fetched, it will be used from here.
   */
  attributes: {},
};

export default (state = getInitialState, { type, payload }) => {
  switch (type) {
    case UI.OPEN_SELECTED_PRODUCT_REQUEST: {
      const { sku, children } = payload;
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            children,
            //------------------------------
            medias: [],
            mediaStatus: Status.DEFAULT,
            mediaErrorMessage: '',
            //-------------------------------
            options: [],
            confOptionsStatus: Status.DEFAULT,
            confOptionsErrorMessage: '',
            //-------------------------------
            addToCartStatus: Status.DEFAULT,
            addToCartErrorMessage: '',
          }
        }
      };
    }
    case MAGENTO.PRODUCT_MEDIA_LOADING: {
      const { sku } = payload;
      const product = state.current[sku];
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            ...product,
            mediaStatus: Status.LOADING,
          }
        }
      };
    }
    case MAGENTO.PRODUCT_MEDIA_SUCCESS: {
      const { sku, medias } = payload;
      const product = state.current[sku];
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            ...product,
            mediaStatus: Status.SUCCESS,
            medias,
          }
        }
      };
    }
    case MAGENTO.PRODUCT_MEDIA_FAILURE: {
      const { sku, errorMessage } = payload;
      const product = state.current[sku];
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            ...product,
            mediaStatus: Status.ERROR,
            mediaErrorMessage: errorMessage,
          }
        }
      };
    }
    case MAGENTO.CONFIGURABLE_CHILDREN_SUCCESS: {
      const { sku, children } = payload;
      const product = state.current[sku];
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            ...product,
            children,
          }
        }
      };
    }
    case MAGENTO.CONF_OPTIONS_LOADING: {
      const { sku } = payload;
      const product = state.current[sku];
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            ...product,
            confOptionsStatus: Status.LOADING,
          }
        }
      };
    }
    case MAGENTO.CONF_OPTIONS_SUCCESS: {
      const { sku, options, attributes } = payload;
      const product = state.current[sku];
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            ...product,
            confOptionsStatus: Status.SUCCESS,
            options,
          }
        },
        attributes: {
          ...state.attributes,
          ...attributes,
        }
      };
    }
    case MAGENTO.CONF_OPTIONS_FAILURE: {
      const { sku, errorMessage } = payload;
      const product = state.current[sku];
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            ...product,
            confOptionsStatus: Status.ERROR,
            confOptionsErrorMessage: errorMessage,
          }
        }
      };
    }
    case MAGENTO.ADD_TO_CART_LOADING: {
      const { sku } = payload;
      const product = state.current[sku];
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            ...product,
            addToCartStatus: Status.LOADING,
            addToCartErrorMessage: '',
          }
        }
      };
    }
    case MAGENTO.ADD_TO_CART_SUCCESS: {
      const { sku } = payload;
      const product = state.current[sku];
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            ...product,
            addToCartStatus: Status.SUCCESS,
            addToCartErrorMessage: '',
          }
        }
      };
    }
    case MAGENTO.ADD_TO_CART_FAILURE: {
      const { sku, errorMessage } = payload;
      const product = state.current[sku];
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            ...product,
            addToCartStatus: Status.ERROR,
            addToCartErrorMessage: errorMessage,
          }
        }
      };
    }
    case RESET_ADD_TO_CART_STATE: {
      const { sku } = payload;
      const product = state.current[sku];
      return {
        ...state,
        current: {
          ...state.current,
          [sku]: {
            ...product,
            addToCartStatus: Status.DEFAULT,
            addToCartErrorMessage: '',
          }
        }
      };
    }
    default:
      return state;
  }
};
