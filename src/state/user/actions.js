// @flow

const userActions = {
  LOGIN: 'LOGIN',
  LOGIN_SUCESS: 'LOGIN_SUCESS',
  REGISTER: 'REGISTER',
  REGISTER_SUCESS: 'REGISTER_SUCESS',
  LOG_OUT: 'LOG_OUT',
  LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
  GET_USER_PROFILE: 'GET_USER_PROFILE',
  GET_USER_PROFILE_SUCCESS: 'GET_USER_PROFILE_SUCCESS',
  UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
  UPDATE_USER_PROFILE_SUCCESS: 'UPDATE_USER_PROFILE_SUCCESS',
  logIn: (username: string, password: string, cb: (isSuccess: boolean) => void = () => {}) => ({
    type: userActions.LOGIN,
    username,
    password,
    cb
  }),
  registerUser: (
    username: string,
    password: string,
    cb: (isSuccess: boolean) => void = () => {}
  ) => ({
    type: userActions.REGISTER,
    username,
    password,
    cb
  }),
  logOut: (cb?: (isSuccess: boolean) => void = () => {}) => ({
    type: userActions.LOG_OUT,
    cb
  }),
  getUserProfile: (cb?: (isSuccess: boolean) => void = () => {}) => ({
    type: userActions.GET_USER_PROFILE,
    cb
  }),
  updateUserProfile: (
    fullname: string,
    phoneNumber: string,
    address: string,
    email: string,
    cb?: (isSuccess: boolean) => void = () => {}
  ) => ({
    type: userActions.UPDATE_USER_PROFILE,
    cb,
    fullname,
    phoneNumber,
    address,
    email
  })
};

export default userActions;
