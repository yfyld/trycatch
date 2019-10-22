import fetch from './http'
import { from } from 'rxjs'
import { IPageQuery, IClientInfo, ILibInfo, IInfo, ISource } from '@/types'



export interface IErrorChartDataItem {
  date: number
  count: number
}

export interface IErrorChartData {
  totalCount: number
  data: IErrorChartDataItem[]
}

export enum IOrder {
  'ascend',
  'descend',
  false
}

export interface IErrorSearchParams extends IPageQuery {
  status?: string
  type?: string
  level?: number
  projectId?: number
  order?: IOrder
  orderKey?: string
  page?: number
  pageSize?: number
  endDate?: number
  startDate?: number
}

export interface IEventListParams extends IPageQuery {
  endDate?: number
  startDate?: number
  errorId?: number
  projectId?: number
}
export interface IErrorListDataItem {
  key: string
  type: string
  status: string
  date: number
  eventTotal: number
  userTotal: number
  version: string
  name: string
  appointer: string
}

export interface IErrorListData {
  totalCount: number
  list: IErrorListDataItem[]
}

export interface IErrorChangeParams {
  // errorList: number[],
  // updateData:{
  //   ownerId?: number
  //   status?: string
  //   level?: number
  // }
  guarderId?: number
  level?: number
  status?: number
  errorIds?: number[]
  actionType?: string
  requestInfo?: boolean
}

export interface IErrorInfo {
  id?: string
  status?: string
  eventNum?: number
  userNum?: number
  version?: string
  url?: string
}


export interface IBehaviorListItem {
  type?: string
  time?: number
  page?: string
  id?: string
  class?: string
  html?: string
  method?: string
  url?: string
  oldURL?: string
  newURL?: string
}

export interface IStack {
  line: number
  column: number
  args: any[]
  func: string
  url: string
  source?:any
}



export interface IHttpRequest {
  url: string
  method: string
  data: string
  params: string
}

export interface IHttpResponse {
  status: number
  statusText: string
  description: string
}

// js error
export interface IError {
  errorId:string
  projectId:number
  type: string;
  level: number
  url: string
  time: number;
  message: string;
  name: string
  stack?: IStack[],
  componentName?: string
  propsData?: any
  elapsedTime?: number
  response?: IHttpResponse
  request?: IHttpRequest
  line?: number
column?: number
}


export interface EventListDataItem {
  location: ILocation
  clientInfo: IClientInfo
  behavior: IBehaviorListItem[]
  libInfo: ILibInfo
  info: IInfo
  data: IError
  source?: ISource
  id: number
  version:string
}


export interface IEventInfo {
  location: ILocation
  clientInfo: IClientInfo
  behavior: IBehaviorListItem[]
  libInfo: ILibInfo
  info: IInfo
  data: IError
  source?: ISource
  id: number
  version:string
}

export interface IErrorPostData {
  url: string
  type: string
  name: string
  errorId: string
  stack: IStack[]
  message: string
  time: number
}


export interface ISource {
  line: number
  column: number
  code: string
  sourceUrl: string
  name: string
}
export interface ILocation {
  region: string
  isp: string
}
export interface IClientInfo {
  ua: string
  os: string
  osVersion: string
  browser: string
  browserVersion: string
  device: string
}

export interface ILibInfo {
  libVersion: string
  libType: string
}

export interface IInfo {
  projectId: number
  version: string
}
export interface IEventChartSearchData {
  projectId: number
  errorId: number
  startDate: number
  endDate: number
}

export interface IChartData<T> {
  data: T[]
  totalCount: number
}

export interface IEventChartData {
  trendStat: IChartData<IChartDateData>
  osStat: IChartData<IChartCategoryDate>
  browserStat: IChartData<IChartCategoryDate>
  deviceStat: IChartData<IChartCategoryDate>
}

export interface IChartDateData {
  date: number
  count: number
}

export interface IChartCategoryDate {
  name: string
  count: number
}


// 错误
export function fetchErrorChartData(params?: object) {
  return from(fetch.get(`/search/stat/error`, params))
}

export function fetchErrorListData(params?: object) {
  return from(fetch.get(`/error`, params))
}

export function fetchErrorStatusUpdate(errorId: number, params?: object) {
  return from(fetch.post(`/error/${errorId}`, params))
}

export function fetchErrorInfo(errorId: string) {
  return from(fetch.get(`/error/info`, { errorId }))
}

export function fetchErrorChange(data: IErrorChangeParams) {
  return from(fetch.put(`/error`, data))
}

export function fetchEventList(params: any) {
  return from(fetch.get(`/search/log`, params))
}

export function fetchEventInfo(params) {
  return from(fetch.get(`/error/log-info`, params))
}

export function fetchEventChart(params) {
  return from(fetch.get(`search/stat/log`, params))
}
