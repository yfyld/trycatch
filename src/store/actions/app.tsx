import * as constants from "@/constants";
import { createAction } from "typesafe-actions";
import { AxiosResponse } from 'axios';
import {UserInfo} from "@/types"


export const doLogin = createAction(constants.LOGIN,resolve=>(params:UserInfo)=>resolve(params));
export const doSetUserInfo = createAction(constants.SET_USER_INFO,resolve=>(response:AxiosResponse<UserInfo>)=>resolve(response.data));