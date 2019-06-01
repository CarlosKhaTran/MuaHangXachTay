// @flow

const userActions = {
  LOGIN: 'LOGIN',
  LOGIN_SUCESS: 'LOGIN_SUCESS',
  REGISTER: 'REGISTER',
  REGISTER_SUCESS: 'REGISTER_SUCESS',
  LOG_OUT: 'LOG_OUT',
  LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
  logIn: (username: string, password: string, cb: (isSuccess: boolean) => void) => ({
    type: userActions.LOGIN,
    username,
    password,
    cb
  }),
  registerUser: (username: string, password: string, cb: (isSuccess: boolean) => void) => ({
    type: userActions.REGISTER,
    username,
    password,
    cb
  }),
  logOut: (cb: (isSuccess: boolean) => void) => ({
    type: userActions.LOG_OUT,
    cb
  })
};

export default userActions;
