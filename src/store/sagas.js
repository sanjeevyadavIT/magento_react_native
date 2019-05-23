import { fork } from 'redux-saga/effects';

import homeSagas from './home/sagas';
import categoryTreeSagas from './categoryTree/sagas';
import authSagas from './auth/sagas';
import accountSagas from './account/sagas';
import cartSagas from './cart/sagas';
import categoryListSagas from './categoryList/sagas';
import checkoutSagas from './checkout/sagas';
import productSagas from './product/sagas';
import searchSagas from './search/sagas';

/**
 * rootSaga
 */
export default function* root() {
  yield fork(homeSagas);
  yield fork(categoryTreeSagas);
  yield fork(authSagas);
  yield fork(accountSagas);
  yield fork(cartSagas);
  yield fork(categoryListSagas);
  yield fork(checkoutSagas);
  yield fork(productSagas);
  yield fork(searchSagas);
}
