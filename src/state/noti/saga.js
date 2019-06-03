// @ flow
import type { Saga } from 'redux-saga';
import {
  takeEvery, put, call, select
} from 'redux-saga/effects';
import * as apis from 'api';
import actions from './actions';

function* getAllNoti({ cb }: { cb: (flag: boolean) => any }) {
  const notiList = yield call(apis.getAllNoti);
  const oldNotiCount = yield select(({ notiState }) => notiState.notiList.length || 0);
  yield put({
    type: actions.GET_ALL_NOTI_SUCCESS,
    payload: {
      notiList: notiList.map(item => ({ ...item, type: 'NEW_PRODUCT' }))
    }
  });
  if (notiList.length > oldNotiCount) {
    cb(true);
  } else cb(false);
}

export default function* notiSaga(): Saga {
  yield takeEvery(actions.GET_ALL_NOTI, getAllNoti);
}
