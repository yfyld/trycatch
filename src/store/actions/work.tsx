import * as constants from "@/constants";
import { createAction } from "typesafe-actions";
import { AxiosResponse } from 'axios';
import {ErrorChartData,ErrorListParams,ErrorListData} from "@/types"


export const doGetErrorAllData = createAction(constants.GET_ERROR_ALL_DATA,resolve=>(params:ErrorListParams)=>resolve(params));
export const doGetErrorChartData = createAction(constants.GET_ERROR_CHART_DATA,resolve=>(params:ErrorListParams)=>resolve(params));
export const doGetErrorListData = createAction(constants.GET_ERROR_LIST_DATA,resolve=>(params:ErrorListParams)=>resolve(params));
export const doSetErrorChartData = createAction(constants.SET_ERROR_CHART_DATA,resolve=>(response:AxiosResponse<ErrorChartData>)=>resolve(response.data));
export const doSetErrorListData = createAction(constants.SET_ERROR_LIST_DATA,resolve=>(response:AxiosResponse<ErrorListData>)=>resolve(response.data));