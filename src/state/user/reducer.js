// @flow
import actions from './actions';

const initState = {
  token: null
};

export default (state: Object = initState, action: Object) => {
  switch (action.type) {
    case actions.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case actions.LOG_OUT_SUCCESS:
      return {
        ...state,
        ...initState
      };
    case actions.LOGIN_SUCESS:
      return {
        ...state,
        ...action.payload
      };
    case actions.REGISTER_SUCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return {
        ...state
      };
  }
};
