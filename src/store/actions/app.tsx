import * as constants from "@/constants";
import { createAction } from "typesafe-actions";
import { AxiosResponse } from 'axios';
import {UserInfo, User} from "@/types"
import {WrappedFormUtils} from 'antd/lib/form/Form';


export const doLoginRequest = createAction(constants.LOGIN_REQUEST,resolve=>(form:WrappedFormUtils)=>resolve(form));
export const doLoginSuccess = createAction(constants.LOGIN_SUCCESS);
export const doLoginFailure = createAction(constants.LOGIN_FAILURE);


export const doLogoutRequest = createAction(constants.LOGOUT_REQUEST);
export const doLogoutSuccess = createAction(constants.LOGOUT_SUCCESS);
export const doLogoutFailure = createAction(constants.LOGOUT_FAILURE);


export const doSignupRequest = createAction(constants.SIGNUP_REQUEST,resolve=>(form:WrappedFormUtils)=>resolve(form));
export const doSignupSuccess = createAction(constants.SIGNUP_SUCCESS);
export const doSignupFailure = createAction(constants.SIGNUP_FAILURE);


export const doGetUserInfoRequest = createAction(constants.GET_USER_INFO_REQUEST);
export const doGetUserInfoSuccess = createAction(constants.GET_USER_INFO_SUCCESS,resolve=>(response:AxiosResponse<UserInfo>)=>resolve(response.data));
export const doGetUserInfoFailure = createAction(constants.GET_USER_INFO_FAILURE);


export const doGetUserListRequest = createAction(constants.GET_USER_LIST_REQUEST)
export const doGetUserListSuccess = createAction(constants.GET_USER_LIST_SUCCESS, resolve => (response: AxiosResponse<User[]>)=>resolve(response.data));
export const doGetUserListFailure = createAction(constants.GET_USER_LIST_FAILURE);