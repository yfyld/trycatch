import * as actions from '../actions'
import { Epic } from 'redux-observable'
import { of } from 'rxjs';
import { switchMap, map, filter, mergeMap, tap, catchError } from 'rxjs/operators'
import { AxiosResponse } from 'axios';
import { StoreState } from '@/store/reducers'
import { isActionOf } from 'typesafe-actions'
import * as Api from '@/api'
import { Action, ResponseOk, PageData, ErrorListDataItem, EventListDataItem, EventInfo, ErrorInfo } from '@/types'
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
        map(actions.doGetErrorChartDataSuccess),
        catchError(err => of(actions.doGetErrorChartDataFailure()))
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
    mergeMap(action => {
      return Api.fetchErrorListData(action.payload).pipe(
        map(({data: {result: { list = [], totalCount = 0}}}: AxiosResponse<ResponseOk<PageData<ErrorListDataItem>>>) => actions.doGetErrorListDataSuccess({list, totalCount})),
        catchError(err => of(actions.doGetErrorListDataFailure()))
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
            return actions.doGetErrorListDataRequest({...state$.value.work.errorSearchParams})
          }else{
            return actions.doGetErrorInfoRequest(state$.value.work.errorInfo.id)
          }
        }),
        catchError(err => of(actions.doGetErrorInfoFailure()))
        
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
        mergeMap(({ data: { result: { list = [], totalCount = 0 }}}: AxiosResponse<ResponseOk<PageData<EventListDataItem>>>) => {
          const page = state$.value.work.eventListParams.page;
          if (
            page === 1 &&
            list.length
          ) {
            // 默认获取第一条日志详情
            return [
              actions.doGetEventInfoRequest(list[0].id),
              actions.doGetEventListDataSuccess({list, totalCount})
            ]
          } else {
            return [actions.doGetEventListDataSuccess({list, totalCount})]
          }
        }),
        catchError(err => {
          return of(actions.doGetEventListDataFailure())
        })
      )
    )
  )

const getEventInfo: Epic<Action, Action, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doGetEventInfoRequest)),
    switchMap(action =>
      Api.fetchEventInfo(action.payload).pipe(
        map(({data: { result }}: AxiosResponse<ResponseOk<EventInfo>>) => actions.doGetEventInfoSuccess(result)),
        catchError(err => of(actions.doGetEventInfoFailure()))
      )
    )
  )

  const getErrorInfo: Epic<Action, Action, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorInfoRequest)),
    switchMap(action =>
      Api.fetchErrorInfo(action.payload).pipe(
        map(({data: { result }}: AxiosResponse<ResponseOk<ErrorInfo>>) => actions.doGetErrorInfoSuccess(result)),
        catchError(err => of(actions.doGetErrorInfoFailure()))
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
