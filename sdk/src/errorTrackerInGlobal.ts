import {
  UNKNOWN,
  UNKNOWN_FUNCTION,
  ERROR_TYPES_RE,
  ERROR_LEVEL
} from './constant/index'
import { ERROR_TYPE } from './constant'
import { isError, getLocationHref, isString } from './utils/util'
import computedStackTrace from './utils/computedStackTrace'
import { sendData } from './send'
import { log } from './logError'

class ErrorTrackerInGlobal {
  static instance: null | ErrorTrackerInGlobal
  oldErrorHandler: OnErrorEventHandlerNonNull
  constructor() {
    this.oldErrorHandler = null
  }

  static getInstance() {
    if (!ErrorTrackerInGlobal.instance) {
      ErrorTrackerInGlobal.instance = new ErrorTrackerInGlobal()
    }
    return ErrorTrackerInGlobal.instance
  }
  install() {
    const self = this
    this.oldErrorHandler = window.onerror
    window.onerror = function (
      message: string,
      url?: string,
      lineNo?: number,
      columnNo?: number,
      e?: any
    ) {
      console.log(e)
      self.traceGlobalError(message, url, lineNo, columnNo, e)
    }
  }
  traceGlobalError(
    message: string,
    url?: string,
    lineNo?: number,
    columnNo?: number,
    e?: any
  ) {
    const error = this.computedErrorMsg(message, url, lineNo, columnNo, e)
    // send
    console.log(error)
    sendData(error)
  }
  computedErrorMsg(
    message: string,
    url?: string,
    lineNo?: number,
    columnNo?: number,
    e?: any
  ) {
    let error: any
    if (e && isError(e)) {
      error = computedStackTrace(e)
    }
    error.type = ERROR_TYPE.JAVASCRIPT_ERROR
    return error
  }
  computedStackTraceWithoutError(
    message: string,
    url: string = getLocationHref(),
    lineNo?: number,
    columnNo?: number
  ) {
    let msg = message
    let name = UNKNOWN
    if (isString(message)) {
      const matches = message.match(ERROR_TYPES_RE)
      if (matches[1]) {
        name = matches[1]
        msg = matches[2]
      }
    }
    const element = {
      url,
      func: UNKNOWN_FUNCTION,
      args: UNKNOWN,
      line: lineNo,
      col: columnNo
    }
    const error = {
      url,
      name,
      message: msg,
      level: ERROR_LEVEL.NORMAL,
      stack: [element]
    }
    return error
  }

  log() {
    return log.apply(this, arguments)
  }
}

export default ErrorTrackerInGlobal.getInstance()
