import { getType } from 'typesafe-actions'

import * as actions from '../actions'

import { Action, ErrorChartData, ErrorListData } from '@/types'

export interface AppState {
  errorChartData: ErrorChartData
  errorListData: ErrorListData
}

const initialState = {
  errorChartData: {
    total: 0,
    list: []
  },
  errorListData: {
    totalPage: 0,
    list: []
  }
}

export const workReducer = (
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case getType(actions.doGetErrorAllData):
      return state

    case getType(actions.doGetErrorChartData):
      return state

    case getType(actions.doGetErrorListData):
      return state

    default:
      return state
  }
}
