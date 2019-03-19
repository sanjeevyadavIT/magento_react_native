import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './../reducers';
import rootSaga from './sagas';
import logger from 'redux-logger';


const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

const store = createStore(
	reducers,
	applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga)

export default store;