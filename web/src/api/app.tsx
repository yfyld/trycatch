import fetch from './http'
import { from } from 'rxjs'
// 全局


export interface ILoginInfo{
  username: string;
  password: string;
  nickname: string;
}

export interface ILogupInfo{
  username: string;
  password: string;
}

export interface IUserInfo {
  username: string;
  id: string;
  nickname: string;
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
