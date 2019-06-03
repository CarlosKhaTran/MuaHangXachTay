// @flow

const notiActions = {
  GET_ALL_NOTI: 'GET_ALL_NOTI',
  GET_ALL_NOTI_SUCCESS: 'GET_ALL_NOTI_SUCCESS',
  DELETE_NOTI: 'DELETE_NOTI',
  SEEN_NOTI: 'SEEN_NOTI',
  getAllNoti: (cb: (flag: boolean) => void) => ({
    type: notiActions.GET_ALL_NOTI,
    cb: cb || (() => {})
  }),
  deleteNoti: (id: string) => ({
    type: notiActions.DELETE_NOTI,
    id
  }),
  seenNoti: (id: string) => ({
    type: notiActions.SEEN_NOTI,
    id
  })
};

export default notiActions;
