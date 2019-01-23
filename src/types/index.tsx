import * as actions from '@/store/actions'
import { ActionType } from 'typesafe-actions'

export type Action = ActionType<typeof actions>

export interface ActionAny {
  type: string
  payload?: any
}

export interface ProjectListItem {
  name: string
  id: number
}

export interface ProjectInfo {
  name?: string
  id?: number
}



export interface UserInfo {
  nickName?: string
  id?: string
  mobile?: string
  password?: string
}

export interface ErrorChartDataItem {
  date: number
  count: number
}

export interface ErrorChartData {
  total: number
  data: ErrorChartDataItem[]
}

export enum Order {
  'ascend',
  'descend',
  false
}

export interface ErrorListParams {
  page?: number
  pageSize?: number
  status?: string
  type?: string
  projectId?:number,
  dateOrder?: Order
  userOrder?: Order
  eventOrder?: Order
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
  totalPage: number
  data: ErrorListDataItem[]
}

export interface ErrorChangeParams {
  userId?: number
  status?: string
  errorList: number[]
}


export interface ErrorInfo {
  id?: number
  status?: string
}
