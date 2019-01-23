import * as constants from "@/constants";
import { createAction } from "typesafe-actions";
import { AxiosResponse } from 'axios';
import {UserInfo} from "@/types"


export const doLoginRequest = createAction(constants.LOGIN_REQUEST,resolve=>(params:UserInfo)=>resolve(params));
export const doLoginSuccess = createAction(constants.LOGIN_SUCCESS);
export const doLoginFailure = createAction(constants.LOGIN_FAILURE);


export const doGetUserInfoRequest = createAction(constants.GET_USER_INFO_REQUEST);
export const doGetUserInfoSuccess = createAction(constants.GET_USER_INFO_SUCCESS,resolve=>(response:AxiosResponse<UserInfo>)=>resolve(response.data));
export const doGetUserInfoFailure = createAction(constants.GET_USER_INFO_FAILURE);