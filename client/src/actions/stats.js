import {
 GET_PRODUCTION_STATS_YEARS,
 GET_PRODUCTION_STATS_YEARS_ERROR,
 SET_ACTIVE_YEAR,
 SET_YEARS_CUSTOMER,
 GET_PRODUCTION_STATS,
 GET_PRODUCTION_STATS_ERROR,
 GET_EMPLOYEE_STATS,
 GET_EMPLOYEE_STATS_ERROR,
 SET_ACTIVE_MONTH,
 SET_ACTIVE_DAY,
 SET_ACTIVE_POSITION_ON_PRODUCTION_STATS,
 SET_ACTIVE_CUSTOMER,
 SET_ACTIVE_EMPLOYEE,
 GET_CUSTOMER_STATS,
 GET_CUSTOMER_STATS_ERROR
} from "../actions/types";
import setAuthToken from "../helpers/setAuthToken";
import Axios from "axios";

export const clearEmployeeStats = () => dispatch =>
 dispatch({ type: GET_EMPLOYEE_STATS_ERROR });
//getCustomerStatsMonth
export const getMonthCustomerSummary = (
 customerId,
 year,
 month,
 cancel,
 end
) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const body = { customerId, year, month };
  const res = await Axios.post(`/api/stats/customer/month`, body, {
   CancelToken: cancel
  });
  dispatch({ type: GET_CUSTOMER_STATS, stats: res.data });
 } catch (err) {
  console.log(err.response);
  dispatch({ type: GET_CUSTOMER_STATS_ERROR });
 }
};
//getCustomerStatsYear
export const getYearCustomerSummary = (
 customerId,
 year,
 cancel,
 end
) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const body = { customerId, year };
  const res = await Axios.post(`/api/stats/customer/year`, body, {
   CancelToken: cancel
  });
  dispatch({ type: GET_CUSTOMER_STATS, stats: res.data });
 } catch (err) {
  console.log(err.response);
  dispatch({ type: GET_CUSTOMER_STATS_ERROR });
 }
};

export const getProductionStatsYears = (end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/stats/productionyears`, {
   cancelToken: cancel
  });

  if (Array.isArray(res.data)) {
   // console.log(res.data);
   dispatch({ type: GET_PRODUCTION_STATS_YEARS, years: res.data });
  }
  end();
  // console.log(res.data);
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
  } else {
   console.log(err);
  }
  dispatch({ type: GET_PRODUCTION_STATS_YEARS_ERROR });
  end();
 }
};

export const getEmployeeStatsYears = (
 employeeId,
 end,
 cancel
) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/stats/employeeyears/${employeeId}`, {
   cancelToken: cancel
  });

  if (Array.isArray(res.data)) {
   // console.log(res.data);
   dispatch({ type: GET_PRODUCTION_STATS_YEARS, years: res.data });
  }
  end();
  // console.log(res.data);
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
  } else {
   console.log(err);
  }
  dispatch({ type: GET_PRODUCTION_STATS_YEARS_ERROR });
  end();
 }
};

export const getProductionStats = (
 year,
 month,
 end,
 cancel
) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const body = { year, month };
  const res = await Axios.post(`/api/stats/production`, body, {
   cancelToken: cancel
  });

  // console.log(res.data);
  dispatch({ type: GET_PRODUCTION_STATS, stats: res.data });

  end();
  // console.log(res.data);
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
  } else {
   console.log(err);
  }
  dispatch({ type: GET_PRODUCTION_STATS_ERROR });
  end();
 }
};

export const getEmployeeStats = (
 year,
 month,
 employee_id,
 end,
 cancel
) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const body = { year, month };
  const res = await Axios.post(`/api/stats/employee/${employee_id}`, body, {
   cancelToken: cancel
  });

  // console.log(res.data);
  dispatch({ type: GET_EMPLOYEE_STATS, stats: res.data });

  end();
  // console.log(res.data);
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
  } else {
   console.log(err);
   console.log(err.message);
  }
  // dispatch({ type: GET_EMPLOYEE_STATS_ERROR });
  end();
 }
};

export const setYearsCustomer = years => dispatch =>
 dispatch({
  type: SET_YEARS_CUSTOMER,
  years
 });
export const setActiveEmployee = employee => dispatch =>
 dispatch({
  type: SET_ACTIVE_EMPLOYEE,
  employee
 });
export const setActiveCustomer = customer => dispatch =>
 dispatch({
  type: SET_ACTIVE_CUSTOMER,
  customer
 });
export const setActiveYear = year => dispatch =>
 dispatch({
  type: SET_ACTIVE_YEAR,
  year
 });
export const setActiveMonth = month => dispatch =>
 dispatch({
  type: SET_ACTIVE_MONTH,
  month
 });
export const setActiveDay = day => dispatch =>
 dispatch({
  type: SET_ACTIVE_DAY,
  day
 });
export const setActivePosition = position => dispatch =>
 dispatch({
  type: SET_ACTIVE_POSITION_ON_PRODUCTION_STATS,
  position
 });
