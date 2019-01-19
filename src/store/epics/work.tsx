import * as actions from '../actions'
import { Epic } from 'redux-observable'
import {switchMap ,map,filter, mergeMap} from 'rxjs/operators';

import { StoreState } from "@/store/reducers";
import { isActionOf } from 'typesafe-actions'
import * as Api from "@/api"
import {ActionNormal} from "@/types"



const getErrorChartData: Epic<ActionNormal, ActionNormal, StoreState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorChartData)),
    switchMap(action=>
      Api.fetchErrorChartData(action.payload).pipe(
        map(actions.doSetErrorChartData)
      )
    )
  )

  const getErrorListData: Epic<ActionNormal, ActionNormal, StoreState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorListData)),
    switchMap(action=>
      Api.fetchErrorListData(action.payload).pipe(
        map(actions.doSetErrorChartData)
      )
    )
  )


  const getErrorAllData: Epic<ActionNormal, ActionNormal, StoreState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetErrorAllData)),
    mergeMap((action)=>[
      actions.doGetErrorChartData(action.payload),
      actions.doGetErrorListData(action.payload)
    ])
    
  )

  

export default [
  getErrorListData,
  getErrorChartData,
  getErrorAllData
]

