import { ERROR_TYPE, ERROR_LEVEL } from './constant/index'
import { getFlag, setFlag, getLocationHref } from './utils/util'
import { sendData } from './send'

class ErrorTrackerInPromise {
  static instance: null | ErrorTrackerInPromise
  static getInstance() {
    if (!ErrorTrackerInPromise.instance) {
      ErrorTrackerInPromise.instance = new ErrorTrackerInPromise()
    }
    return ErrorTrackerInPromise.instance
  }

  install() {
    if (getFlag('watchPromise')) {
      return
    }
    setFlag('watchPromise', true)
    if (window.addEventListener) {
      window.addEventListener('unhandledrejection', this.tracePromiseError)
    }
  }
  uninstall() {
    window.removeEventListener('unhandledrejection', this.tracePromiseError)
  }

  tracePromiseError(e: any) {
    const error = {
      type: ERROR_TYPE.PROMISE_ERROR,
      message: JSON.stringify(e.reason),
      url: getLocationHref(),
      level: ERROR_LEVEL.NORMAL,
      time: Date.now()
    }
    sendData(error)
  }
}

export default ErrorTrackerInPromise.getInstance()
