/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

import { Dispatch } from 'redux';
import {
 loadOrdersSuccessT,
 ORDERS_LOAD_ORDERS_SUCCESS,
 loadOrdersErrorT,
 ORDERS_LOAD_ORDERS_ERROR,
} from '../types/orders/actions';
import { OrderT } from '../types/orders/Orders';
import { customersListLoadError } from './customer';

export const loadOrdersSuccess = (orders: OrderT[]): loadOrdersSuccessT => ({
 type: ORDERS_LOAD_ORDERS_SUCCESS,
 orders,
});

export const loadOrdersError = (): loadOrdersErrorT => ({
 type: ORDERS_LOAD_ORDERS_ERROR,
});

export const getOrders = (key: string, onEnd: () => void) => async (
 dispatch: Dispatch,
) => {
 console.log('THUNK', `getOrders - ${key}`);
 try {
  const res = await Axios.get(`/api/orders/${key}`);
  dispatch(loadOrdersSuccess(res.data));
  onEnd();
 } catch (err) {
  console.log(`ERROR:`, err);
  dispatch(customersListLoadError());
  onEnd();
 }
};
