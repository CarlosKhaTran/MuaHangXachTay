// @ flow
import type { Saga } from 'redux-saga';
import { takeEvery, select } from 'redux-saga/effects';
import { Loading } from 'Components/Global';
import Axios from 'axios';
import actions from './actions';

function startLoading() {
  Loading.show();
}

function endloading() {
  Loading.hide();
}

function* initApp() {
  const token: string = yield select(state => state.userState.token);
  if (token && token.length > 0) {
    Axios.defaults.headers.common.Authorization = token;
  }
}

export default function* commonSaga(): Saga {
  yield takeEvery(actions.END_LOADING, endloading);
  yield takeEvery(actions.START_LOADING, startLoading);
  yield takeEvery(actions.INIT_APP, initApp);
}
