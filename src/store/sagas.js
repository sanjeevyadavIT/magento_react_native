import { fork } from 'redux-saga/effects';

import accountSagas from './account/accountSagas';
import cartSagas from './cart/cartSagas';
import appSagas from './app/appSagas';
import homeSagas from './home/homeSagas';
import categoryTreeSagas from './categoryTree/categoryTreeSagas';
import checkoutSagas from './checkout/checkoutSagas';
import productSagas from './product/productSagas';
import searchSagas from './search/searchSagas';

/**
 * rootSaga
 */
export default function* root() {
  yield fork(appSagas);
  yield fork(homeSagas);
  yield fork(categoryTreeSagas);
  yield fork(accountSagas);
  yield fork(cartSagas);
  yield fork(checkoutSagas);
  yield fork(productSagas);
  yield fork(searchSagas);
}
