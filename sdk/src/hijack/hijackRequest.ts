import { getFlag, setFlag, class2Type } from '../utils/util'
import { HttpDetailData } from '../types'

function xhrEventTrigger(event: string) {
  const fetchEvent = new CustomEvent(event, { detail: this })
  window.dispatchEvent(fetchEvent)
}

function fetchEventTrigger(event: string, data: any) {
  const fetchEvent = new CustomEvent(event, { detail: data })
  window.dispatchEvent(fetchEvent)
}

export function hijackXMLHttpRequest() {
  if (getFlag('xhrInjected')) {
    return
  }

  // onloadstart onprogress onabort onerror ontimeout onloadend
  const oldOpen = XMLHttpRequest.prototype.open
  const oldSend = XMLHttpRequest.prototype.send

  XMLHttpRequest.prototype.open = function() {
    this.method = arguments[0]
    this.url = arguments[1]
    this.sTime = Date.now()
    this.addEventListener('error', function() {
      this.elapsedTime = Date.now() - this.sTime
      xhrEventTrigger.call(this, 'httpError')
    })
    oldOpen.apply(this, arguments)
  }

  XMLHttpRequest.prototype.send = function() {
    const data = arguments[0]
    this.addEventListener('loadend', function() {
      if (
        class2Type(data) === '[object String]' ||
        class2Type(data) === '[object object]'
      ) {
        this['reqData'] = data
      }
      this.elapsedTime = Date.now() - this.sTime
      xhrEventTrigger.call(this, 'httpLoadEnd')
    })

    oldSend.apply(this, arguments)
  }

  XMLHttpRequest.prototype.oldOpen = oldOpen
  XMLHttpRequest.prototype.oldSend = oldSend

  setFlag('xhrInjected', true)
}

export function hijackFetch() {
  if (getFlag('fetchInjected')) {
    return
  }
  const oldFetch = window.fetch
  window.fetch = function(url: string, config: RequestInit): Promise<Response> {
    const sTime = Date.now()
    return oldFetch
      .apply(this, arguments)
      .then(function(response: Response) {
        const eTime = Date.now()
        const data: HttpDetailData = {
          elapsedTime: eTime - sTime,
          type: 'fecth',
          method: (config && config.method) || 'GET',
          url: response.url,
          status: response.status,
          statusText: response.statusText,
          time: eTime
        }
        const cloneRes = response.clone()
        if (response.status >= 400) {
          data.responseText = cloneRes.text()
        }
        if (data.responseText) {
          data.responseText instanceof Promise &&
            data.responseText.then(function(text: string) {
              data.responseText = text
              fetchEventTrigger.apply(this, ['httpLoadEnd', data])
            })
        } else {
          fetchEventTrigger.apply(this, ['httpLoadEnd', data])
        }
        return response
      })
      .catch(function(e: any) {
        const eTime = Date.now()
        const data: HttpDetailData = {
          elapsedTime: eTime - sTime,
          type: 'fetch',
          method: (config && config.method) || 'GET',
          url,
          status: 0,
          statusText: e.name + e.message,
          time: eTime
        }
        fetchEventTrigger.apply(config, ['httpError', data])
        return Promise.reject(e)
      })
  }

  setFlag('fetchInjected', true)
}
