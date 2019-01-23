import * as actions from '../actions'
import { Epic } from 'redux-observable'
import {switchMap ,map,filter, mergeMap} from 'rxjs/operators';

import { StoreState } from "@/store/reducers";
import { isActionOf } from 'typesafe-actions'
import * as Api from "@/api"
import {Action} from "@/types"



const getErrorChartData: Epic<Action, Action, StoreState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorChartDataRequest)),
    switchMap(action=>
      Api.fetchErrorChartData(action.payload).pipe(
        map(actions.doGetErrorChartDataSuccess)
      )
    )
  )

  const getErrorListData: Epic<Action, Action, StoreState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorListDataRequest)),
    switchMap(action=>
      Api.fetchErrorListData(action.payload).pipe(
        map(actions.doGetErrorListDataSuccess)
      )
    )
  )


  const getErrorAllData: Epic<Action, Action, StoreState> = (action$,state$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorAllData)),
    map(action=>({...action,payload:{...state$.value.work.errorSearchParams}})),
    mergeMap((action)=>[
      actions.doGetErrorChartDataRequest(action.payload),
      actions.doGetErrorListDataRequest(action.payload)
    ])
    
  )

const errorChange: Epic<Action, Action, StoreState> = (action$,state$) =>
  action$.pipe(
    filter(isActionOf(actions.doErrorChange)),
    switchMap(action=>
      Api.fetchErrorChange(state$.value.work.errorInfo.id,action.payload).pipe(
        map(()=>{
          if(/dashboard/.test(state$.value.router.location.pathname)){
            actions.doGetErrorChartDataRequest({})
          }
          return action
        })
      )
    )
  ) 

  const getEventListData: Epic<Action, Action, StoreState> = (action$,state$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetEventListDataRequest)),
    switchMap(action=>
      Api.fetchErrorEventList(state$.value.work.errorInfo.id,action.payload).pipe(
        map(actions.doGetEventListDataSuccess)
      )
    )
  )
  

export default [
  getErrorListData,
  getErrorChartData,
  getErrorAllData,
  errorChange,
  getEventListData
]

