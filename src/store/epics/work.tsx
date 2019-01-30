import * as actions from '../actions'
import { Epic } from 'redux-observable'
import { switchMap, map, filter, mergeMap, tap } from 'rxjs/operators'

import { StoreState } from '@/store/reducers'
import { isActionOf } from 'typesafe-actions'
import * as Api from '@/api'
import { Action } from '@/types'
import {message} from "antd"

const getErrorChartData: Epic<Action, Action, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorChartDataRequest)),
    map(action => ({
      ...action,
      payload: { ...state$.value.work.errorSearchParams }
    })),
    switchMap(action =>
      Api.fetchErrorChartData(action.payload).pipe(
        map(actions.doGetErrorChartDataSuccess)
      )
    )
  )

const getErrorListData: Epic<Action, Action, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorListDataRequest)),
    map(action => ({
      ...action,
      payload: { ...state$.value.work.errorSearchParams }
    })),
    switchMap(action => {
      return Api.fetchErrorListData(action.payload).pipe(
        map(actions.doGetErrorListDataSuccess)
      )
    })
  )

const getErrorAllData: Epic<Action, Action, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorAllData)),
    mergeMap(action => [
      // actions.doGetErrorChartDataRequest(action.payload),
      actions.doGetErrorListDataRequest(action.payload)
    ])
  )

const errorChange: Epic<Action, Action, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doErrorChange)),
    switchMap(action =>
      Api.fetchErrorChange(action.payload).pipe(
        tap(()=>{message.success('修改成功')}),
        map(response=>{
          if (/dashboard/.test(state$.value.router.location.pathname)) {
            return actions.doGetErrorChartDataRequest({})
          }else{
            return actions.doGetErrorInfoRequest(state$.value.work.errorInfo.id)
          }
        })
        
      )
    )
  )

const getEventListData: Epic<Action, Action, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetEventListDataRequest)),
    switchMap(action =>
      Api.fetchEventList({
        ...state$.value.work.errorSearchParams,
        ...state$.value.work.eventListParams
      }).pipe(
        map(response => {
          if (response.data.data) {
            response.data.data = [].concat(
              state$.value.work.eventListData.data,
              response.data.data
            )
          }
          return response
        }),
        mergeMap(response => {
          if (
            state$.value.work.eventListParams.page === 1 &&
            response.data.data.length
          ) {
            // 默认获取第一条日志详情
            return [
              actions.doGetEventInfoRequest(response.data.data[0].id),
              actions.doGetEventListDataSuccess(response)
            ]
          } else {
            return [actions.doGetEventListDataSuccess(response)]
          }
        })
      )
    )
  )

const getEventInfo: Epic<Action, Action, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doGetEventInfoRequest)),
    switchMap(action =>
      Api.fetchEventInfo(action.payload).pipe(
        map(actions.doGetEventInfoSuccess)
      )
    )
  )

  const getErrorInfo: Epic<Action, Action, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorInfoRequest)),
    switchMap(action =>
      Api.fetchErrorInfo(action.payload).pipe(
        map(actions.doGetErrorInfoSuccess)
      )
    )
  )  

export default [
  getErrorListData,
  getErrorChartData,
  getErrorAllData,
  errorChange,
  getEventListData,
  getEventInfo,
  getErrorInfo
]
