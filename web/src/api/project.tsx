import fetch from './http'
import { from } from 'rxjs'
import { ProjectMemberOperate } from '@/types'

export interface ProjectMemberUpdate {
  projectId: number
  memberIds: number[]
  roleCode: string
}

export interface SourcemapOperate {
  projectId: number
  sourcemapIds: number[]
  actionType: string
  version?: string
  hash?: boolean
}

export interface SourcemapAdd {
  projectId: number
  files: Array<{ url: string; fileName: string }>
  version: string
  hash: boolean
}

// 全局

export function fetchProjectAllList() {
  console.log('project')
  return from(fetch.get('/project/all'))
}

// 项目
export function fetchProjectList(params?: object) {
  return from(fetch.get('/project', params))
}

export function fetchProjectMembers(projectId: number) {
  return from(fetch.get(`/project/${projectId}/members`))
}

export function fetchProjectMemberAdd(projectId, params?: object) {
  return from(
    fetch.post(`/project/add-members`, {
      ...params,
      projectId,
      roleCode: 'DEVELOPER'
    })
  )
}

export function fetchProjectMemberUpdate(data: ProjectMemberUpdate) {
  return from(fetch.post(`/project/update-members`, data))
}

export function fetchProjectMemberDelete(data: ProjectMemberOperate) {
  return from(fetch.post(`/project/delete-members`, data))
}

export function fetchSourcemapOperate(data: SourcemapOperate) {
  return from(fetch.post(`/project/sourcemap/action`, data))
}

export function fetchSourcemapAdd(data: SourcemapAdd) {
  return from(fetch.post(`/project/sourcemap`, data))
}

export function fetchProjectInfo(projectId: number) {
  return from(fetch.get(`/project/info`, { projectId }))
}

export function fetchProjectUpdate(projectId: number, params?: object) {
  return from(fetch.put(`/project/${projectId}`, params))
}

export function fetchProjectDel(projectId) {
  return from(fetch.delete(`/project/${projectId}`))
}

export function fetchProjectAdd(params?: object) {
  return from(fetch.post(`/project`, params))
}
