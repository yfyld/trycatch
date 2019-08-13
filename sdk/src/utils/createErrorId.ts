import { ERROR_TYPE } from './../constant/index'
import { hashCode, getErrorTag } from './util'
import { IError } from '../types'

const allErrorNumber = {}

function getRealPath(url: string) {
  return url.replace(/\?.*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1')
}

export default function(data: IError, maxCount = { once: 3, oneDay: 10 }) {

  let id: string
  let hashId: number
  const locationUrl = getRealPath(data.url)

  if (data.type === ERROR_TYPE.HTTP_ERROR) {
    id =
      data.type +
      data.request.method +
      data.response.status +
      getRealPath(data.request.url)
  }
  else if (
    data.type === ERROR_TYPE.JAVASCRIPT_ERROR ||
    data.type === ERROR_TYPE.VUE_ERROR
  ) {
    if (data.stack && data.stack.length) {
      id =
        data.type +
        data.stack[0].line +
        data.stack[0].column +
        getRealPath(data.stack[0].url) +
        data.name +
        data.message
    } else {
    id = data.type + data.name + data.message + locationUrl
     }
  } else if (data.type === ERROR_TYPE.RESOURCE_ERROR) {
    id = data.type + data.src + data.tagName + locationUrl;
  }
  else {
    id = data.type + data.message + locationUrl
  }
  hashId = hashCode(id)

  if (allErrorNumber[hashId]) {
    allErrorNumber[hashId]++
    if (allErrorNumber[hashId] > maxCount.once) {
      return null
    }
  } else {
    allErrorNumber[hashId] = 1
  }

  const errorIdInfo = localStorage.getItem('TRYCATCH_ERROR_ID_INFO') || '{}'
  let parseData: any = {}
  const date = getErrorTag()
  parseData = JSON.parse(errorIdInfo)

  if (parseData[date]) {
    if (parseData[date][hashId]) {
      const overNum = parseData[date][hashId] - maxCount.oneDay
      if (overNum <= 0 || 1 / overNum > Math.random()) {
        parseData[date][hashId]++
      } else {
        return null
      }
    } else {
      parseData[date][hashId] = 1
    }
  } else {
    parseData = {
      [date]: {
        [hashId]: 1
      }
    }
  }

  localStorage.setItem('TRYCATCH_ERROR_ID_INFO', JSON.stringify(parseData))

  return hashId
}
