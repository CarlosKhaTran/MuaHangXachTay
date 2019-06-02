// @ flow
import type { Saga } from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import * as apis from 'api';
import actions from './actions';

function* getAllNoti() {
  const notiList = yield call(apis.getAllNoti);
  yield put({
    type: actions.GET_ALL_NOTI_SUCCESS,
    payload: {
      notiList: notiList.map(item => ({ ...item, type: 'NEW_PRODUCT' }))
    }
  });
}

export default function* notiSaga(): Saga {
  yield takeEvery(actions.GET_ALL_NOTI, getAllNoti);
}
