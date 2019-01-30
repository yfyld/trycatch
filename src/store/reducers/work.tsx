import { getType } from 'typesafe-actions'

import * as actions from '../actions'
import update from 'immutability-helper'
import {
  Action,
  ErrorChartData,
  ErrorListData,
  ErrorSearchParams,
  ErrorInfo,
  EventInfo,
  EventListDataItem,
  PageData
} from '@/types'

export interface WorkState {
  errorChartData: ErrorChartData
  errorListData: ErrorListData
  errorSearchParams: ErrorSearchParams
  loading: boolean
  errorListLoading: boolean
  rowSelectionKeys: number[]
  errorInfo: ErrorInfo
  eventInfo: EventInfo
  eventListData: PageData<EventListDataItem>
  eventListLoading: boolean
  eventListParams: {
    page: number
    errorId: number
  }
}

const initialState = {
  errorSearchParams: {
    page: 1,
    pageSize: 20,
    startTime: Date.now() - 30 * 24 * 3600000,
    endTime: Date.now()
  },
  loading: false,
  errorListLoading: false,

  errorChartData: {
    totalCount: 0,
    data: []
  },

  errorListData: {
    totalCount: 0,
    data: []
  },
  rowSelectionKeys: [],
  errorInfo: {},

  eventListParams: {
    page: 1,
    errorId: null
  },
  eventListLoading: false,
  eventListData: { totalCount: 0, data: [] },
  eventInfo: {}
}

export const workReducer = (
  state: WorkState = initialState,
  action: Action
): WorkState => {
  switch (action.type) {
    case getType(actions.doGetErrorListDataRequest):
      return update(state, {
        errorListLoading: { $set: true },
        errorSearchParams: { $set: action.payload }
      })

    case getType(actions.doGetErrorChartDataSuccess):
      return update(state, { errorChartData: { $set: action.payload } })

    case getType(actions.doGetErrorListDataSuccess):
      return update(state, {
        errorListData: { $set: action.payload },
        errorListLoading: { $set: false },
        rowSelectionKeys: { $set: [] }
      })

    case getType(actions.doErrorListSelectionChange):
      return update(state, { rowSelectionKeys: { $set: action.payload } })

    case getType(actions.doGetEventListDataRequest):
      return update(state, {
        eventListLoading: { $set: true },
        eventListParams: {
          page: {
            $apply: page => (action.payload.page ? action.payload.page : page)
          },
          errorId: {
            $apply: errorId =>
              action.payload.errorId ? action.payload.errorId : errorId
          }
        }
      })

    case getType(actions.doGetEventListDataSuccess):
      return update(state, {
        eventListParams: { page: { $apply: page => page + 1 } },
        eventListData: {
          data: { $push: action.payload.data },
          totalCount: { $set: action.payload.totalCount }
        },
        eventListLoading: { $set: false }
      })

    case getType(actions.doGetEventInfoSuccess):
      return update(state, { eventInfo: { $set: action.payload } })
    case getType(actions.doGetErrorInfoSuccess):
      return update(state, { errorInfo: { $set: action.payload } })
    default:
      return state
  }
}
