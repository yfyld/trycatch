import fetch from './http'
import { from } from 'rxjs'
// 全局

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
