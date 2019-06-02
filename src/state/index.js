// @flow
import { persistStore, persistReducer } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import createSagaMiddleware from 'redux-saga';
import {
  createStore, applyMiddleware, compose, combineReducers
} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import reducer from './reducer';
import createSaga from './saga';
import commonActions from './common/actions';
import productActions from './product/actions';
import userActions from './user/actions';
import notiActions from './noti/actions';

const config = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet
};

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
  const persistedReducer = persistReducer(config, combineReducers(reducer));
  const store = createStore(persistedReducer, compose(createMiddlewares(sagaMiddleware)));

  const persistor = persistStore(store);
  sagaMiddleware.run(createSaga());
  return { persistor, store };
};

export default buildStore();
export const actions = {
  ...commonActions,
  ...productActions,
  ...userActions,
  ...notiActions
};
