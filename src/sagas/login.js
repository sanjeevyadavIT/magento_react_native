import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { magento, CUSTOMER_TOKEN } from '../magento';
import { MAGENTO } from '../actions/actionsTypes';
import { extractErrorMessage } from '../utils';

const auth = function* auth(action) {
  try {
    yield put({ type: MAGENTO.AUTH_LOADING, payload: true });
    const payload = yield call(
      { content: magento, fn: magento.guest.auth },
      action.payload.email,
      action.payload.password
    );
    yield AsyncStorage.setItem(CUSTOMER_TOKEN, payload);
    yield put({ type: MAGENTO.AUTH_SUCCESS, payload });
  } catch (error) {
    yield put({ type: MAGENTO.AUTH_FAILURE, payload: extractErrorMessage(error) });
  }
};

const loginSagas = [
  takeLatest(MAGENTO.AUTH_REQUEST, auth),
];

export default loginSagas;
