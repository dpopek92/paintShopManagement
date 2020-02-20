import {
 SET_HOME_SEARCH,
 SET_SEARCH_RESULT,
 SET_SEARCH_RESULT_ERROR,
 SET_SORT_SEARCH_LIST,
 SET_SEARCH_VALUE,
 SET_SEARCH_VALUES_EMPTY
} from "../actions/types";
import setAuthToken from "../helpers/setAuthToken";
import Axios from "axios";

export const setSearchValuesEmpty = () => dispatch =>
 dispatch({
  type: SET_SEARCH_VALUES_EMPTY
 });
export const setSearchValue = (name, value) => dispatch =>
 dispatch({
  type: SET_SEARCH_VALUE,
  value,
  name
 });
export const setHomeSearch = value => dispatch =>
 dispatch({
  type: SET_HOME_SEARCH,
  value
 });
export const setSortBy = value => dispatch =>
 dispatch({
  type: SET_SORT_SEARCH_LIST,
  value
 });

export const setSearchResult = (data, end) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const config = {
   headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
   }
  };
  const body = JSON.stringify(data);
  const res = await Axios.post("/api/orders/admin/search", body, config);

  dispatch({
   type: SET_SEARCH_RESULT,
   value: res.data
  });
  end();
 } catch (err) {
  dispatch({
   type: SET_SEARCH_RESULT_ERROR
  });
  end();

  console.log(err.response);
 }
};
