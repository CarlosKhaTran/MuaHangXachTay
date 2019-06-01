// @flow
import { all } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import commonSaga from './common/saga';
import productSaga from './product/saga';
import userSaga from './user/saga';

export default (): Saga => {
  function* rootSaga(): Saga {
    yield all([commonSaga(), productSaga(), userSaga()]);
  }
  return rootSaga;
};
