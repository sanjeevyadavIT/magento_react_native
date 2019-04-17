import { takeLatest, call, put } from 'redux-saga/effects';
import { magento } from '../magento';
import { MAGENTO } from '../actions/actionsTypes';
import { extractErrorMessage } from '../utils';

const getCurrentUser = function* fetchCurrentUser() {
  try {
    yield put({ type: MAGENTO.CURRENT_USER_LOADING, payload: true });
    const payload = yield call({ content: magento, fn: magento.customer.getCurrentCustomer });
    yield put({ type: MAGENTO.CURRENT_USER_SUCCESS, payload });
  } catch (error) {
    yield put({ type: MAGENTO.CURRENT_USER_FAILURE, payload: extractErrorMessage(error) });
  }
};
const accountSagas = [
  takeLatest(MAGENTO.CURRENT_USER_REQUEST, getCurrentUser),
];

export default accountSagas;
