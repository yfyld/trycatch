import * as ACTIONTYPE from '@/constants/actionType'
import { createAction } from 'typesafe-actions'
import { ProjectListItem, ProjectInfo, PageData, ProjectMemberOperate, Member, PageDataQuery } from '@/types'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { ProjectMemberUpdate, SourcemapOperate } from '@/api'

export const doGetProjectListRequest = createAction(ACTIONTYPE.GET_PROJECT_LIST_REQUEST, resolve => (data: PageDataQuery<any>) => resolve(data))

export const doGetProjectListSuccess = createAction(
  ACTIONTYPE.GET_PROJECT_LIST_SUCCESS,
  resolve => (data: PageData<ProjectListItem>) => resolve(data)
)
export const doGetProjectListFailure = createAction(ACTIONTYPE.GET_PROJECT_LIST_FAILURE)

export const doGetProjectDetailsRequest = createAction(ACTIONTYPE.GET_PROJECT_DETAILS_REQUEST, resolve => (projectId: number) =>
  resolve(projectId)
)
export const doGetProjectDetailsSuccess = createAction(ACTIONTYPE.GET_PROJECT_DETAILS_SUCCESS, resolve => (data: ProjectInfo) =>
  resolve(data)
)
export const doGetProjectDetailsFailure = createAction(ACTIONTYPE.GET_PROJECT_DETAILS_FAILURE)

export const doUpdateProjectDetailsRequest = createAction(
  ACTIONTYPE.UPDATE_PROJECT_DETAILS_REQUEST,
  resolve => (form: WrappedFormUtils) => resolve(form)
)
export const doUpdateProjectDetailsSuccess = createAction(ACTIONTYPE.UPDATE_PROJECT_DETAILS_SUCCESS)
export const doUpdateProjectDetailsFailure = createAction(ACTIONTYPE.UPDATE_PROJECT_DETAILS_FAILUER)

export const doAddProjectToggle = createAction(ACTIONTYPE.ADD_PROJECT_TOGGLE, resolve => (toggle: boolean) => resolve(toggle))
export const doAddProjectRequest = createAction(ACTIONTYPE.ADD_PROJECT_REQUEST, resolve => (form: WrappedFormUtils) =>
  resolve(form)
)
export const doAddProjectSuccess = createAction(ACTIONTYPE.ADD_PROJECT_SUCCESS)
export const doAddProjectFailure = createAction(ACTIONTYPE.ADD_PROJECT_FAILURE)

export const doGetProjectMembersRequest = createAction(ACTIONTYPE.GET_PROJECT_MEMBERS_REQUEST, resolve => (projectId: number) =>
  resolve(projectId)
)
export const doGetProjectMembersSuccess = createAction(
  ACTIONTYPE.GET_PROJECT_MEMBERS_SUCCESS,
  resolve => (data: PageData<Member>) => resolve(data)
)
export const doGetProjectMembersFailure = createAction(ACTIONTYPE.GET_PROJECT_MEMBERS_FAILURE)

export const doAddProjectMemberToggle = createAction(ACTIONTYPE.ADD_PROJECT_MEMBER_TOGGLE, resolve => (toggle: boolean) =>
  resolve(toggle)
)
export const doAddProjectMemberRequest = createAction(
  ACTIONTYPE.ADD_PROJECT_MEMBER_REQUEST,
  resolve => (form: WrappedFormUtils) => resolve(form)
)
export const doAddProjectMemberSuccess = createAction(ACTIONTYPE.ADD_PROJECT_MEMBER_SUCCESS)
export const doAddProjectMemberFailure = createAction(ACTIONTYPE.ADD_PROJECT_MEMBER_FAILURE)

export const doSelectProjectMember = createAction(ACTIONTYPE.SELECT_PROJECT_MEMBER, resolve => (selectedKeys: number[]) =>
  resolve(selectedKeys)
)
export const doDeleteProjectMemberRequest = createAction(
  ACTIONTYPE.DELETE_PROJECT_MEMBER_REQUEST,
  resolve => (data: ProjectMemberOperate) => resolve(data)
)
export const doDeleteProjectMemberSuccess = createAction(ACTIONTYPE.DELETE_PROJECT_MEMBER_SUCCESS)
export const doDeleteProjectMemberFailure = createAction(ACTIONTYPE.DELETE_PROJECT_MEMBER_FAILURE)

export const doUpdateProjectMemberRequest = createAction(
  ACTIONTYPE.UPDATE_PROJECT_MEMBER_REQUEST,
  resolve => (data: ProjectMemberUpdate) => resolve(data)
)
export const doUpdateProjectMemberSuccess = createAction(ACTIONTYPE.UPDATE_PROJECT_MEMBER_SUCCESS)
export const doUpdateProjectMemberFailure = createAction(ACTIONTYPE.UPDATE_PROJECT_MEMBER_FAILURE)

export const doDeleteProjectRequest = createAction(ACTIONTYPE.DELETE_PROJECT_REQUEST, resolve => (projectId: number) =>
  resolve(projectId)
)
export const doDeleteProjectSuccess = createAction(ACTIONTYPE.DELETE_PROJECT_SUCCESS)
export const doDeleteProjectFailure = createAction(ACTIONTYPE.DELETE_PROJECT_FAILURE)

export const doAddSourcemapRequest = createAction(
  ACTIONTYPE.ADD_SOURCEMAP_REQUEST,
  resolve => (form: WrappedFormUtils) => resolve(form)
)
export const doAddSourcemapSuccess = createAction(ACTIONTYPE.ADD_SOURCEMAP_SUCCESS)
export const doAddSourcemapFailure = createAction(ACTIONTYPE.ADD_SOURCEMAP_FAILURE)

export const doOperateSourcemapRequest = createAction(ACTIONTYPE.OPERATE_SOURCEMAP_REQUEST, resolve => (data: SourcemapOperate) =>
  resolve(data)
)
export const doOperateSourcemapSuccess = createAction(ACTIONTYPE.OPERATE_SOURCEMAP_SUCCESS)
export const doOperateSourcemapFailure = createAction(ACTIONTYPE.OPERATE_SOURCEMAP_FAILURE)

// export const doFileUploadRequest = createAction(ACTIONTYPE.)

export const doAddProjectSourcemapToggle = createAction(ACTIONTYPE.ADD_PROJECT_SOURCEMAP_TOGGLE, resolve => (toggle: boolean) => resolve(toggle))