// @flow
import { persistStore, persistCombineReducers } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import reducer from './reducer';
import createSaga from './saga';
import * as commonActions from './common/actions';
import * as productActions from './product/actions';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: []
};

const createReducers = () => persistCombineReducers(config, reducer);

const createMiddlewares = (sagaMiddleware) => {
  const middlewares = [];

  // Saga Middleware
  if (sagaMiddleware) {
    middlewares.push(sagaMiddleware);
  }
  return applyMiddleware.apply({}, middlewares);
};

const buildStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createReducers(),
    undefined,
    compose(createMiddlewares(sagaMiddleware))
  );

  const persistor = persistStore(store);
  store.reducers = createReducers();
  sagaMiddleware.run(createSaga());
  return { persistor, store };
};

export default buildStore();
export const actions = {
  ...commonActions,
  ...productActions
};
