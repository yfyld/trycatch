import * as ACTIONTYPE from "@/constants/actionType";
import { createAction } from "typesafe-actions";
import {IErrorChartData,IErrorSearchParams,IErrorChangeParams,EventListDataItem,IPageData,IEventInfo,IErrorInfo, IErrorListDataItem, IEventChartSearchData, IEventChartData, IEventListParams} from "@/types"
import {  IStack } from '@/api';


export const doGetErrorAllData = createAction(ACTIONTYPE.GET_ERROR_ALL_DATA,resolve=>(params:IErrorSearchParams)=>resolve(params));

export const doGetErrorChartDataRequest = createAction(ACTIONTYPE.GET_ERROR_CHART_REQUEST,resolve=>(params:IErrorSearchParams)=>resolve(params));
export const doGetErrorChartDataSuccess = createAction(ACTIONTYPE.GET_ERROR_CHART_SUCCESS,resolve=>(data:IErrorChartData)=>resolve(data));
export const doGetErrorChartDataFailure = createAction(ACTIONTYPE.GET_ERROR_CHART_FAILURE);

export const doGetErrorListDataRequest = createAction(ACTIONTYPE.GET_ERROR_LIST_REQUEST,resolve=>(params:IErrorSearchParams)=>resolve(params));
export const doGetErrorListDataSuccess = createAction(ACTIONTYPE.GET_ERROR_LIST_SUCCESS,resolve=>(data: IPageData<IErrorListDataItem>)=>resolve(data));
export const doGetErrorListDataFailure = createAction(ACTIONTYPE.GET_ERROR_LIST_FAILURE);


export const doErrorListSelectionChange = createAction(ACTIONTYPE.ERROR_LIST_SELECTION_CHANGE,resolve=>(selectedRowKeys:number[])=>resolve(selectedRowKeys));


export const doErrorChange = createAction(ACTIONTYPE.ERROR_CHANGE,resolve=>(params:IErrorChangeParams)=>resolve(params));


export const doGetEventListDataRequest = createAction(ACTIONTYPE.GET_EVENT_LIST_REQUEST,resolve=>(params: IEventListParams)=>resolve(params));
export const doGetEventListDataSuccess = createAction(ACTIONTYPE.GET_EVENT_LIST_SUCCESS,resolve=>(data: IPageData<EventListDataItem>)=>resolve(data));
export const doGetEventListDataFailure = createAction(ACTIONTYPE.GET_EVENT_LIST_FAILURE);


export const doGetEventInfoRequest = createAction(ACTIONTYPE.GET_EVENT_INFO_REQUEST,resolve=>(eventId:number)=>resolve({logId: eventId}));
export const doGetEventInfoSuccess = createAction(ACTIONTYPE.GET_EVENT_INFO_SUCCESS,resolve=>(data: IEventInfo)=>resolve(data));
export const doGetEventInfoFailure = createAction(ACTIONTYPE.GET_EVENT_INFO_FAILURE);


export const doGetErrorInfoRequest = createAction(ACTIONTYPE.GET_ERROR_INFO_REQUEST,resolve=>(errorId:string)=>resolve(errorId));
export const doGetErrorInfoSuccess = createAction(ACTIONTYPE.GET_ERROR_INFO_SUCCESS,resolve=>(data: IErrorInfo)=>resolve(data));
export const doGetErrorInfoFailure = createAction(ACTIONTYPE.GET_ERROR_INFO_FAILURE);


export const doGetEventChartDataRequest = createAction(ACTIONTYPE.GET_EVENT_CHART_DATA_REQUEST, resolve => (params: IEventChartSearchData) => resolve(params));
export const doGetEventChartDataSuccess = createAction(ACTIONTYPE.GET_EVENT_CHART_DATA_SUCCESS, resolve => (data: IEventChartData) => resolve(data))
export const doGetEventChartDataFailure = createAction(ACTIONTYPE.GET_EVENT_CHART_DATA_FAILURE)


export const doSetEventInfo = createAction(ACTIONTYPE.SET_EVENT_ID, resolve => (param: IEventInfo) => resolve(param));




export const doParseSourcemapRequest = createAction(ACTIONTYPE.GET_PARSE_SOURCEMAP_REQUEST, resolve => (params: IStack) => resolve(params));
export const doParseSourcemapSuccess = createAction(ACTIONTYPE.GET_PARSE_SOURCEMAP_SUCCESS, resolve => (data:IPageData<EventListDataItem>) => resolve(data))
export const doParseSourcemapFailure = createAction(ACTIONTYPE.GET_PARSE_SOURCEMAP_FAILURE)
