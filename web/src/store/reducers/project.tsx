import { getType } from 'typesafe-actions'
import * as actions from '../actions'
import { ProjectListItem, ProjectInfo, Action, ProjectDetail, Member, ProjectSourcemapListItem } from '@/types'
import update from 'immutability-helper'

export interface ProjectState {
  projectList: ProjectListItem[]
  projectInfo: ProjectInfo
  projectMembers: Member[]
  projectId: number
  projectAddVisible: boolean
  projectDetail: ProjectDetail
  projectMemberAddVisible: boolean
  projectMemberSelectedKeys: number[]
  fileList: any[],
  projectSourcemapAddVisible: boolean,
  projectSourcemapList: ProjectSourcemapListItem[]
}

const initialState = {
  projectList: [],
  projectInfo: {},
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
  projectSourcemapList: []
}

export const projectReducer = (state: ProjectState = initialState, action: Action): ProjectState => {
  switch (action.type) {
    case getType(actions.doGetProjectListSuccess):
      return update(state, { projectList: { $set: action.payload.list } })

    case getType(actions.doGetProjectDetailsSuccess):
      return update(state, {
        projectInfo: { $set: action.payload },
        projectId: { $set: action.payload.id },
        projectMembers: { $set: action.payload.members },
        projectDetail: {
          activeKey: { $set: '1' },
          tabs: { $set: ['1'] }
        },
        projectSourcemapList: { $set: action.payload.sourcemap }
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
    default:
      return state
  }
}
