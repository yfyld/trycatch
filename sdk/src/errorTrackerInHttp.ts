import { ERROR_TYPE, ERROR_LEVEL } from './constant/index'
import { getFlag, setFlag, getLocationHref } from './utils/util'
import { sendData } from './send'

class ErrorTrackerInHttp {
  static instance: null | ErrorTrackerInHttp
  ignoreHttpCodeList: number[]
  constructor() {
    this.traceHttpError = this.traceHttpError.bind(this)
    this.decideHttp = this.decideHttp.bind(this)
  }
  static getInstance() {
    if (!ErrorTrackerInHttp.instance) {
      ErrorTrackerInHttp.instance = new ErrorTrackerInHttp()
    }
    return ErrorTrackerInHttp.instance
  }
  computedErrorStackTrace(data: any, level?: number) {
    let error = {
      type: ERROR_TYPE.HTTP_ERROR,
      response: {
        status: data.status,
        statusText: data.statusText,
        description:
          data.status === 0
            ? 'XMLHttpRequest请求失败(可能原因:浏览器跨域限制、限时)'
            : data.responseText
      },
      request: {
        method: data.method,
        url: data.url,
        data: data.reqData
      },
      url: getLocationHref(),
      time: Date.now(),
      elapsedTime: data.elapsedTime,
      level: level || data.status >= 500 ? ERROR_LEVEL.HIGH : ERROR_LEVEL.LOW
    }
    return error
  }

  traceHttpError(e: any) {
    const error = this.computedErrorStackTrace(e.detail)
    // console.log(error);
    // send
    sendData(error)
  }

  decideHttp(e: any) {
    const data = e.detail;
    if (
      (data.status >= 400 || data.status === 0) &&
      this.ignoreHttpCodeList.indexOf(data.status) < 0
    ) {
      this.traceHttpError(e)
    }
  }
  install({ ignoreHttpCodeList = [] }: { ignoreHttpCodeList?: number[] } = {}) {
    this.ignoreHttpCodeList = ignoreHttpCodeList
    if (window.addEventListener && !getFlag('watchRequest')) {
      window.addEventListener('httpErrored', this.traceHttpError, false)
      window.addEventListener('httpLoadEnded', this.decideHttp, false)
      setFlag('watchRequest', true)
    }
  }
  uninstall() {
    if (window.addEventListener) {
      window.removeEventListener('httpErrored', this.traceHttpError)
      window.removeEventListener('httpLoadEnded', this.traceHttpError)
      setFlag('watchRequest', false)
    }
  }
}

export default ErrorTrackerInHttp.getInstance()
