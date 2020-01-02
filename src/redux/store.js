import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './sagas';
import { logger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, {}, compose(applyMiddleware(logger), applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSagas);
export default store;
