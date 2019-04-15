import { all } from 'redux-saga/effects';
import sagas from './sagas';
import homeSagas from './home';

export default function* rootSaga() {
  yield all([
    ...sagas,
    ...homeSagas,
  ]);
}
