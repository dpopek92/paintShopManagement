import { LOGOUT_USER, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR } from '../actions/types';

// STORE WITH: TOKEN, USER INFO, USER ORDERS
const initialState = {
 token: localStorage.getItem('token'),
 isAuthenticated: null,
 user: {
  permission: null,
  isAccepted: null,
  isTrusted: null,
  _id: null,
  firstname: null,
  surname: null,
 },
};

export default (state = initialState, action) => {
 switch (action.type) {
  case LOGIN_SUCCESS:
   localStorage.setItem('token', action.token);
   return {
    ...state,
    isAuthenticated: true,
    token: action.token,
   };
  case AUTH_ERROR:
   localStorage.removeItem('token');
   localStorage.removeItem('permission');
   return initialState;
  case USER_LOADED:
   localStorage.setItem('permission', action.payload.permission);
   return { ...state, isAuthenticated: true, user: action.payload };
  case LOGOUT_USER:
   localStorage.removeItem('token');
   localStorage.removeItem('permission');
   return initialState;
  default:
   return state;
 }
};
