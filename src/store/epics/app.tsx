import * as actions from '../actions'
import { Epic } from 'redux-observable'
import {switchMap ,map,mapTo,filter,tap,delay,distinctUntilChanged,withLatestFrom,flatMap,catchError} from 'rxjs/operators';
import {of} from 'rxjs'
import { StoreState } from "@/store/reducers";
import { isActionOf } from 'typesafe-actions'
import * as Api from "@/api"
import {ActionAny,Action} from "@/types"
import { push } from 'connected-react-router'
import {message} from "antd"
import {mapLocationIntoActions} from "@/utils"
import handles from "@/store/handles"

const triggerFetchOnLocationChange: Epic<Action, Action, StoreState> = (action$,state$) =>
  state$.pipe(
    map(state=>state.router.location),
    delay(10),
    distinctUntilChanged(),
    withLatestFrom(state$),
    flatMap(([location,state])=>mapLocationIntoActions(location,handles)
    .filter(({ isExist }) => (isExist
      ? !state[isExist]
      : true // 缓存逻辑略全为true
    ))
    .map(({action})=>action)
    .reduce((a, b) => a.concat(b), []))
  )

console.log(JSON.stringify(push('/home')))
const login: Epic<ActionAny, ActionAny, StoreState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.doLoginRequest)),
    switchMap(action=>
      Api.fetchLogin(action.payload).pipe(
        map(actions.doGetUserInfoSuccess),
        map(actions.doLoginSuccess),
        tap(()=>{
          message.success('登录成功');
        }),
        delay(300)
      )
    ),
    mapTo(push('/home'))
  )

const getUserInfo: Epic<ActionAny, ActionAny, StoreState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.doGetUserInfoRequest)),
    switchMap(()=>
      Api.fetchUserInfo().pipe(
        map(actions.doGetUserInfoSuccess),
        catchError(error=>of(actions.doGetUserInfoFailure()))
      ),
    )
  )

  

export default [
  login,
  triggerFetchOnLocationChange,
  getUserInfo
]

