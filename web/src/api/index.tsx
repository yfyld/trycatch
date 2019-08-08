import fetch from './http';
import { from } from 'rxjs';
import {ErrorChangeParams, ProjectMemberOperate} from "@/types"
// 全局

export function fetchProjectAllList() {
  return from(fetch.get('/project/all'));
}

export function fetchUserInfo(params?: object) {
  return from(fetch.get('/user/info', params))
}
export function fetchLogin(params?: object) {
  return from(fetch.post('/user/signin', params))
}
export function fetchSignup(params?: object) {
  return from(fetch.post('/user/signup', params))
}

export function fetchLogout() {
  return from(fetch.post('/user/logout'))
}
export function fetchUserList(params?: object) {
  return from(fetch.get('/user', params))
}

// 项目
export function fetchProjectList(params?: object) {
  return from(fetch.get('/project', params))
}

export function fetchProjectMembers(projectId: number) {
  return from(fetch.get(`/project/${projectId}/members`))
}

export function fetchProjectMemberAdd(projectId, params?:object) {
  return from(fetch.post(`/project/${projectId}/addMember`, params))
}

export function fetchProjectMemberDelete(data: ProjectMemberOperate) {
  return from(fetch.delete(`/project/delete-member`, { params: data }))
}

export function fetchProjectInfo(projectId:number,params?: object) {
  return from(fetch.get(`/project/${projectId}`, params))
}

export function fetchProjectUpdate(projectId:number,params?: object) {
  return from(fetch.put(`/project/${projectId}`, params))
}

export function fetchProjectDel(projectId) {
  return from(fetch.delete(`/project/${projectId}`))
}

export function fetchProjectAdd(params?: object) {
  return from(fetch.post(`/project`, params))
}

// 错误
export function fetchErrorChartData(params?: object) {
  return from(fetch.get(`/stat/error`, params))
}

export function fetchErrorListData(params?: object) {
  return from(fetch.get(`/error`, params))
}

export function fetchErrorStatusUpdate(errorId:number,params?: object) {
  return from(fetch.post(`/error/${errorId}`, params))
}

export function fetchErrorInfo(errorId: number) {
  return from(fetch.get(`/error/${errorId}`))
}


export function fetchErrorChange(data: ErrorChangeParams) {
  return from(fetch.put(`/error`, data))
}


export function fetchEventList(params:any) {
  return from(fetch.get(`/error/log`,params))
}

export function fetchEventInfo(params) {
  return from(fetch.get(`/error/log-info`, params))
}

// export function fetchEventChart(params) {
  
// }