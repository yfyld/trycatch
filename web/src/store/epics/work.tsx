import * as actions from '../actions'
import { Epic } from 'redux-observable'
import { of } from 'rxjs';
import { switchMap, map, filter, mergeMap, tap, catchError } from 'rxjs/operators'
import { AxiosResponse } from 'axios';
import { StoreState } from '@/store/reducers'
import { isActionOf } from 'typesafe-actions'
import * as Api from '@/api'
import { IAction, IPageData, IErrorListDataItem, EventListDataItem, IEventInfo, IErrorInfo, IErrorChartData, IEventChartData } from '@/types'
import {message} from "antd"

const getErrorChartData: Epic<IAction, IAction, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorChartDataRequest)),
    map(action => ({
      ...action,
      payload: { ...state$.value.work.errorSearchParams }
    })),
    switchMap(action =>
      Api.fetchErrorChartData(action.payload).pipe(
        map(({ data}: AxiosResponse<IErrorChartData>) => actions.doGetErrorChartDataSuccess(data)),
        catchError(err => of(actions.doGetErrorChartDataFailure()))
      )
    )
  )

const getErrorListData: Epic<IAction, IAction, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorListDataRequest)),
    map(action => ({
      ...action,
      payload: { ...state$.value.work.errorSearchParams }
    })),
    mergeMap(action => {
      return Api.fetchErrorListData(action.payload).pipe(
        map(({data}: AxiosResponse<IPageData<IErrorListDataItem>>) => actions.doGetErrorListDataSuccess(data)),
        catchError(err => of(actions.doGetErrorListDataFailure()))
      )
    })
  )

const getErrorAllData: Epic<IAction, IAction, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorAllData)),
    mergeMap(action => [
      // actions.doGetErrorChartDataRequest(action.payload),
      actions.doGetErrorListDataRequest(action.payload)
    ])
  )

const errorChange: Epic<IAction, IAction, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doErrorChange)),
    switchMap(({payload: { requestInfo, ...data}}) =>
      Api.fetchErrorChange(data).pipe(
        tap(()=>{message.success('修改成功')}),
        map(response=>{
          if (requestInfo) {
            return actions.doGetErrorInfoRequest(state$.value.work.errorId)
            
          }else{
            return actions.doGetErrorListDataRequest({...state$.value.work.errorSearchParams})
          }
        }),
        catchError(err => of(actions.doGetErrorInfoFailure()))
        
      )
    )
  )

const getEventListData: Epic<IAction, IAction, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetEventListDataRequest)),
    switchMap(action =>
      Api.fetchEventList({
        // ...state$.value.work.errorSearchParams,
        // ...state$.value.work.eventListParams,
        ...action.payload
      }).pipe(
        mergeMap(({ data:  { list = [], totalCount = 0 }}: AxiosResponse<IPageData<EventListDataItem>>) => {
          const page = state$.value.work.eventListParams.page;
          if (
            page === 1 &&
            list.length
          ) {
            // 默认获取第一条日志详情
            return [
              // actions.doGetEventInfoRequest(list[0].id),
              actions.doGetEventListDataSuccess({list, totalCount}),
              actions.doSetEventInfo(list[0])
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

const getEventInfo: Epic<IAction, IAction, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doGetEventInfoRequest)),
    switchMap(action =>
      Api.fetchEventInfo(action.payload).pipe(
        map(({data}: AxiosResponse<IEventInfo>) => actions.doGetEventInfoSuccess(data)),
        catchError(err => of(actions.doGetEventInfoFailure()))
      )
    )
  )

  const getErrorInfo: Epic<IAction, IAction, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorInfoRequest)),
    switchMap(action =>
      Api.fetchErrorInfo(action.payload).pipe(
        map(({data}: AxiosResponse<IErrorInfo>) => actions.doGetErrorInfoSuccess(data)),
        catchError(err => of(actions.doGetErrorInfoFailure()))
      )
    )
  )  

  const getEventChartData: Epic<IAction, IAction, StoreState> = action$ => 
        action$.pipe(
          filter(isActionOf(actions.doGetEventChartDataRequest)),
          mergeMap(action => Api.fetchEventChart(action.payload).pipe(
            map(({data}: AxiosResponse<IEventChartData>) => actions.doGetEventChartDataSuccess(data)),
            catchError(err => {
              message.warning(err.message || '请求失败');
              return of(actions.doGetEventChartDataFailure())
            })
          ))
        )


const parseSourcemap: Epic<IAction, IAction, StoreState> = (action$,state$) => 
        action$.pipe(
          filter(isActionOf(actions.doParseSourcemapRequest)),
          map(action=>{
            const info = state$.value.work.eventInfo.info;
            return {stack:action.payload,projectId:info.projectId,version:info.version}
          }),
          switchMap(action => Api.fetchSourcemapParse(action).pipe(
            mergeMap(({data:result}) => {
              const eventList={...state$.value.work.eventListData};
              const eventInfo = JSON.parse(JSON.stringify(state$.value.work.eventInfo));
              eventInfo.data.stack=eventInfo.data.stack.map(item=>(item.url===action.stack.url&&item.line===action.stack.line&&item.column===action.stack.column)?{...item,source:result}:item)
              eventList.list=eventList.list.map(item=>item.id===eventInfo.id?eventInfo:item)
              return [actions.doParseSourcemapSuccess(eventList),actions.doSetEventInfo(eventInfo)];
            }),
            catchError(err => {
              message.warning(err.message || '请求失败');
              return of(actions.doParseSourcemapFailure())
            })
          ))
        )

export default [
  getErrorListData,
  getErrorChartData,
  getErrorAllData,
  errorChange,
  getEventListData,
  getEventInfo,
  getErrorInfo,
  getEventChartData,
  parseSourcemap
]
