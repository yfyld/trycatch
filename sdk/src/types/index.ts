import { TrycatchInfo } from '@/trycatchInfo'

export interface Trace {
  name?: string
  message?: string
  url?: string
  level?: number
  stack?: Stack[]
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
  level?: number
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
export interface HttpDetailData {
  elapsedTime: number
  type: string
  method: string
  url: string
  status: number
  statusText: string
  time: number
  responseText?: Promise<string> | string,
  reqData?: string | object
}

export interface PackageData {
  data: IError | IError[]
  behavior: Behavior[]
  libInfo: TrycatchInfo,
  info: SendInfo
}

export interface SendInfo {
  projectId: number,
  version: string,
  guarderId: number
}

export interface BehaviorClick {
  html?: string
  class?: string
  id?: string
  page?: string
  type?: string
  time?: number
}

export interface BehaviorPage {
  oldURL?: string
  newURL?: string
  firstVisit: boolean
  type?: string
  time?: number
}

export interface BehaviorHttp {
  time?: number
  type?: string
  url?: string
  method?: string
  page?: string
}

export interface BehaviorVue {}

export interface Behavior extends BehaviorClick, BehaviorHttp, BehaviorPage {}
