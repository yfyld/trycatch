import { getType } from 'typesafe-actions'

import * as actions from '../actions'
import update from 'immutability-helper'
import { Action, ErrorChartData, ErrorListData,ErrorListParams,ErrorInfo ,EventInfo,EventListDataItem} from '@/types'

export interface WorkState {
  errorChartData: ErrorChartData
  errorListData: ErrorListData
  errorSearchParams:ErrorListParams
  loading:boolean,
  rowSelectionKeys:number[],
  errorInfo:ErrorInfo,
  eventInfo:EventInfo
  eventListData:EventListDataItem[]
}


const initialState = {
  errorSearchParams:{
    page:1,
    pageSize:20
  },
  loading:false,
  errorChartData: {
    total: 0,
    data: []
  },
  errorListData: {
    totalPage: 0,
    data: []
  },
  rowSelectionKeys:[],
  errorInfo:{},
  eventListData:[],
  eventInfo:{}
}

export const workReducer = (
  state: WorkState = initialState,
  action: Action
): WorkState => {
  switch (action.type) {
    case getType(actions.doGetErrorListDataRequest):
      return update(state,{loading:{$set:true},errorSearchParams:{$set:action.payload}})

    case getType(actions.doGetErrorChartDataSuccess):
      return update(state,{errorChartData:{$set:action.payload}})

    case getType(actions.doGetErrorListDataSuccess):
      return update(state,{errorListData:{$set:action.payload},loading:{$set:false},rowSelectionKeys:{$set:[]}})

    case getType(actions.doErrorListSelectionChange):
      return update(state,{rowSelectionKeys:{$set:action.payload}})

    case getType(actions.doGetEventListDataSuccess):
      return update(state,{eventListData:{$set:action.payload}})


      
    default:
      return state
  }
}
