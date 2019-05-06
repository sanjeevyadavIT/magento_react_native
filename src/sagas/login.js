import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../magento';
import { MAGENTO } from '../actions/actionsTypes';
import { extractErrorMessage } from '../utils';

const auth = function* auth({ payload }) {
  try {
    yield put({ type: MAGENTO.AUTH_LOADING });
    const token = yield call(
      { content: magento, fn: magento.guest.auth },
      payload.email,
      payload.password
    );
    yield AsyncStorage.setItem(CUSTOMER_TOKEN, token);
    yield put({ type: MAGENTO.AUTH_SUCCESS, payload: { token } });
    yield put({ type: MAGENTO.CURRENT_USER_REQUEST }); // Fetch details of current user
  } catch (error) {
    yield put({ type: MAGENTO.AUTH_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};

const loginSagas = [
  takeLatest(MAGENTO.AUTH_REQUEST, auth),
];

export default loginSagas;
