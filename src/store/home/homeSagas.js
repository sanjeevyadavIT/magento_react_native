import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { magento } from '../../magento';
import { MAGENTO } from '../../constants';
import { formatHomeData } from '../../utils/home';

// worker saga: Add Description
function* getHomeData() {
  try {
    yield put({ type: MAGENTO.HOME_DATA_LOADING });
    // Fetch the cms block
    const response = yield call({ context: magento, fn: magento.getHomeData });
    const formattedResponse = formatHomeData(response);
    yield put({ type: MAGENTO.HOME_DATA_SUCCESS, payload: formattedResponse });
  } catch (error) {
    yield put({
      type: MAGENTO.HOME_DATA_FAILURE,
      payload: {
        errorCode: error.name,
        errorMessage: error.message,
      },
    });
  }
}

// worker saga: Add Description
function* getFeaturedCategoryProducts({ payload }) {
  const { categoryId } = payload;
  try {
    yield put({
      type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_LOADING,
      payload: {
        categoryId,
        loading: true,
      },
    });
    const response = yield call(
      { context: magento, fn: magento.admin.getCategoryProducts },
      categoryId,
      1,
      undefined,
      20,
    );
    yield put({
      type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_SUCCESS,
      payload: {
        categoryId,
        items: response.items,
      },
    });
  } catch (error) {
    yield put({
      type: MAGENTO.FEATURED_CATEGORY_PRODUCTS_ERROR,
      payload: { categoryId: payload, errorMessage: error.message },
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(MAGENTO.HOME_DATA_REQUEST, getHomeData);
  yield takeEvery(
    MAGENTO.FEATURED_CATEGORY_PRODUCTS_REQUEST,
    getFeaturedCategoryProducts,
  );
}
