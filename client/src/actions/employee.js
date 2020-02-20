import {
 GET_POSITION_ORDERS,
 GET_POSITION_ORDERS_ERROR,
 GET_POSITION_EMPLOYEES_ERROR,
 GET_POSITION_EMPLOYEES,
 SET_ACTIVE_POSITION,
 SET_EMPLOYEE_FILTER,
 SET_POSITION_ACTIVE_ORDERS,
 CLEAR_EMPLOYEE_FILTER
} from "../actions/types";
import setAuthToken from "../helpers/setAuthToken";
import Axios from "axios";

export const setActivePosition = position => dispatch => {
 dispatch({ type: SET_ACTIVE_POSITION, position });
};
export const setEmployeeFilter = (filterBy, filter) => dispatch => {
 dispatch({ type: SET_EMPLOYEE_FILTER, filterBy, filter });
};
export const clearEmployeeFilter = () => dispatch => {
 dispatch({ type: CLEAR_EMPLOYEE_FILTER });
};
export const setEmployeeActiveOrders = orders => dispatch => {
 dispatch({ type: SET_POSITION_ACTIVE_ORDERS, orders });
};

export const loadPositionOrders = (status, end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/orders/employee/${status}`, {
   cancelToken: cancel
  });

  // console.log(res.data);
  if (Array.isArray(res.data)) {
   dispatch({ type: GET_POSITION_ORDERS, orders: res.data });
  }
  end();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
  } else {
   console.log(err);
  }
  dispatch({ type: GET_POSITION_ORDERS_ERROR });
  end();
 }
};

export const loadPositionEmployees = (
 position,
 end,
 cancel
) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/employee/employees/${position}`, {
   cancelToken: cancel
  });

  // console.log(res.data);
  if (Array.isArray(res.data)) {
   // console.log("object");
   dispatch({ type: GET_POSITION_EMPLOYEES, employees: res.data });
  }
  end();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
  } else {
   console.log(err);
  }
  dispatch({ type: GET_POSITION_EMPLOYEES_ERROR });
  end();
 }
};
