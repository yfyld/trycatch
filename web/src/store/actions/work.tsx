import * as constants from "@/constants";
import { createAction } from "typesafe-actions";
import { AxiosResponse } from 'axios';
import {ErrorChartData,ErrorSearchParams,ErrorListData,ErrorChangeParams,EventListDataItem,PageData,EventInfo,ErrorInfo} from "@/types"


export const doGetErrorAllData = createAction(constants.GET_ERROR_ALL_DATA,resolve=>(params:ErrorSearchParams)=>resolve(params));

export const doGetErrorChartDataRequest = createAction(constants.GET_ERROR_CHART_REQUEST,resolve=>(params:ErrorSearchParams)=>resolve(params));
export const doGetErrorChartDataSuccess = createAction(constants.GET_ERROR_CHART_SUCCESS,resolve=>(response:AxiosResponse<ErrorChartData>)=>resolve(response.data));
export const doGetErrorChartDataFailure = createAction(constants.GET_ERROR_CHART_FAILURE);

export const doGetErrorListDataRequest = createAction(constants.GET_ERROR_LIST_REQUEST,resolve=>(params:ErrorSearchParams)=>resolve(params));
export const doGetErrorListDataSuccess = createAction(constants.GET_ERROR_LIST_SUCCESS,resolve=>(response:AxiosResponse<ErrorListData>)=>resolve(response.data));
export const doGetErrorListDataFailure = createAction(constants.GET_ERROR_LIST_FAILURE);


export const doErrorListSelectionChange = createAction(constants.ERROR_LIST_SELECTION_CHANGE,resolve=>(selectedRowKeys:number[])=>resolve(selectedRowKeys));


export const doErrorChange = createAction(constants.ERROR_CHANGE,resolve=>(params:ErrorChangeParams)=>resolve(params));


export const doGetEventListDataRequest = createAction(constants.GET_EVENT_LIST_REQUEST,resolve=>(params:{page?:number,errorId?:number})=>resolve(params));
export const doGetEventListDataSuccess = createAction(constants.GET_EVENT_LIST_SUCCESS,resolve=>(response:AxiosResponse<PageData<EventListDataItem>>)=>resolve(response.data));
export const doGetEventListDataFailure = createAction(constants.GET_EVENT_LIST_FAILURE);


export const doGetEventInfoRequest = createAction(constants.GET_EVENT_INFO_REQUEST,resolve=>(eventId:number)=>resolve(eventId));
export const doGetEventInfoSuccess = createAction(constants.GET_EVENT_INFO_SUCCESS,resolve=>(response:AxiosResponse<EventInfo>)=>resolve(response.data));
export const doGetEventInfoFailure = createAction(constants.GET_EVENT_INFO_FAILURE);


export const doGetErrorInfoRequest = createAction(constants.GET_ERROR_INFO_REQUEST,resolve=>(errorId:number)=>resolve(errorId));
export const doGetErrorInfoSuccess = createAction(constants.GET_ERROR_INFO_SUCCESS,resolve=>(response:AxiosResponse<ErrorInfo>)=>resolve(response.data));
export const doGetErrorInfoFailure = createAction(constants.GET_ERROR_INFO_FAILURE);