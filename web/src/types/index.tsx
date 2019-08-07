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
}

export interface  Member{
  username?: string
  nickName?: string
  id?: string
  mobile?: string
  isAdmin?:boolean
  isOwner?:boolean
}

export interface User {
  username?: string,
  id: string,
  nickName: string
}

export interface Project {
  id: number
}

export interface ProjectInfo {
  name?: string
  id?: number,
  members?: User[],
  guarderId?: number
}


export interface ProjectDetail {
  activeKey: string,
  tabs: string[]
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
  endTime?:number,
  startTime?:number
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
  actionType?: string
}


export interface ErrorInfo {
  id?: number
  status?: string
}

export interface EventInfo {
  id?: number
  status?: string
  url?:string
  type?:string
  source?:string
}

export interface EventListDataItem {
  url?: string;
  type?: string;
  id?: number
  status?: string
}

