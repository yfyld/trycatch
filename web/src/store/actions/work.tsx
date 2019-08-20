import * as ACTIONTYPE from "@/constants/actionType";
import { createAction } from "typesafe-actions";
import {ErrorChartData,ErrorSearchParams,ErrorChangeParams,EventListDataItem,PageData,EventInfo,ErrorInfo, ErrorListDataItem, EventChartSearchData, EventChartData, EventListParams} from "@/types"


export const doGetErrorAllData = createAction(ACTIONTYPE.GET_ERROR_ALL_DATA,resolve=>(params:ErrorSearchParams)=>resolve(params));

export const doGetErrorChartDataRequest = createAction(ACTIONTYPE.GET_ERROR_CHART_REQUEST,resolve=>(params:ErrorSearchParams)=>resolve(params));
export const doGetErrorChartDataSuccess = createAction(ACTIONTYPE.GET_ERROR_CHART_SUCCESS,resolve=>(data:ErrorChartData)=>resolve(data));
export const doGetErrorChartDataFailure = createAction(ACTIONTYPE.GET_ERROR_CHART_FAILURE);

export const doGetErrorListDataRequest = createAction(ACTIONTYPE.GET_ERROR_LIST_REQUEST,resolve=>(params:ErrorSearchParams)=>resolve(params));
export const doGetErrorListDataSuccess = createAction(ACTIONTYPE.GET_ERROR_LIST_SUCCESS,resolve=>(data: PageData<ErrorListDataItem>)=>resolve(data));
export const doGetErrorListDataFailure = createAction(ACTIONTYPE.GET_ERROR_LIST_FAILURE);


export const doErrorListSelectionChange = createAction(ACTIONTYPE.ERROR_LIST_SELECTION_CHANGE,resolve=>(selectedRowKeys:number[])=>resolve(selectedRowKeys));


export const doErrorChange = createAction(ACTIONTYPE.ERROR_CHANGE,resolve=>(params:ErrorChangeParams)=>resolve(params));


export const doGetEventListDataRequest = createAction(ACTIONTYPE.GET_EVENT_LIST_REQUEST,resolve=>(params: EventListParams)=>resolve(params));
export const doGetEventListDataSuccess = createAction(ACTIONTYPE.GET_EVENT_LIST_SUCCESS,resolve=>(data: PageData<EventListDataItem>)=>resolve(data));
export const doGetEventListDataFailure = createAction(ACTIONTYPE.GET_EVENT_LIST_FAILURE);


export const doGetEventInfoRequest = createAction(ACTIONTYPE.GET_EVENT_INFO_REQUEST,resolve=>(eventId:number)=>resolve({logId: eventId}));
export const doGetEventInfoSuccess = createAction(ACTIONTYPE.GET_EVENT_INFO_SUCCESS,resolve=>(data: EventInfo)=>resolve(data));
export const doGetEventInfoFailure = createAction(ACTIONTYPE.GET_EVENT_INFO_FAILURE);


export const doGetErrorInfoRequest = createAction(ACTIONTYPE.GET_ERROR_INFO_REQUEST,resolve=>(errorId:string)=>resolve(errorId));
export const doGetErrorInfoSuccess = createAction(ACTIONTYPE.GET_ERROR_INFO_SUCCESS,resolve=>(data: ErrorInfo)=>resolve(data));
export const doGetErrorInfoFailure = createAction(ACTIONTYPE.GET_ERROR_INFO_FAILURE);


export const doGetEventChartDataRequest = createAction(ACTIONTYPE.GET_EVENT_CHART_DATA_REQUEST, resolve => (params: EventChartSearchData) => resolve(params));
export const doGetEventChartDataSuccess = createAction(ACTIONTYPE.GET_EVENT_CHART_DATA_SUCCESS, resolve => (data: EventChartData) => resolve(data))
export const doGetEventChartDataFailure = createAction(ACTIONTYPE.GET_EVENT_CHART_DATA_FAILURE)


export const doSetEventId = createAction(ACTIONTYPE.SET_EVENT_ID, resolve => (eventId: number) => resolve(eventId));