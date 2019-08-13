import * as actions from '@/store/actions'
import { ActionType } from 'typesafe-actions'
import {StoreState} from '@/store/reducers'



export interface ResponseOk<T> {
  message: string,
  result: T
}

export interface PageData<T>{
  totalCount:number,
  list:T[]
}

export interface ListResult<T> {
  result: PageData<T>
}
export interface PageQuery{
  page?:number,
  pageSize?:number
}

export type StoreState=StoreState;

export type Action = ActionType<typeof actions>

export interface ActionAny {
  type: string
  payload?: any
}



export interface UserInfo {
  username?: string
  id?: string
  nickName?: string
  password?: string
}


export interface ProjectListItem {
  name: string
  id: number
  description?: string
}

export interface  Member{
  username?: string
  nickName?: string
  id: number
  mobile?: string
  isAdmin?:boolean
  isOwner?:boolean
}

export interface User {
  username?: string,
  id: number,
  nickName: string
}

export interface Project {
  id: number,
  name: string
}

export interface ProjectInfo {
  name?: string
  id?: number,
  members?: User[],
  guarderId?: number,
  description?: string
}


export interface ProjectDetail {
  activeKey: string,
  tabs: string[]
}

export interface ProjectMemberOperate {
  projectId: number,
  memberIds: number[]
}


export interface ErrorChartDataItem {
  date: number
  count: number
}

export interface ErrorChartData {
  totalCount: number
  data: ErrorChartDataItem[]
}

export enum Order {
  'ascend',
  'descend',
  false
}

export interface ErrorSearchParams extends PageQuery {
  status?: string
  type?: string
  level?:number
  projectId?:number
  order?: Order
  orderKey?: string
  page?:number
  pageSize?:number
  endDate?:number,
  startDate?:number
}

export interface ErrorListDataItem {
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

export interface ErrorListData {
  totalCount: number
  list: ErrorListDataItem[]
}

export interface ErrorChangeParams {
  // errorList: number[],
  // updateData:{
  //   ownerId?: number
  //   status?: string
  //   level?: number
  // }
  guarderId?: number,
  level?: number,
  status?: number,
  errorIds?: number[],
  actionType?: string,
  requestInfo?: boolean
}


export interface ErrorInfo {
  id?: number
  status?: string,
  eventNum?: number,
  userNum?: number,
  version?: string,
  url?: string
}

export interface EventInfo {
  id?: number
  status?: string
  url?:string
  type?:string
  source?:string,
  name?: string,
  ip?: string,
  behavior?: BehaviorListItem[],
  stack?: Stack[]
}

export interface BehaviorListItem {
  type?: string,
  time?: number,
  page?: string,
  id?: string,
  class?: string,
  html?: string,
  method?: string,
  url?: string,
  oldURL?: string,
  newURL?: string,
}


export interface Stack {
  line?: number
  column?: number
  args?: any[]
  func?: string
  url?: string
}

export interface ErrorJavaScript {
  type: string
  message?: string
  name?: string
  stack?: Stack[]
  url?: string
  level?: number,
  line?: number,
  column: number
}

export interface HttpRequest {
  url: string
  method: string
  data: string
}

export interface HttpResponse {
  status: number
  statusText: string
  description: string
}

export interface ErrorHttp {
  type: string
  url?: string
  time?: number
  elapsedTime?: number
  level?: number
  response?: HttpResponse
  request?: HttpRequest,
  status?: number,
  statuText?: string,
  method?: string
}

export interface ErrorLog {
  type: string
  info?: string
  level?: number
  url?: string
  name?: string
  message?: string
}

export interface ErrorVue {
  type: string
  message?: string
  level?: number
  url?: string
  componentName?: string
  propsData?: any
  name?: string
  stack?: Stack[]
  time?: number
}

export interface IError extends ErrorJavaScript, ErrorHttp, ErrorLog, ErrorVue {
  errorId?: number
  createTime?: number
  updateTime?: number
  userAgent?: any
  eventNum?: number
}

export interface EventListDataItem {
  // url?: string;
  // type?: string;
  // id?: number
  // status?: string,
  // os?: string,
  // osVersion?: string,
  // browser?: string,
  // browserVersion?: string,
  // device?: string,
  // location?: Location,
  // createTime?: number
  location: Location,
  clientInfo: ClientInfo,
  behavior: BehaviorListItem[],
  libInfo: LibInfo,
  info: Info,
  data: IError,
  source: Source,
  id: number
}

export interface ErrorPostData {
  url: string,
  type: string,
  name: string,
  errorId: string,
  stack: Stack[],
  message: string,
  time: number
}


export interface Source {
  line: number,
  column: number,
  code: string,
  sourceUrl: string,
  name: string
}
export interface Location {
  region: string,
  isp: string,
}
export interface ClientInfo {
  ua: string,
  os: string,
  osVersion: string,
  browser: string,
  browserVersion: string,
  device: string
}

export interface LibInfo {
  libVersion: string,
  libType: string
}

export interface Info {
  projectId: number,
  version: string
}
export interface EventChartSearchData {
  projectId: number,
  errorId: number,
  startDate: number,
  endDate: number
}

export interface ChartData<T> {
  data: T[],
  totalCount: number
}


export interface EventChartData {
  trendStat: ChartData<ChartDateData>,
  osStat: ChartData<ChartCategoryDate>,
  browserStat: ChartData<ChartCategoryDate>,
  deviceStat: ChartData<ChartCategoryDate>
}

export interface ChartDateData {
  date: number,
  count: number
}

export interface ChartCategoryDate {
  name: string,
  count: number
}