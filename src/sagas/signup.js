import { takeLatest, call, put } from 'redux-saga/effects';
import { magento } from '../magento';
import { MAGENTO } from '../actions/actionsTypes';
import { extractErrorMessage } from '../utils';

// TODO: in case of logout, clear CUSTOMER_TOKEN from AsyncStorage

const signup = function* signup(action) {
  try {
    yield put({ type: MAGENTO.SIGNUP_LOADING });
    const payload = yield call({ content: magento, fn: magento.guest.signup }, action.payload);
    yield put({ type: MAGENTO.SIGNUP_SUCCESS, payload });
  } catch (error) {
    yield put({ type: MAGENTO.SIGNUP_FAILURE, payload: { errorMessage: extractErrorMessage(error) } });
  }
};
const signupSagas = [
  takeLatest(MAGENTO.SIGNUP_REQUEST, signup),
];

export default signupSagas;
