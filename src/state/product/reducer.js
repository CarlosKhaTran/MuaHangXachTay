import actions from './actions';

const initState = {
  productList: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.RECEIVE_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
