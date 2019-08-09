
import * as ACTIONTYPE from "@/constants/actionType";
import { createAction } from "typesafe-actions";
import {UserInfo, PageData, User, Project} from "@/types"
import {WrappedFormUtils} from 'antd/lib/form/Form';

export const doChangeLoadingStatus = createAction(ACTIONTYPE.CHANGE_LOADING_STATUS, action => (status: boolean, type: string) => action({type, status}));

export const doLoginRequest = createAction(ACTIONTYPE.LOGIN_REQUEST,resolve=>(form:WrappedFormUtils)=>resolve(form));
export const doLoginSuccess = createAction(ACTIONTYPE.LOGIN_SUCCESS);
export const doLoginFailure = createAction(ACTIONTYPE.LOGIN_FAILURE);


export const doLogoutRequest = createAction(ACTIONTYPE.LOGOUT_REQUEST);
export const doLogoutSuccess = createAction(ACTIONTYPE.LOGOUT_SUCCESS);
export const doLogoutFailure = createAction(ACTIONTYPE.LOGOUT_FAILURE);


export const doSignupRequest = createAction(ACTIONTYPE.SIGNUP_REQUEST,resolve=>(form:WrappedFormUtils)=>resolve(form));
export const doSignupSuccess = createAction(ACTIONTYPE.SIGNUP_SUCCESS);
export const doSignupFailure = createAction(ACTIONTYPE.SIGNUP_FAILURE);


export const doGetUserInfoRequest = createAction(ACTIONTYPE.GET_USER_INFO_REQUEST);
export const doGetUserInfoSuccess = createAction(ACTIONTYPE.GET_USER_INFO_SUCCESS,resolve=>(data: UserInfo)=>resolve(data));
export const doGetUserInfoFailure = createAction(ACTIONTYPE.GET_USER_INFO_FAILURE);


export const doGetUserListRequest = createAction(ACTIONTYPE.GET_USER_LIST_REQUEST)
export const doGetUserListSuccess = createAction(ACTIONTYPE.GET_USER_LIST_SUCCESS, resolve => (data: PageData<User>)=>resolve(data));
export const doGetUserListFailure = createAction(ACTIONTYPE.GET_USER_LIST_FAILURE);


export const doGetProjectAllListRequest = createAction(ACTIONTYPE.GET_PROJECT_ALL_LIST_REQUEST);
export const doGetProjectAllListSuccess = createAction(ACTIONTYPE.GET_PROJECT_ALL_LIST_SUCCESS, resolve => (data: PageData<Project>) => resolve(data));
export const doGetProjectAllListFailure = createAction(ACTIONTYPE.GET_PROJECT_ALL_LIST_FAILURE);
