import { getType } from 'typesafe-actions'
import update from 'immutability-helper'
import * as actions from '../actions'
import { Action,UserInfo, User, Project } from '@/types'

export interface AppState {
  loading: boolean
  userInfo: UserInfo,
  userList: User[],
  isLogin: boolean,
  projectList: Project[]
}

const initialState=():AppState => ({
  loading: false,
  userInfo: {},
  userList: [],
  isLogin: false,
  projectList: []
})

export const appReducer = (
  state: AppState = initialState(),
  action: Action
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
