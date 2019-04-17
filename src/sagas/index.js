import { all } from 'redux-saga/effects';
import homeSagas from './home';
import categoryTreeSagas from './categoryTree';
import productSagas from './product';
import accountSagas from './account';
import loginSagas from './login';
import signupSagas from './signup';
import searchSagas from './search';
import categoryListSagas from './categoryList';

export default function* rootSaga() {
  yield all([
    ...homeSagas,
    ...categoryTreeSagas,
    ...productSagas,
    ...accountSagas,
    ...loginSagas,
    ...signupSagas,
    ...searchSagas,
    ...categoryListSagas,
  ]);
}
