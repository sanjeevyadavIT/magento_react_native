import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../../magento';
import { MAGENTO } from '../../constants';

// worker saga: Add description
function* signIn({ payload }) {
  try {
    yield put({ type: MAGENTO.SIGN_IN_LOADING });
    const token = yield call(
      { content: magento, fn: magento.guest.auth },
      payload.email,
      payload.password
    );
    magento.setCustomerToken(token);
    yield AsyncStorage.setItem(CUSTOMER_TOKEN, token);
    yield put({ type: MAGENTO.SIGN_IN_SUCCESS });
    yield put({ type: MAGENTO.CURRENT_USER_REQUEST }); // Fetch details of current user
    yield put({ type: MAGENTO.CUSTOMER_CART_REQUEST }); // Fetch current user cart
  } catch (error) {
    yield put({ type: MAGENTO.SIGN_IN_FAILURE, payload: { errorMessage: error.message } });
  }
}

// worker saga: Add description
function* signUp({ payload }) {
  try {
    yield put({ type: MAGENTO.SIGN_UP_LOADING });
    const response = yield call({ content: magento, fn: magento.guest.signup }, payload);
    yield put({ type: MAGENTO.SIGN_UP_SUCCESS, response });
  } catch (error) {
    console.log(error);
    yield put({ type: MAGENTO.SIGN_UP_FAILURE, payload: { errorMessage: error.message } });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(MAGENTO.SIGN_IN_REQUEST, signIn);
  yield takeLatest(MAGENTO.SIGN_UP_REQUEST, signUp);
}
