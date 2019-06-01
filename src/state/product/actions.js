// @flow
import type { Product } from 'utils/typeDefinition';

const productActions = {
  GET_PRODUCT_LIST: 'GET_PRODUCT_LIST',
  RECEIVE_PRODUCT_LIST: 'RECEIVE_PRODUCT_LIST',
  getProductList: () => ({
    type: productActions.GET_PRODUCT_LIST
  }),
  receiveProductList: (productList: Array<Product>) => ({
    type: productActions.RECEIVE_PRODUCT_LIST,
    payload: productList
  })
};

export default productActions;
