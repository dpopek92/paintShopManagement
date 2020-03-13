import { UserT } from './Auth';
import { CustomerT } from '../customers/Customers';

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_USER_LOAD_SUCCESS = 'AUTH_USER_LOAD_SUCCESS';
export const AUTH_USER_PROFILE_LOAD_SUCCESS = 'AUTH_USER_PROFILE_LOAD_SUCCESS';
export const AUTH_LOGOUT_USER = 'AUTH_LOGOUT_USER';

export interface loginSuccessT {
 type: typeof AUTH_LOGIN_SUCCESS;
 token: string;
}

export interface profileLoadSuccessT {
 type: typeof AUTH_USER_PROFILE_LOAD_SUCCESS;
 profile: CustomerT;
}

export interface loginFailT {
 type: typeof AUTH_LOGIN_ERROR;
}

export interface loadUserT {
 type: typeof AUTH_USER_LOAD_SUCCESS;
 user: UserT;
 permission: string;
}

export interface logoutUserT {
 type: typeof AUTH_LOGOUT_USER;
}

export type authActionsT =
 | loginSuccessT
 | loginFailT
 | loadUserT
 | profileLoadSuccessT
 | logoutUserT;
