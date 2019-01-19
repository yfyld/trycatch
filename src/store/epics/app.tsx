import * as actions from '../actions'
import { Epic } from 'redux-observable'
import {switchMap ,map,mapTo,filter,tap,delay} from 'rxjs/operators';
import { StoreState } from "@/store/reducers";
import { isActionOf } from 'typesafe-actions'
import * as Api from "@/api"
import {ActionNormal} from "@/types"
import { push } from 'react-router-redux'
import {message} from "antd"


const getProjectList: Epic<ActionNormal, ActionNormal, StoreState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.doLogin)),
    switchMap(action=>
      Api.fetchLogin(action.payload).pipe(
        map(actions.doSetUserInfo),
        tap(()=>{
          message.success('登录成功');
        }),
        delay(300)
      )
    ),
    mapTo(push('/home'))
  )


  

export default [
  getProjectList
]

