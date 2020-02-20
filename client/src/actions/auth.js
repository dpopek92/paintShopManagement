import { LOGOUT_USER, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR } from './types';
import setAuthToken from '../helpers/setAuthToken';
import Axios from 'axios';

//LOGIN USER - TOKEN
export const logInSuccess = ({ token }) => dispatch =>
 dispatch({
  type: LOGIN_SUCCESS,
  token,
 });
export const logInFail = () => dispatch => {
 dispatch({
  type: AUTH_ERROR,
 });
};

//LOAD USER DATA
export const loadUser = () => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get('/api/auth');
  console.log(res.data);
  dispatch({ type: USER_LOADED, payload: res.data });
 } catch (err) {
  console.log(err);
  dispatch({ type: AUTH_ERROR });
 }
};

// LOGOUT
export const logOutUser = () => dispatch => {
 dispatch({
  type: LOGOUT_USER,
 });
};
