import { getFlag, setFlag, class2Type } from '../utils/util'
import { HttpDetailData } from '../types';


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

  XMLHttpRequest.prototype.open = function () {
    this.method = arguments[0]
    this.url = arguments[1]
    this.sTime = Date.now()
    this.addEventListener('error', function () {
      // 例接口不存在
      this.elapsedTime = Date.now() - this.sTime
      xhrEventTrigger.call(this, 'httpErrored')
    })
    oldOpen.apply(this, arguments)
  }

  XMLHttpRequest.prototype.send = function () {
    const data = arguments[0]
    this.addEventListener('loadend', function () {
      if (
        class2Type(data) === '[object String]' ||
        class2Type(data) === '[object object]'
      ) {
        this['reqData'] = data
      }
      this.elapsedTime = Date.now() - this.sTime
      xhrEventTrigger.call(this, 'httpLoadEnded')
    })

    // this.addEventListener('readystatechange', function() {
    //   if (this.readyState === 4) {
    //     if (!(this.status >= 200 && this.status < 300 || this.status === 304 || this.status === 302)) {
    //       xhrEventTrigger.call(this, 'httpErrored');
    //     }
    //   }
    // })
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
  window.fetch = function (url: string, config: RequestInit): Promise<Response> {
    const sTime = Date.now()
    return oldFetch
      .apply(this, arguments)
      .then(function (response: Response) {

        const eTime = Date.now()
        const data: HttpDetailData = {
          elapsedTime: eTime - sTime,
          type: 'fecth',
          method: (config && config.method) || 'GET',
          url: response.url,
          status: response.status,
          statusText: response.statusText,
          time: eTime,
          reqData: config && config.body
        }
        const cloneRes = response.clone()
        if (response.status >= 400) {
          data.responseText = cloneRes.text()
        }
        if (data.responseText) {
          data.responseText instanceof Promise &&
            data.responseText.then(function (text: string) {
              data.responseText = text
              fetchEventTrigger.apply(this, ['httpLoadEnded', data])
            })
        } else {
          fetchEventTrigger.apply(this, ['httpLoadEnded', data])
        }
        return response
      })
      .catch(function (e: any) {
        console.log(e);
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
        fetchEventTrigger.apply(config, ['httpErrored', data])
        return Promise.reject(e)
      })
  }

  setFlag('fetchInjected', true)
}
