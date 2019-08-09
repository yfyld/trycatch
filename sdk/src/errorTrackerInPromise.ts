import { ERROR_TYPE } from './constant/index'
import { getFlag, setFlag } from './utils/util'
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
    if (getFlag('promiseInjected')) {
      return
    }
    setFlag('promiseInjected', true)
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
      url: (e.document && e.document.URL) || location.href
    }
    sendData(error)
  }
}

export default ErrorTrackerInPromise.getInstance()
