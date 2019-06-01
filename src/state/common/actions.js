// @flow

const commonActions = {
  INIT_APP: 'INIT_APP',
  START_LOADING: 'START_LOADING',
  END_LOADING: 'ENDLOADING',
  startLoading: () => ({
    type: commonActions.START_LOADING
  }),
  endLoading: () => ({
    type: commonActions.END_LOADING
  }),
  initApp: () => ({
    type: commonActions.INIT_APP
  })
};

export default commonActions;
