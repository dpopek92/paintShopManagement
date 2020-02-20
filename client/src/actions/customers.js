import {
 CUSTOMERS_LIST_LOADED,
 CUSTOMER_ORDERS_LOADED,
 CUSTOMER_DATA_LOADED,
 CUSTOMER_ORDERS_ERROR,
 CUSTOMER_DATA_ERROR,
 CUSTOMERS_LIST_ERROR
} from "../actions/types";
import setAuthToken from "../helpers/setAuthToken";
import Axios from "axios";

//LOAD CUSTOMERS
export const loadCustomers = (end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/profile/users`, {
   cancelToken: cancel
  });
  if (Array.isArray(res.data)) {
   dispatch({ type: CUSTOMERS_LIST_LOADED, list: res.data });
  }
  end();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
   dispatch({ type: CUSTOMERS_LIST_ERROR });
  } else {
   console.log(err.response);
   dispatch({ type: CUSTOMERS_LIST_ERROR });
   end();
  }
 }
};
//LOAD CUSTOMER DATA
export const loadCustomerData = (id, end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/profile/users/${id}`, {
   cancelToken: cancel
  });
  dispatch({ type: CUSTOMER_DATA_LOADED, customerData: res.data });
  end();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
   dispatch({ type: CUSTOMER_DATA_ERROR });
  } else {
   console.log(err);
   dispatch({ type: CUSTOMER_DATA_ERROR });
   end();
  }
 }
};
//LOAD CUSTOMER ORDERS
export const loadCustomerOrders = (id, end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/orders/admin/user/${id}`, {
   cancelToken: cancel
  });
  dispatch({ type: CUSTOMER_ORDERS_LOADED, customerOrders: res.data });
  // console.log(res.data);
  end();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
   dispatch({ type: CUSTOMER_ORDERS_ERROR });
  } else {
   console.log(err);
   dispatch({ type: CUSTOMER_ORDERS_ERROR });
   end();
  }
 }
};
