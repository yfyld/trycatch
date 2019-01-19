import * as actions from '../actions'
import { Epic } from 'redux-observable'

import {switchMap ,map,filter, delay,distinctUntilChanged,withLatestFrom,flatMap} from 'rxjs/operators'
import { StoreState } from "@/store/reducers";
import {  isActionOf } from 'typesafe-actions'
import {Action} from "@/types"
import * as Api from "@/api"

import {mapLocationIntoActions} from '@/utils'

import hanlders from "@/store/handles"




const getProjectList: Epic<Action, Action, StoreState> = (action$,state$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetProjectList)),
    switchMap(action=>
      Api.fetchProjectList().pipe(
        map(actions.doSetProjectList)
      )
    )
  )

const triggerFetchOnLocationChange: Epic<Action, Action, StoreState> = (action$,state$) =>
  state$.pipe(
    map(state=>state.router.location),
    delay(10),
    distinctUntilChanged(),
    withLatestFrom(state$),
    flatMap(([location,state])=>mapLocationIntoActions(location,hanlders)
    .filter(({ isExist }) => (isExist
      ? !state[isExist]
      : true // 缓存逻辑略全为true
    ))
    .map(({action})=>action)
    .reduce((a, b) => a.concat(b), []))
  )

export default [
  getProjectList,
  triggerFetchOnLocationChange
]

