import {
  takeEvery,
  all,
  call,
  put,
  select
} from 'redux-saga/effects';
import { magento } from '../../magento';
import {
  MAGENTO,
  UI,
  UI_PRODUCT_UPDATE_OPTIONS_REQUEST,
  UI_PRODUCT_UPDATE_OPTIONS_SUCCESS,
  UI_PRODUCT_UPDATE_OPTIONS_FAILURE
} from '../../constants';
import { parseImageArray } from '../../utils';

/*
 * Selector. Access attributes from the store
 */
export const getAttributesFromStore = state => state.product.attributes;

/**
 * Selector - Access options, selectedOptions of the product
 */
export const getProductInfoFromStore = (state) => {
  const { detail: { options, children }, selectedOptions } = state.product;
  return {
    options,
    children,
    selectedOptions,
  };
};

/**
 * Interceptor saga: Parse weather configurable options are available in product selected
 * If `simple` type product, hasOptions will be false
 * If `configurable` type product, hasOptions will be true
 */
function* openSelectedProduct({ payload: { productDetail, children } }) {
  try {
    const { custom_attributes: customAttributes } = productDetail;
    const { value } = customAttributes.find(customAttribute => customAttribute.attribute_code === 'has_options');
    const hasOptions = value !== '0';
    yield put({ type: UI.OPEN_SELECTED_PRODUCT_SUCCESS, payload: { productDetail, children, hasOptions } });
  } catch (error) {
    yield put({ type: UI.OPEN_SELECTED_PRODUCT_FAILURE, payload: { errorMessage: error.message } });
  }
}

// worker saga: Add Description
// TODO: Function not optimized
function* getConfigurableProductOptions({ payload: { sku } }) {
  try {
    yield put({ type: MAGENTO.CONF_OPTIONS_LOADING });
    const options = yield call(
      { content: magento, fn: magento.admin.getConfigurableProductOptions },
      sku,
    );

    const attributes = yield select(getAttributesFromStore);

    const attributesToBeFetched = options.filter(option => !(option.attribute_id in attributes));
    let attributesResponse = [];
    if (attributesToBeFetched.length > 0) {
      attributesResponse = yield all(attributesToBeFetched.map(attribute => call(
        { content: magento, fn: magento.admin.getAttributeByCode },
        attribute.attribute_id,
      )));
    }
    yield put({ type: MAGENTO.CONF_OPTIONS_SUCCESS, payload: { options, attributes: formatAttributesResponse(attributesResponse) } });
  } catch (error) {
    yield put({ type: MAGENTO.CONF_OPTIONS_FAILURE, payload: { errorMessage: error.message } });
  }
}

// Helper function to format array reponse into key value pairs in object
function formatAttributesResponse(attribtesArray) {
  const attributes = {};
  attribtesArray.forEach((attribute) => {
    attributes[attribute.attribute_id] = {
      attributeCode: attribute.attribute_code,
      options: attribute.options,
    };
  });
  return attributes;
}

// worker saga: Add Description
function* getProductMedia({ payload: { sku } }) {
  try {
    yield put({ type: MAGENTO.PRODUCT_MEDIA_LOADING });
    const response = yield call({ content: magento, fn: magento.admin.getProductMedia }, sku);
    const imageArray = parseImageArray(response);
    yield put({ type: MAGENTO.PRODUCT_MEDIA_SUCCESS, payload: { sku, media: imageArray } });
  } catch (error) {
    yield put({ type: MAGENTO.PRODUCT_MEDIA_FAILURE, payload: { errorMessage: error.message } });
  }
}

// worker saga: Add Description
function* getConfigurableChildren({ payload: { sku } }) {
  try {
    yield put({ type: MAGENTO.CONFIGURABLE_CHILDREN_LOADING });
    const children = yield call({ content: magento, fn: magento.admin.getConfigurableChildren }, sku);
    yield put({ type: MAGENTO.CONFIGURABLE_CHILDREN_SUCCESS, payload: { children } });
  } catch (error) {
    yield put({ type: MAGENTO.CONFIGURABLE_CHILDREN_FAILURE, payload: { errorMessage: error.message } });
  }
}

function isAttributeAndValuePresent(child, attributeCode, attributeValue) {
  return child.custom_attributes.some(customAttribute => customAttribute.attribute_code === attributeCode && customAttribute.value === attributeValue)
};

/**
 * Helper function to find out which `simple` type product selected,
 * using @param selectedOptions
 *
 * @param {Objetc[]} children - all `simple` type product of `configurable` product
 * @param {Object} selectedOptions - selected configurable options
 * @param {Object} attributes - contains keys mapped to their names
 */
function findSelectedProduct(children, selectedOptions, attributes) {
  const selectedOptionsWithNameAsKey = Object.keys(selectedOptions).reduce((total, selectedOptionKey) => ({
    ...total,
    [attributes[selectedOptionKey].attributeCode]: selectedOptions[selectedOptionKey],
  }), {});
  return children.find(child => Object.keys(selectedOptionsWithNameAsKey).every(attributeKey => isAttributeAndValuePresent(child, attributeKey, selectedOptionsWithNameAsKey[attributeKey])));
}

/**
 * Interceptor function, which will find out selcted `simple` product from
 * options selected by user. If some options are not selected, it will
 * return the same payload, else along with payload it will return the
 * `simple` product selected.
 *
 * @param {Object} action                        - action dispatch from UI
 * @param {Object} action.payload.selectedOption - key value pair of option selected in case of
 *                                                 `configurable` type product
 */
function* calculatedSelectedProduct({ payload: { selectedOption } }) {
  try {
    const attributes = yield select(getAttributesFromStore);
    const { options, children, selectedOptions } = yield select(getProductInfoFromStore);
    const finalSelectedOptions = { ...selectedOptions, ...selectedOption };
    let selectedProduct = null;
    if (options.length !== 0 && options.length === Object.keys(finalSelectedOptions).length) {
      selectedProduct = findSelectedProduct(children, finalSelectedOptions, attributes);
    }
    yield put({ type: UI_PRODUCT_UPDATE_OPTIONS_SUCCESS, payload: { selectedOption, selectedProduct } });
  } catch (error) {
    yield put({ type: UI_PRODUCT_UPDATE_OPTIONS_FAILURE, payload: { errorMessage: error.message } });
  }
}


// worker saga: Add Description
function* addToCart({ payload }) {
  try {
    yield put({ type: MAGENTO.ADD_TO_CART_LOADING, payload: true });
    if (payload.cartItem.quote_id) {
      const response = yield call({ content: magento, fn: magento.customer.addItemToCart }, payload);
      yield put({ type: MAGENTO.ADD_TO_CART_SUCCESS, payload: response });
      yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST }); // refresh cart
    } else {
      throw new Error('Guest cart not implemented');
    }
  } catch (error) {
    yield put({ type: MAGENTO.ADD_TO_CART_FAILURE, payload: error.message });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeEvery(UI.OPEN_SELECTED_PRODUCT_REQUEST, openSelectedProduct);
  yield takeEvery(MAGENTO.PRODUCT_MEDIA_REQUEST, getProductMedia);
  yield takeEvery(MAGENTO.CONF_OPTIONS_REQUEST, getConfigurableProductOptions);
  yield takeEvery(MAGENTO.CONFIGURABLE_CHILDREN_REQUEST, getConfigurableChildren);
  yield takeEvery(UI_PRODUCT_UPDATE_OPTIONS_REQUEST, calculatedSelectedProduct);
  yield takeEvery(MAGENTO.ADD_TO_CART_REQUEST, addToCart);
}
