/* eslint-disable import/prefer-default-export */
import {
 ADD_SKIPPED_ORDER,
 REMOVE_SKIPPED_ORDER,
 ADD_PAINTS_ORDER,
 SET_INITIAL_PAINTS_ORDERS,
} from './types';

export const setSkippedOrder = (order, type) => dispatch => {
 if (type === 'add') {
  return dispatch({
   type: ADD_SKIPPED_ORDER,
   order,
  });
 }
 if (type === 'remove') {
  return dispatch({
   type: REMOVE_SKIPPED_ORDER,
   order,
  });
 }
};
export const setPaintsOrder = (id, value) => dispatch => {
 return dispatch({
  type: ADD_PAINTS_ORDER,
  id,
  value,
 });
};
export const setInitialPaintsOrders = paintsOrders => dispatch => {
 return dispatch({
  type: SET_INITIAL_PAINTS_ORDERS,
  paintsOrders,
 });
};
