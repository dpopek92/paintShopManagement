/* eslint-disable import/prefer-default-export */
import { getCustomersList } from 'services/apiRequests/customer/get';
import {
 CUSTOMERS_LIST_LOADED,
 CUSTOMER_ORDERS_LOADED,
 CUSTOMER_DATA_LOADED,
 CUSTOMER_ORDERS_ERROR,
 CUSTOMER_DATA_ERROR,
 CUSTOMERS_LIST_ERROR,
 CUSTOMER_SET_SORT,
} from '../types';

export const setSortCustomersList = (sortBy, direction) => dispatch =>
 dispatch({ type: CUSTOMER_SET_SORT, sortBy, direction });

export const getCustomers = (onEnd, cancelToken) => async dispatch => {
 try {
  const list = await getCustomersList(cancelToken);
  dispatch({ type: CUSTOMERS_LIST_LOADED, list });
  onEnd();
 } catch (err) {
  console.log(`ERROR:`, err);
  dispatch({ type: CUSTOMERS_LIST_ERROR });
  onEnd();
 }
};
