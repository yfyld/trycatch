import { getType } from 'typesafe-actions'
import * as actions from '../actions'
import { IProjectInfo, IAction, IProjectDetail, IMember, ISourcemapList, IPage } from '@/types'
import update from 'immutability-helper'
import {IProjectListItem} from '@/api'

export interface ProjectState {
  projectList: IProjectListItem[]
  projectInfo: IProjectInfo
  projectMembers: IMember[]
  projectId: number
  projectAddVisible: boolean
  projectDetail: IProjectDetail
  projectMemberAddVisible: boolean
  projectMemberSelectedKeys: number[]
  fileList: any[],
  projectSourcemapAddVisible: boolean,
  projectSourcemapList: ISourcemapList,
  projectPage: IPage
}

const initialState = {
  projectList: [],
  projectPage: {
    page: 1, pageSize: 10, totalCount: 0
  },
  projectInfo: {
    name:'',
    id: null,
    image: '',
    members: [],
    guarderId: null,
    description: '',
    guarder: {
      nickname:'',
      id:null,
      username:''
    },
    language: '',
    version: '',
    alarmType: '',
    alarmHookUrl: '',
    sourcemapOnline:false,
    creator: {
      nickname:'',
      id:null,
      username:''
    }
  },
  projectMembers: [],
  projectId: null,
  projectAddVisible: false,
  projectDetail: {
    activeKey: '1',
    tabs: ['1']
  },
  projectMemberAddVisible: false,
  projectMemberSelectedKeys: [],
  fileList: [],
  projectSourcemapAddVisible: false,
  projectSourcemapList: {list:[],totalCount:0}
}

export const projectReducer = (state: ProjectState = initialState, action: IAction): ProjectState => {
  switch (action.type) {
    case getType(actions.doGetProjectListSuccess):
      return update(state, { 
        projectList: { $set: action.payload.list },
        projectPage: { 
          page: { $set: action.payload.page },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount }
        }
      })

    case getType(actions.doGetProjectDetailsSuccess):
      return update(state, {
        projectInfo: { $set: action.payload },
        projectId: { $set: action.payload.id },
        projectMembers: { $set: action.payload.members },
        projectDetail: {
          activeKey: { $set: '1' },
          tabs: { $set: ['1'] }
        }
      })

    case getType(actions.doAddProjectToggle):
      return update(state, { projectAddVisible: { $set: action.payload } })

    case getType(actions.doAddProjectSuccess):
      return update(state, { projectAddVisible: { $set: false } })

    case getType(actions.doGetProjectMembersSuccess):
      const index = state.projectDetail.tabs.indexOf('3')
      return update(state, {
        projectMembers: { $set: action.payload.list },

        projectDetail: {
          tabs: { $apply: tabs => (index === -1 ? tabs.concat('3') : tabs) },
          activeKey: { $set: '3' }
        },
        projectMemberSelectedKeys: { $set: [] }
      })

    case getType(actions.doGetProjectMembersRequest):
      return update(state, { projectId: { $set: action.payload } })
    case getType(actions.doAddProjectMemberToggle):
      return update(state, {
        projectMemberAddVisible: { $set: action.payload }
      })
    case getType(actions.doSelectProjectMember):
      return update(state, {
        projectMemberSelectedKeys: { $set: action.payload }
      })
    case getType(actions.doAddProjectSourcemapToggle):
      return update(state, { 
        projectSourcemapAddVisible: { $set: action.payload }
      })
    case getType(actions.doGetSourcemapListSuccess):
      return update(state, { 
        projectSourcemapList: { $set: action.payload }
      })
    default:
      return state
  }
}
