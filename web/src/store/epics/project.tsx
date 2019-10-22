import * as actions from '../actions'
import { Epic } from 'redux-observable'
import { message } from 'antd'
import { mergeMap, map, filter, catchError, tap } from 'rxjs/operators'
import { bindNodeCallback, of } from 'rxjs'
import { StoreState } from '@/store/reducers'
import { isActionOf } from 'typesafe-actions'
import { IAction, IActionAny,  IPageData, IProjectInfo, IProject, IMember } from '@/types'
import * as Api from '@/api'
import { push } from 'connected-react-router'
import { AxiosResponse } from 'axios'
import { ISourcemapAdd,IProjectListItem } from '@/api'

const getProjectList: Epic<IAction, IAction, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doGetProjectListRequest)),
    mergeMap(({ payload: { page, pageSize, data = {}}}) =>
      Api.fetchProjectList({page, pageSize, ...data}).pipe(
        map(({ data:  { list = [], totalCount = 0 }  }: AxiosResponse<IPageData<IProjectListItem>>) =>
          actions.doGetProjectListSuccess({ list, totalCount, page, pageSize })
        ),
        catchError(error => {
          message.warning(error.message || '查询失败')
          return of(actions.doGetProjectListFailure())
        })
      )
    )
  )

const getProjectDetail: Epic<IAction, IAction, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doGetProjectDetailsRequest)),
    mergeMap(action =>
      Api.fetchProjectInfo(action.payload).pipe(
        // map(actions.doGetProjectDetailsSuccess),
        map(({ data }: AxiosResponse<IProjectInfo>) => actions.doGetProjectDetailsSuccess(data)),
        catchError(() => {
          return of(actions.doGetProjectDetailsFailure())
        })
      )
    )
  )

const getProjectMembers: Epic<IAction, IAction, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doGetProjectMembersRequest)),
    mergeMap(action =>
      Api.fetchProjectMembers(action.payload).pipe(
        map(({ data: { list = [], totalCount = 0  } }: AxiosResponse<IPageData<IMember>>) =>
          actions.doGetProjectMembersSuccess({ list, totalCount })
        ),
        catchError(() => {
          return of(actions.doGetProjectMembersFailure())
        })
      )
    )
  )

const updateProjectDetails: Epic<IAction, IAction, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doUpdateProjectDetailsRequest)),
    mergeMap(action =>
      bindNodeCallback(action.payload.validateFields)().pipe(
        mergeMap(params =>
          Api.fetchProjectUpdate(state$.value.project.projectInfo.id, params).pipe(
            tap(() => {
              message.success('保存成功')
            }),
            map(() => actions.doGetProjectDetailsRequest(state$.value.project.projectInfo.id))
          )
        ),
        catchError(error => {
          console.log(error)
          message.error(error.message || '更新失败')
          return of(actions.doUpdateProjectDetailsFailure())
        })
      )
    )
  )

const addProject: Epic<IActionAny, IActionAny, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doAddProjectRequest)),
    mergeMap(action =>
      bindNodeCallback(action.payload.validateFields)().pipe(
        mergeMap(params =>
          Api.fetchProjectAdd(params).pipe(
            tap(() => {
              message.success('提交成功')
            }),
            mergeMap(({ data }: AxiosResponse<IProject>) => {
              return [actions.doAddProjectSuccess(), push(`/project/${data.id}`)]
            })
          )
        ),
        catchError(error => {
          console.log(error)
          message.error('请填写正确的项目信息')
          return of(actions.doAddProjectFailure())
        })
      )
    )
  )

// const addProjectMemberToggle = (action$) =>
//     action$.pipe(
//       filter(isActionOf(actions.doAddProjectMemberToggle)),
//       map(() => actions.doGetUserListRequest())
//     )

const addProjectMember: Epic<IAction, IAction, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doAddProjectMemberRequest)),
    mergeMap(action =>
      bindNodeCallback(action.payload.validateFields)().pipe(
        mergeMap(params => {
          console.log(params)
          return Api.fetchProjectMemberAdd(state$.value.project.projectId, params).pipe(
            tap(() => {
              message.success('添加成功')
            }),
            mergeMap(response => [
              actions.doAddProjectMemberSuccess(),
              actions.doAddProjectMemberToggle(false),
              // actions.doGetProjectMembersRequest(state$.value.project.projectId)
              actions.doGetProjectDetailsRequest(state$.value.project.projectId)
            ])
          )
        }),
        catchError(error => {
          message.error('添加项目失败')
          return of(actions.doAddProjectMemberFailure())
        })
      )
    )
  )

const deleteProjectMember: Epic<IAction, IAction, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doDeleteProjectMemberRequest)),
    mergeMap(action =>
      Api.fetchProjectMemberDelete(action.payload).pipe(
        tap(() => {
          message.success('删除成功')
        }),
        mergeMap(() => [
          actions.doDeleteProjectMemberSuccess(),
          // actions.doGetProjectMembersRequest(state$.value.project.projectId)
          actions.doGetProjectDetailsRequest(state$.value.project.projectId)
        ])
      )
    ),
    catchError(error => of(actions.doDeleteProjectMemberFailure()))
  )

const updateProjectMember: Epic<IAction, IAction, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doUpdateProjectMemberRequest)),
    mergeMap(action =>
      Api.fetchProjectMemberUpdate(action.payload).pipe(
        tap(() => {
          message.success('修改成功')
        }),
        mergeMap(() => [
          actions.doUpdateProjectMemberSuccess(),
          // actions.doGetProjectMembersRequest(state$.value.project.projectId)
          actions.doGetProjectDetailsRequest(state$.value.project.projectId)
        ])
      )
    ),
    catchError(error => of(actions.doUpdateProjectMemberFailure()))
  )


const getProjectSourcemapList: Epic<IAction, IAction, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doGetSourcemapListRequest)),
    mergeMap(action =>
      Api.fetchSourcemapList(action.payload).pipe(
        map(({data}) =>
          actions.doGetSourcemapListSuccess(data)
        ),
        catchError(() => {
          return of(actions.doGetSourcemapListFailure())
        })
      )
    )
  )

const addSourcemap: Epic<IAction, IAction, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doAddSourcemapRequest)),
    mergeMap(action =>
      bindNodeCallback<ISourcemapAdd>(action.payload.validateFields)().pipe(
        mergeMap(params => {
          const data: any = {
            hash: params.hash,
            version: params.version,
            projectId: state$.value.project.projectId
          };
          data.files = ((params.files) as any).fileList.map(item => ({url: item.response.result.url, fileName: item.response.result.filename}));
          return Api.fetchSourcemapAdd({...data}).pipe(
            tap(() => {
              message.success('添加成功')
            }),
            mergeMap(response => [
              actions.doAddSourcemapSuccess(),
              actions.doAddProjectSourcemapToggle(false),
              actions.doGetProjectDetailsRequest(state$.value.project.projectId)
            ])
          )
        }
          
        ),
        catchError(error => {
          message.error('添加失败')
          return of(actions.doAddSourcemapFailure())
        })
      )
    )
  )

const operateSourcemap: Epic<IAction, IAction, StoreState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.doOperateSourcemapRequest)),
    mergeMap(action =>
      Api.fetchSourcemapOperate(action.payload).pipe(
        tap(() => {
          message.success('添加成功')
        }),
        mergeMap(response => [
          actions.doOperateSourcemapSuccess(),
          actions.doGetProjectDetailsRequest(state$.value.project.projectId)
        ])
      )
    ),
    catchError(error => {
      message.error('添加失败')
      return of(actions.doOperateSourcemapFailure())
    })
  )

const deleteProject: Epic<IAction, IAction, StoreState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.doDeleteProjectRequest)),
    mergeMap(action =>
      Api.fetchProjectDel(action.payload).pipe(
        tap(() => message.success('删除成功')),
        mergeMap(() => [actions.doDeleteProjectSuccess(), actions.doGetProjectListRequest({page: 1, pageSize: 20})])
      )
    ),
    catchError(error => {
      message.error(error.message || '删除失败')
      return of(actions.doDeleteProjectFailure())
    })
  )
export default [
  getProjectList,
  updateProjectDetails,
  getProjectDetail,
  addProject,
  getProjectMembers,
  getProjectSourcemapList,
  // addProjectMemberToggle,
  addProjectMember,
  deleteProjectMember,
  updateProjectMember,
  deleteProject,
  addSourcemap,
  operateSourcemap
]
