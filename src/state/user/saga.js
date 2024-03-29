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
          updatedAt: user.updated_at
        }
      });
      Axios.defaults.headers.common.Authorization = user.token;
      cb(true);
    } else {
      cb(false);
    }
    yield put(commonActions.endLoading());
    yield put(actions.getUserProfile(() => {}));
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
      yield put(actions.getUserProfile(() => {}));
    } else {
      cb(false);
    }
    yield put(commonActions.endLoading());
  } catch (error) {
    cb(false);
    yield put(commonActions.endLoading());
  }
}

function* getUserProfile({ cb }: { cb: (isSuccess: boolean) => void } = { cb: () => {} }): Saga {
  try {
    const data = yield call(apis.getUserProfile);
    if (data) {
      yield put({
        type: actions.GET_USER_PROFILE_SUCCESS,
        payload: {
          phoneNumber: data.phone_number,
          address: data.address,
          fullname: data.fullname,
          id: data.id,
          email: data.email
        }
      });
      cb(true);
      return;
    }
    cb(false);
  } catch (error) {
    cb(false);
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
    cb(false);
    yield put(commonActions.endLoading());
  }
}

type UpdateUserProfileParam = {
  fullname: string,
  email: string,
  phoneNumber: string,
  address: String,
  cb: (isSuccess: boolean) => void
};
function* updateUserProfile({
  fullname, email, phoneNumber, address, cb
}: UpdateUserProfileParam) {
  try {
    yield put(commonActions.startLoading());
    const data = yield call(apis.updateUserProfile, fullname, address, email, phoneNumber);
    if (data) {
      yield put({
        type: actions.GET_USER_PROFILE_SUCCESS,
        payload: {
          phoneNumber: data.phone_number,
          address: data.address,
          fullname: data.fullname,
          email: data.email,
          createdAt: data.created_at,
          updatedAt: data.updated_at
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

export default function* userSaga(): Saga {
  yield takeEvery(actions.LOGIN, login);
  yield takeEvery(actions.REGISTER, register);
  yield takeEvery(actions.LOG_OUT, logOut);
  yield takeEvery(actions.GET_USER_PROFILE, getUserProfile);
  yield takeEvery(actions.UPDATE_USER_PROFILE, updateUserProfile);
}
