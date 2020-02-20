/* eslint-disable no-console */
import Axios from 'axios';
import {
 GET_ORDER_BY_ID,
 REMOVE_ORDER,
 ORDERS_LOADED,
 ORDERS_LOADED_ERROR,
 SEARCH_ORDER,
 ORDERS_LOAD_REQUEST,
 CUSTOMER_ORDERS_IN_PROD,
} from './types';
import setAuthToken from '../helpers/setAuthToken';

// SEARCH
export const searchOrder = value => dispatch =>
 dispatch({ type: SEARCH_ORDER, value });

// LOAD USER ORDERS
export const loadOrders = (end, cancel) => async dispatch => {
 dispatch({ type: ORDERS_LOAD_REQUEST });
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get('/api/orders/me', {
   cancelToken: cancel,
  });
  if (Array.isArray(res.data)) {
   dispatch({ type: ORDERS_LOADED, payload: res.data });
  } else {
   dispatch({ type: ORDERS_LOADED_ERROR });
  }
  end();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log(`Error: ${err.message}`);
   dispatch({ type: ORDERS_LOADED_ERROR });
   end();
  } else {
   console.log(err.response);
   dispatch({ type: ORDERS_LOADED_ERROR });
   end();
  }
 }
};

// GET ORDER BY ID
export const getOrder = (id, end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/orders/id/${id}`, {
   cancelToken: cancel,
  });
  dispatch({ type: GET_ORDER_BY_ID, order: res.data.order });
  dispatch({
   type: CUSTOMER_ORDERS_IN_PROD,
   orders: res.data.ordersInProduction,
  });
  //   console.log(res.data);
  end();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log(`Error: ${err.message}`);
   end();
  } else {
   console.log(err.response);
   end();
  }
 }
};

// REMOVE ORDER FROM STORE
export const removeOrderFromStore = () => dispatch => {
 dispatch({ type: REMOVE_ORDER });
};

// LOAD ADMIN ORDERS (kind = [inproduction,ended,new])
export const loadAdminOrders = (
 kind,
 date = null,
 end,
 cancel,
 dateFrom = null,
) => async dispatch => {
 // dispatch({ type: ORDERS_LOAD_REQUEST });
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  let res;
  if (kind === 'new') {
   res = await Axios.get(`/api/orders/admin/${kind}`, {
    cancelToken: cancel,
   });
  } else {
   res = await Axios.post(
    `/api/orders/admin/${kind}`,
    { date, dateFrom },
    {
     cancelToken: cancel,
    },
   );
  }

  if (Array.isArray(res.data)) {
   dispatch({ type: ORDERS_LOADED, payload: res.data });
  }
  end();
  // console.log(res.data);
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log(`Error: ${err.message}`);
  } else {
   console.log(err);
  }
  dispatch({ type: ORDERS_LOADED_ERROR });

  end();
 }
};

// LOAD ORDERS TO ORDER PAINTS
export const getOrdersToPaintsOrder = onEnd => async dispatch => {
 try {
  const res = await Axios.get(`/api/orders/paintsorder`);
  if (Array.isArray(res.data)) {
   dispatch({ type: ORDERS_LOADED, payload: res.data });
  }
  //   console.log(res.data);
  onEnd();
  // console.log(res.data);
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log(`Error: ${err.message}`);
  } else {
   console.log(err);
  }
  dispatch({ type: ORDERS_LOADED_ERROR });

  onEnd();
 }
};

// LOAD USER ENDED IN MONTH ORDERS
export const loadUserEndedInMonthOrders = (
 userId,
 month,
 year,
 cancel,
 onEnd,
) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/orders/${userId}/${month}/${year}`, {
   cancelToken: cancel,
  });

  if (Array.isArray(res.data)) {
   dispatch({ type: ORDERS_LOADED, payload: res.data });
  }
  onEnd();
  console.log(res.data);
 } catch (err) {
  console.log(err);

  dispatch({ type: ORDERS_LOADED_ERROR });

  onEnd();
 }
};
