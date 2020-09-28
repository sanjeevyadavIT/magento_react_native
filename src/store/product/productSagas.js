import { takeEvery, call, put } from 'redux-saga/effects';
import { magento } from '../../magento';
import { MAGENTO } from '../../constants';

/*
 * Selector. Access attributes from the store
 */
// export const getAttributesFromStore = state => state.product.attributes;

// worker saga: Add Description
// TODO: Remove this
// function* getConfigurableProductOptions(sku) {
//   try {
//     yield put({ type: MAGENTO.CONF_OPTIONS_LOADING, payload: { sku } });
//     const options = yield call(
//       { content: magento, fn: magento.admin.getConfigurableProductOptions },
//       sku,
//     );

//     const attributes = yield select(getAttributesFromStore);

//     const attributesToBeFetched = options.filter(
//       option => !(option.attribute_id in attributes),
//     );
//     let attributesResponse = [];
//     if (attributesToBeFetched.length > 0) {
//       attributesResponse = yield all(
//         attributesToBeFetched.map(attribute =>
//           call(
//             { content: magento, fn: magento.admin.getAttributeByCode },
//             attribute.attribute_id,
//           ),
//         ),
//       );
//     }
//     yield put({
//       type: MAGENTO.CONF_OPTIONS_SUCCESS,
//       payload: {
//         sku,
//         options,
//         attributes: formatAttributesResponse(attributesResponse),
//       },
//     });
//   } catch (error) {
//     yield put({
//       type: MAGENTO.CONF_OPTIONS_FAILURE,
//       payload: { sku, errorMessage: error.message },
//     });
//   }
// }

// Helper function to format array reponse into key value pairs in object
// function formatAttributesResponse(attribtesArray) {
//   const attributes = {};
//   attribtesArray.forEach(attribute => {
//     attributes[attribute.attribute_id] = {
//       attributeCode: attribute.attribute_code,
//       options: attribute.options,
//     };
//   });
//   return attributes;
// }

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

function* getProductMedia({ payload: { sku }}) {
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
  yield takeEvery(MAGENTO.PRODUCT_DETAIL_REQUEST, getProductDetail);
  yield takeEvery(MAGENTO.GET_PRODUCT_MEDIA_REQUEST, getProductMedia);
}
