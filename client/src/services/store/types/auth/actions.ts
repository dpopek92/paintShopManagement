import { User } from './Auth';
import { Customer } from '../customers/Customers';

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_USER_LOAD_SUCCESS = 'AUTH_USER_LOAD_SUCCESS';
export const AUTH_USER_PROFILE_LOAD_SUCCESS = 'AUTH_USER_PROFILE_LOAD_SUCCESS';
export const AUTH_LOGOUT_USER = 'AUTH_LOGOUT_USER';

export interface loginSuccess {
 type: typeof AUTH_LOGIN_SUCCESS;
 token: string;
}

export interface profileLoadSuccess {
 type: typeof AUTH_USER_PROFILE_LOAD_SUCCESS;
 profile: Customer;
}

export interface loginFail {
 type: typeof AUTH_LOGIN_ERROR;
}

export interface loadUser {
 type: typeof AUTH_USER_LOAD_SUCCESS;
 user: User;
 permission: string;
}

export interface logoutUser {
 type: typeof AUTH_LOGOUT_USER;
}

export type authActions =
 | loginSuccess
 | loginFail
 | loadUser
 | profileLoadSuccess
 | logoutUser;
