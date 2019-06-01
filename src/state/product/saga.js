// @ flow
import type { Saga } from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import commonActions from 'state/common/actions';
import * as apis from 'api';
import actions from './actions';

function* getProductList(): Saga {
  try {
    yield put(commonActions.startLoading());
    const productList = yield call(apis.getAllProduct);
    yield put(actions.receiveProductList(productList));
    yield put(commonActions.endLoading());
  } catch (error) {
    yield put(commonActions.endLoading());
  }
}

export default function* productSaga(): Saga {
  yield takeEvery(actions.GET_PRODUCT_LIST, getProductList);
}
