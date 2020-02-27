/* eslint-disable import/prefer-default-export */

import Axios from 'axios';
import setAuthToken from 'services/utils/setAuthToken';
import {
 loginSuccess,
 AUTH_LOGIN_SUCCESS,
 loginFail,
 AUTH_LOGIN_ERROR,
 AUTH_USER_LOAD_SUCCESS,
 logoutUser,
 AUTH_LOGOUT_USER,
 loadUser,
 profileLoadSuccess,
 AUTH_USER_PROFILE_LOAD_SUCCESS,
} from '../types/auth/actions';
import { Dispatch } from 'redux';
import { User } from '../types/auth/Auth';
import { Customer } from '../types/customers/Customers';

export const logInSuccess = (token: string): loginSuccess => ({
 type: AUTH_LOGIN_SUCCESS,
 token,
});

export const userLoadSuccess = (user: User, permission: string): loadUser => ({
 type: AUTH_USER_LOAD_SUCCESS,
 user,
 permission,
});

export const logInFail = (): loginFail => ({ type: AUTH_LOGIN_ERROR });

export const logOutUser = (): logoutUser => ({ type: AUTH_LOGOUT_USER });

export const userProfileLoadSuccess = (
 profile: Customer,
): profileLoadSuccess => ({ type: AUTH_USER_PROFILE_LOAD_SUCCESS, profile });

export const loadUserData = () => async (dispatch: Dispatch) => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 console.log('THUNK', 'loadUserData');
 try {
  const res = await Axios.get('/api/auth/');
  const user = res.data;
  const { permission } = user;

  dispatch(userLoadSuccess(user, permission));
 } catch (err) {
  console.log(`ERROR:`, err);
  dispatch(logInFail());
 }
};

export const loadUserProfile = () => async (dispatch: Dispatch) => {
 console.log('THUNK', 'loadUserProfile');
 try {
  const res = await Axios.get('/api/customers/me');
  dispatch(userProfileLoadSuccess(res.data));
 } catch (err) {
  console.log(`ERROR:`, err);
 }
};
