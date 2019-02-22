import { getType } from 'typesafe-actions'
import update from 'immutability-helper'
import * as actions from '../actions'
import { Action,UserInfo, User } from '@/types'

export interface AppState {
  loading: boolean
  userInfo: UserInfo,
  userList: User[]
}

const initialState=():AppState => ({
  loading: false,
  userInfo: {},
  userList: []
})

export const appReducer = (
  state: AppState = initialState(),
  action: Action
): AppState => {
  switch (action.type) {
    case getType(actions.doLoginSuccess):
      return state

    case getType(actions.doLogoutSuccess):
      return update(state,  {$set: initialState()})


    case getType(actions.doGetUserInfoSuccess):
      return update(state, { userInfo: { $set: action.payload } })

    default:
      return state
  }
}
