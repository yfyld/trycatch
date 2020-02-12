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
  type: string,
  level: number,
  url: string,
  time: number,
  message?: string
  name?: string
  stack?: Stack[]
  line?: number,
  column?: number
}

export interface HttpRequest {
  url: string
  method: string
  data: string,
  params?: string
}

export interface HttpResponse {
  status: number
  statusText: string
  description: string
}

export interface ErrorHttp {
  type: string,
  level: number,
  url: string
  time: number
  elapsedTime?: number
  response?: HttpResponse
  request?: HttpRequest,
}

export interface ErrorLog {
  type: string,
  level: number,
  url: string,
  time: number,
  name?: string
  message?: string
}

export interface ErrorVue {
  type: string,
  level: number,
  url: string,
  time: number,
  componentName?: string,
  propsData?: any,
  name?: string,
  stack?: Stack[],
  message?: string
}

export interface ErrorResource {
  type: string,
  level: number,
  url: string,
  time: number,
  tagName?: string,
  src?: string,
  outerHTML?: string,
  timeStamp?: number,
  name?: string
}


// export type IError = ErrorJavaScript | ErrorHttp | ErrorLog | ErrorVue | ErrorResource
export interface IError extends ErrorJavaScript, ErrorHttp, ErrorLog, ErrorVue, ErrorResource {
  errorId?: string
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
  libInfo: TrycatchInfo
  info: SendInfo
}

export interface SendInfo {
  projectId: number
  version: string
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

export interface BehaviorVue { }

export interface Behavior extends BehaviorClick, BehaviorHttp, BehaviorPage { }


export interface EventParam<T> {
  canBubbleArg: boolean
  cancelableArg: boolean
  detailArg: T
}
