import { getType } from 'typesafe-actions'
import update from 'immutability-helper'
import * as actions from '../actions'
import { IAction,IUser, IProject } from '@/types'
import { IUserInfo } from "@/api"

export interface AppState {
  loading: boolean
  userInfo: IUserInfo,
  userList: IUser[],
  isLogin: boolean,
  projectList: IProject[]
}

const initialState=():AppState => ({
  loading: false,
  userInfo: {
    nickname:'',
    id:null,
    username:''
  },
  userList: [],
  isLogin: false,
  projectList: []
})

export const appReducer = (
  state: AppState = initialState(),
  action: IAction
): AppState => {
  switch (action.type) {
    case getType(actions.doLoginSuccess):
      return state;

    case getType(actions.doLogoutSuccess):
      return update(state,  {$set: initialState()})


    case getType(actions.doGetUserInfoSuccess):
      return update(state, { 
        userInfo: { $set: action.payload },
        isLogin: { $set: true } 

      })
    case getType(actions.doGetUserListSuccess): 
      return update(state, {
        userList: { $set: action.payload.list }
      })
    case getType(actions.doGetProjectAllListSuccess):
      return update(state, {
        projectList: { $set: action.payload.list }
      })
    default:
      return state
  }
}
