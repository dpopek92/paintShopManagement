/* eslint-disable import/prefer-default-export */
import Axios from 'axios';
import { getCustomersList } from 'services/apiRequests/customer/get';
import {
 CUSTOMERS_SET_SORT,
 CUSTOMERS_LIST_LOADED,
 CUSTOMERS_LIST_LOADED_ERROR,
 customersActions,
 loadCustomersListSuccess,
 loadCustomersListError,
} from '../types/customers/actions';
import { Dispatch } from 'redux';
import { Customer } from '../types/customers/Customers';

export const setSortCustomersList = (
 sortBy: 'company' | 'firstname' | 'ordersNumber',
 sortDirection: 'ascend' | 'descend',
): customersActions => ({ type: CUSTOMERS_SET_SORT, sortBy, sortDirection });

export const customersListLoadSuccess = (
 customersList: Customer[],
): loadCustomersListSuccess => ({ type: CUSTOMERS_LIST_LOADED, customersList });

export const customersListLoadError = (): loadCustomersListError => ({
 type: CUSTOMERS_LIST_LOADED_ERROR,
});

export const getCustomers = (onEnd: () => void) => async (
 dispatch: Dispatch,
) => {
 console.log('THUNK', 'getAllCustomers');
 try {
  const res = await Axios.get(`/api/customers/all`);
  dispatch(customersListLoadSuccess(res.data));
  onEnd();
 } catch (err) {
  console.log(`ERROR:`, err);
  dispatch(customersListLoadError());
  onEnd();
 }
};
