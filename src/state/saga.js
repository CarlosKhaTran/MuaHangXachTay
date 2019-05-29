// @flow
import { all } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import commonSaga from './common/saga';
import productSaga from './product/saga';

export default () => {
  function* rootSaga(): Saga {
    yield all([...commonSaga, ...productSaga]);
  }
  return rootSaga;
};
