import {
 EMPLOYEES_LIST_LOADED,
 EMPLOYEES_LIST_ERROR,
 EMPLOYEE__LOAD__ERROR,
 EMPLOYEE__LOAD
} from "actions/types";
import setAuthToken from "../helpers/setAuthToken";
import Axios from "axios";

export const loadEmployee = (id, end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/employee/${id}`, {
   cancelToken: cancel
  });
  dispatch({ type: EMPLOYEE__LOAD, employee: res.data });
  end();
  // console.log(res.data);
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
  } else {
   console.log(err.response);
   // setState(false);
  }
  dispatch({ type: EMPLOYEE__LOAD__ERROR });
  end();
 }
};

export const loadEmployees = (end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/employee/`, {
   cancelToken: cancel
  });

  // console.log(res.data);
  // console.log(typeof res.data);
  if (Array.isArray(res.data)) {
   dispatch({ type: EMPLOYEES_LIST_LOADED, employees: res.data });
  }
  end();
  // console.log(res.data);
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
  } else {
   console.log(err);
  }
  dispatch({ type: EMPLOYEES_LIST_ERROR });
  end();
 }
};
