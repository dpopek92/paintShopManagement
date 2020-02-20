/* eslint-disable no-console */
import {
 ORDERS_IN_PRODUCTION_LOADED,
 ORDERS_IN_PRODUCTION_LOADED_ERROR,
 SET_ACTIVE_LIST,
 SET_PRODUCTION_FILTER,
 CLEAR_FILTERS
} from "./types";
import setAuthToken from "../helpers/setAuthToken";
import Axios from "axios";

//LOAD ADMIN ORDERS (kind = [inproduction,ended,new])
export const setProductionFilter = (filter, name) => dispatch =>
 dispatch({ type: SET_PRODUCTION_FILTER, filter, name });

export const clearFilters = () => dispatch => dispatch({ type: CLEAR_FILTERS });

export const loadProductionOrders = (kind, end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/orders/admin/${kind}`, {
   cancelToken: cancel
  });
  if (Array.isArray(res.data)) {
   dispatch({ type: ORDERS_IN_PRODUCTION_LOADED, payload: res.data });
  }
  end();
  //   console.log(res.data);
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
   dispatch({ type: ORDERS_IN_PRODUCTION_LOADED_ERROR });

   end();
  } else {
   console.log(err);
   dispatch({ type: ORDERS_IN_PRODUCTION_LOADED_ERROR });

   end();
  }
 }
};

export const setActiveList = list => dispatch =>
 dispatch({ type: SET_ACTIVE_LIST, list });
