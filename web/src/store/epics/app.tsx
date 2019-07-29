import * as actions from '../actions'
import { Epic } from 'redux-observable'
import {
  mergeMap,
  map,
  mapTo,
  filter,
  tap,
  delay,
  distinctUntilChanged,
  withLatestFrom,
  flatMap,
  catchError
} from 'rxjs/operators'
import { of, bindNodeCallback } from 'rxjs'
import { StoreState } from '@/store/reducers'
import { isActionOf } from 'typesafe-actions'
import * as Api from '@/api'
import { ActionAny, Action, ResponseOk, PageData, User } from '@/types'
import { push } from 'connected-react-router'
import { message } from 'antd'
import { mapLocationIntoActions } from '@/utils'
import handles from '@/store/handles'
import { AxiosResponse } from 'axios';
import instance from '@/api/http';

const triggerFetchOnLocationChange: Epic<Action, Action, StoreState> = (
  action$,
  state$
) =>
  state$.pipe(
    map(state => {
      return state.router.location;
    }),
    delay(10),
    distinctUntilChanged(),
    withLatestFrom(state$),
    flatMap(([location, state]) =>
      mapLocationIntoActions(location, handles, state)
        .filter(
          ({ isExist }) => {
            const isHome = state.router.action === 'REPLACE'; // 说明回到了首页
            return isHome ? false : (isExist ? false : true)
          } // 缓存逻辑略全为true
        )
        .map(({ action }) => action)
        .reduce((a, b) => a.concat(b), [])
    )
  )

const login: Epic<ActionAny, ActionAny, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doLoginRequest)),
    mergeMap(action =>
      bindNodeCallback(action.payload.validateFields)().pipe(
        mergeMap(params =>
          Api.fetchLogin(params).pipe(
            tap(({data: { result: { accessToken }}}: AxiosResponse<ResponseOk<{accessToken: string}>>) => {
              instance.defaults.headers.Authorization = 'Bearer ' + accessToken;
              localStorage.setItem('accessToken', accessToken);
              message.success('登录成功')
            }),
            map(actions.doLoginSuccess),
            
            mapTo(push('/project'))
          )
        ),
        catchError(error => {
          message.error(error.message || '请填写正确的账号和密码')
          return of(actions.doLoginFailure())
        })
      )
    )
  )

const logout: Epic<ActionAny, ActionAny, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doLogoutRequest)),
    mergeMap(action =>
      Api.fetchLogout().pipe(
        map(actions.doLogoutSuccess),
        tap(() => {
          
          message.success('退出成功')
        }),
        mapTo(push('/login')),

        catchError(error => {
          message.error('退出失败')
          return of(actions.doLogoutFailure())
        })
      )
    )
  )

const signup: Epic<ActionAny, ActionAny, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doSignupRequest)),
    mergeMap(action =>
      bindNodeCallback(action.payload.validateFields)().pipe(
        mergeMap(params =>
          Api.fetchSignup(params).pipe(
            map(actions.doSignupSuccess),
            tap(() => {

              message.success('注册成功')
            }),
            mapTo(push('/login'))
          )
        ),
        catchError(error => {
          message.error('请填写正确的注册信息')
          return of(actions.doSignupFailure())
        })
      )
    )
  )

const getUserInfo: Epic<ActionAny, ActionAny, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doGetUserInfoRequest)),
    mergeMap(() =>
      Api.fetchUserInfo().pipe(
        map(actions.doGetUserInfoSuccess),
        catchError(error => {
          return of(actions.doGetUserInfoFailure())
        })
      )
    )
  )


const getUserList: Epic<Action, Action, StoreState> = action$ => 
  action$.pipe(
    filter(isActionOf(actions.doGetUserListRequest)),
    mergeMap(() => Api.fetchUserList().pipe(
      map(({ data: { result: { list = [], totalCount = 0}}}: AxiosResponse<ResponseOk<PageData<User>>>) => actions.doGetUserListSuccess({list, totalCount})),
      catchError(error => of(actions.doGetUserListFailure()))
    ))
  )

export default [
  login,
  signup,
  triggerFetchOnLocationChange,
  getUserInfo,
  logout,
  getUserList
]
