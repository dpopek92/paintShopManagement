import { Auth } from '../types/auth/Auth';
import {
 AUTH_LOGIN_SUCCESS,
 AUTH_LOGIN_ERROR,
 AUTH_USER_LOAD_SUCCESS,
 AUTH_LOGOUT_USER,
 AUTH_USER_PROFILE_LOAD_SUCCESS,
} from '../types/auth/actions';
import { authActions } from '../types/auth/actions';

const initialState: Auth = {
 token: localStorage.getItem('token'),
 isAuthenticated: false,
 user: {
  _id: '',
  company: '',
  firstname: '',
  surname: '',
  permission: '',
  email: '',
  isAccepted: false,
  isTrusted: false,
 },
 profile: null,
};

const authReducer = (state = initialState, action: authActions): Auth => {
 switch (action.type) {
  case AUTH_USER_PROFILE_LOAD_SUCCESS: {
   return { ...state, profile: action.profile };
  }

  case AUTH_LOGIN_SUCCESS: {
   localStorage.setItem('token', action.token);
   return { ...state, isAuthenticated: true, token: action.token };
  }

  case AUTH_LOGIN_ERROR: {
   localStorage.removeItem('token');
   localStorage.removeItem('permission');
   return { ...initialState };
  }

  case AUTH_USER_LOAD_SUCCESS: {
   localStorage.setItem('permission', action.permission);
   return { ...state, isAuthenticated: true, user: action.user };
  }

  case AUTH_LOGOUT_USER: {
   localStorage.removeItem('token');
   localStorage.removeItem('permission');
   return { ...initialState };
  }
  default:
   return state;
 }
};

export { authReducer };
