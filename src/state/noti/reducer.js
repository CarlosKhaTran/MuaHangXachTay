// @flow
import actions from './actions';

const initState = {
  notiList: [],
  seenList: {},
  deleteList: {}
};

export default (state: Object = initState, action: Object) => {
  switch (action.type) {
    case actions.SEEN_NOTI:
      return {
        ...state,
        seenList: {
          ...state.seenList,
          [action.id]: true
        }
      };
    case actions.DELETE_NOTI:
      return {
        ...state,
        deleteList: {
          ...state.deleteList,
          [action.id]: true
        }
      };
    case actions.GET_ALL_NOTI_SUCCESS:
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
