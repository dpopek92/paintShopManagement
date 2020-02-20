import { LOAD_PRICES, LOAD_PRICES_ERROR } from "../actions/types";
import setAuthToken from "../helpers/setAuthToken";
import Axios from "axios";

//LOAD PRICES
export const loadPrices = (end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/prices/`, {
   cancelToken: cancel
  });
  dispatch({ type: LOAD_PRICES, prices: res.data });
  //   console.log(res.data);
  end();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
   dispatch({ type: LOAD_PRICES_ERROR });
  } else {
   console.log(err.response);
   dispatch({ type: LOAD_PRICES_ERROR });
   end();
  }
 }
};
