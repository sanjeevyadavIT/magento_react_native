import { takeEvery, all, call, put, select } from 'redux-saga/effects';
import { magento } from '../../magento';
import { MAGENTO, UI } from '../../constants';

/*
 * Selector. Access attributes from the store
 */
export const getAttributesFromStore = state => state.product.attributes;

/**
 * Selector - Access options, selectedOptions of the product
 */
export const getProductInfoFromStore = state => {
  const {
    detail: { options, children },
    selectedOptions,
  } = state.product;
  return {
    options,
    children,
    selectedOptions,
  };
};

/**
 * Interceptor saga:
 * Fetch configurable children if product is `configurable` type product
 * Fetch product media
 * Fetch configurable options for `configurable` type product
 */
function* fetchProductDetails({ payload: { productType, sku, children } }) {
  try {
    yield all([
      productType === 'configurable' &&
        !children &&
        getConfigurableChildren(sku),
      productType === 'configurable' && getConfigurableProductOptions(sku),
    ]);
  } catch (error) {
    yield put({
      type: UI.OPEN_SELECTED_PRODUCT_FAILURE,
      payload: { sku, errorMessage: error.message },
    });
  }
}

// TODO: don't fetch children, if aldready cached
// worker saga: Add Description
function* getConfigurableChildren(sku) {
  try {
    yield put({ type: MAGENTO.CONFIGURABLE_CHILDREN_LOADING });
    const children = yield call(
      { content: magento, fn: magento.admin.getConfigurableChildren },
      sku,
    );
    yield put({
      type: MAGENTO.CONFIGURABLE_CHILDREN_SUCCESS,
      payload: { sku, children },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.CONFIGURABLE_CHILDREN_FAILURE,
      payload: { sku, errorMessage: error.message },
    });
  }
}

// worker saga: Add Description
// TODO: Function not optimized
function* getConfigurableProductOptions(sku) {
  try {
    yield put({ type: MAGENTO.CONF_OPTIONS_LOADING, payload: { sku } });
    const options = yield call(
      { content: magento, fn: magento.admin.getConfigurableProductOptions },
      sku,
    );

    const attributes = yield select(getAttributesFromStore);

    const attributesToBeFetched = options.filter(
      option => !(option.attribute_id in attributes),
    );
    let attributesResponse = [];
    if (attributesToBeFetched.length > 0) {
      attributesResponse = yield all(
        attributesToBeFetched.map(attribute =>
          call(
            { content: magento, fn: magento.admin.getAttributeByCode },
            attribute.attribute_id,
          ),
        ),
      );
    }
    yield put({
      type: MAGENTO.CONF_OPTIONS_SUCCESS,
      payload: {
        sku,
        options,
        attributes: formatAttributesResponse(attributesResponse),
      },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.CONF_OPTIONS_FAILURE,
      payload: { sku, errorMessage: error.message },
    });
  }
}

// Helper function to format array reponse into key value pairs in object
function formatAttributesResponse(attribtesArray) {
  const attributes = {};
  attribtesArray.forEach(attribute => {
    attributes[attribute.attribute_id] = {
      attributeCode: attribute.attribute_code,
      options: attribute.options,
    };
  });
  return attributes;
}

// worker saga: Add Description
function* addToCart({ payload }) {
  const { sku } = payload.cartItem;
  try {
    yield put({ type: MAGENTO.ADD_TO_CART_LOADING, payload: { sku } });
    const response = yield call(
      { content: magento, fn: magento.customer.addItemToCart },
      payload,
    );
    yield put({
      type: MAGENTO.ADD_TO_CART_SUCCESS,
      payload: {
        response,
        sku,
      },
    });
    yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST }); // refresh cart
  } catch (error) {
    yield put({
      type: MAGENTO.ADD_TO_CART_FAILURE,
      payload: {
        sku,
        errorMessage: error.message,
      },
    });
  }
}

/**
 * Fetch product detail using it's sku
 *
 * @param {object} action - Redux action object
 * @param {string} sku    - Id of the product whose details need to be fetched
 */
function* getProductDetail({ payload: { sku } }) {
  try {
    const productDetail = yield call(
      { content: magento, fn: magento.admin.getProductBySku },
      sku,
    );
    yield put({
      type: MAGENTO.PRODUCT_DETAIL_SUCCESS,
      payload: {
        sku,
        productDetail,
      },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.PRODUCT_DETAIL_FAILURE,
      payload: error.message,
    });
  }
}

// TODO: Make this function offical function
function* newGetProductMedia({ payload: { sku }}) {
  try {
    yield put({ type: MAGENTO.GET_PRODUCT_MEDIA_LOADING, payload: { sku } });
    const response = yield call(
      { content: magento, fn: magento.admin.getProductMedia },
      sku,
    );
    yield put({
      type: MAGENTO.GET_PRODUCT_MEDIA_SUCCESS,
      payload: { sku, media: response },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.GET_PRODUCT_MEDIA_FAILURE,
      payload: { sku, errorMessage: error.message },
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeEvery(UI.OPEN_SELECTED_PRODUCT_REQUEST, fetchProductDetails);
  yield takeEvery(MAGENTO.ADD_TO_CART_REQUEST, addToCart);
  yield takeEvery(MAGENTO.PRODUCT_DETAIL_REQUEST, getProductDetail);
  yield takeEvery(MAGENTO.GET_PRODUCT_MEDIA_REQUEST, newGetProductMedia);
}
