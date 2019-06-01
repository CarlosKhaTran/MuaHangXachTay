// @ flow
import type { Saga } from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import commonActions from 'state/common/actions';
import * as apis from 'api';
import Axios from 'axios';
import actions from './actions';

function* login({
  username,
  password,
  cb
}: {
  username: string,
  password: string,
  cb: (isSuccess: boolean) => void
}): Saga {
  try {
    yield put(commonActions.startLoading());
    const user = yield call(apis.login, username, password);
    if (user) {
      yield put({
        type: actions.LOGIN_SUCESS,
        payload: {
          username,
          token: user.token,
          createdAt: user.created_at,
          updateAt: user.updated_at
        }
      });
      Axios.defaults.headers.common.Authorization = user.token;
      cb(true);
    } else {
      cb(false);
    }
    yield put(commonActions.endLoading());
  } catch (error) {
    cb(false);
    yield put(commonActions.endLoading());
  }
}

function* register({
  username,
  password,
  cb
}: {
  username: string,
  password: string,
  cb: (isSuccess: boolean) => void
}): Saga {
  try {
    yield put(commonActions.startLoading());
    const user = yield call(apis.registerUser, username, password);
    if (user) {
      yield put({
        type: actions.REGISTER_SUCESS,
        payload: {
          username,
          token: user.token,
          createdAt: user.created_at,
          updateAt: user.updated_at
        }
      });
      cb(true);
    } else {
      cb(false);
    }
    yield put(commonActions.endLoading());
  } catch (error) {
    cb(false);
    yield put(commonActions.endLoading());
  }
}

function* logOut({ cb }: { cb: (isSuccess: boolean) => void }): Saga {
  try {
    yield put(commonActions.startLoading());
    const user = yield call(apis.logOut);
    if (user) {
      yield put({
        type: actions.LOG_OUT_SUCCESS
      });
      cb(true);
    } else {
      cb(false);
    }
    yield put(commonActions.endLoading());
  } catch (error) {
    console.log('xxx', error);
    cb(false);
    yield put(commonActions.endLoading());
  }
}

export default function* userSaga(): Saga {
  yield takeEvery(actions.LOGIN, login);
  yield takeEvery(actions.REGISTER, register);
  yield takeEvery(actions.LOG_OUT, logOut);
}
