import fetch from './http'
import { from } from 'rxjs'
import { IUserInfo } from './app'
import { IStack, ISource } from './error'
import { IPageData } from '@/types'


export interface IMember {
  // username?: string
  // nickName?: string
  // id: number
  // mobile?: string
  // isAdmin?:boolean
  // isOwner?:boolean
  id: number
  username?: string
  nickname: string
  mobile?: string
  roleCode: string
}

export interface IUser {
  username?: string
  id: number
  nickname: string
}

export interface IRole {
  id: number
  name: string
  global: number
  code: string
  status: number
}

export interface IProjectListItem {
  name: string
  id: number
  description: string
  image: string
  creator: IUserInfo
}

export interface IProject {
  id: number
  name: string
}

export interface IProjectInfo {
  name: string
  id: number
  image: string
  members: IMember[]
  guarderId: number
  description: string
  guarder: IUserInfo
  language: string
  version: string
  alarmType: string
  alarmHookUrl: string
  sourcemapOnline:boolean
  creator: IUserInfo
}

export interface IProjectDetail {
  activeKey: string
  tabs: string[]
}




export interface IProjectMemberOperate {
  projectId: number
  memberIds: number[]
}



export interface IProjectMemberUpdate {
  projectId: number
  memberIds: number[]
  roleCode: string
}

export interface ISourcemapOperate {
  projectId: number
  sourcemapIds: number[]
  actionType: string
  version?: string
  hash?: boolean
}

export interface ISourcemapAdd {
  projectId: number
  files: Array<{ url: string; fileName: string }>
  version: string
  hash: boolean
}


export interface ISourcemapParseParam{
  projectId:number;
  stack:IStack;
  version?:string;
}

export interface ISourcemapListItem {
  fileName: string
  url: string
  id: number
  hash: boolean
  version: string
}

export type ISourcemapList = IPageData<ISourcemapListItem>


export interface ISourcemapListParam{
  projectId:number;
  name?:string
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

export function fetchProjectMemberUpdate(data: IProjectMemberUpdate) {
  return from(fetch.post(`/project/update-members`, data))
}

export function fetchProjectMemberDelete(data: IProjectMemberOperate) {
  return from(fetch.post(`/project/delete-members`, data))
}

export function fetchSourcemapOperate(data: ISourcemapOperate) {
  return from(fetch.post(`/project/sourcemap/action`, data))
}

export function fetchSourcemapAdd(data: ISourcemapAdd) {
  return from(fetch.post(`/project/sourcemap`, data))
}

export function fetchSourcemapParse(data: ISourcemapParseParam) {
  return from(fetch.post<ISource>(`/project/parse-sourcemap`, data))
}


export function fetchSourcemapList(data: ISourcemapListParam) {
  return from(fetch.get<ISourcemapList>(`/project/sourcemap`, data))
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
