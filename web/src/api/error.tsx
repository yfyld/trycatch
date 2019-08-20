import fetch from './http'
import { from } from 'rxjs'
import { ErrorChangeParams } from '@/types'

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

export function fetchErrorChange(data: ErrorChangeParams) {
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
