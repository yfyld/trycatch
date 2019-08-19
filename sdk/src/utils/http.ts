import { getConfig } from './../config'
import Base64 from './base64'

const config = getConfig()

export default function(data: object, isAjax: boolean = false, isSendBeacon: boolean = true) {
  return new Promise(resolve => {
    console.log(JSON.stringify(data, null, 2))
    const dataStr = JSON.stringify(data) //Base64.encode(JSON.stringify(data))
    const url = `${config.url}?time=${Date.now()}`
    if (isSendBeacon && typeof window.navigator.sendBeacon === 'function' && typeof Blob === 'function') {
      const headers = {
        type: 'text/plain; charset=UTF-8'
      }
      const blob = new Blob([dataStr], headers)
      const success = window.navigator.sendBeacon(url, blob)
      if (success) {
        resolve()
        return
      }
    }
    if (isAjax || dataStr.length > 8000) {
      const xhr = new XMLHttpRequest()
      xhr.oldOpen('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')
      xhr.withCredentials = true
      xhr.oldSend(dataStr)
      xhr.addEventListener('readystatechange', function() {
        if (this.readyState === 4) {
          resolve()
        }
      })
    } else {
      const img: HTMLImageElement = new Image()
      img.onload = function() {
        resolve()
      }
      img.src = `${url}&data=${dataStr}`
    }
  })
}
