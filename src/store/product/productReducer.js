import { MAGENTO } from '../../constants';

const getInitialState = {
  /**
   * attributes are cached which conatin attribute code with their name,
   * so if attribute set is fetched, it will be used from here.
   */
  attributes: {},
  /**
   * Cache of product detail, used in cart currently
   */
  cachedProductDetails: {},
  /**
   * Cache product media, used in Order screen
   */
  cachedProductMedia: {},
};

export default (state = getInitialState, { type, payload }) => {
  switch (type) {
    case MAGENTO.GET_ATTRIBUTE_SUCCESS: {
      const { id, options } = payload;
      return {
        ...state,
        attributes: {
          ...state.attributes,
          [id]: options,
        },
      };
    }
    case MAGENTO.PRODUCT_DETAIL_SUCCESS: {
      const { sku, productDetail } = payload;
      return {
        ...state,
        cachedProductDetails: {
          ...state.cachedProductDetails,
          [sku]: productDetail,
        },
      };
    }
    case MAGENTO.GET_PRODUCT_MEDIA_SUCCESS: {
      const { sku, media } = payload;
      return {
        ...state,
        cachedProductMedia: {
          ...state.cachedProductMedia,
          [sku]: media,
        },
      };
    }
    default:
      return state;
  }
};
