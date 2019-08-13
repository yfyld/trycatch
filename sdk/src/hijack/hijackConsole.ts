import { getFlag, setFlag } from '../utils/util'
import { log } from '../logError'
import { ERROR_TYPE, ERROR_LEVEL } from '../constant'

export default function() {
  if (getFlag('consoleInjected')) {
    return
  }
  const oldError = window.console.error;
  const oldWarn = window.console.warn;
  window.console.error = function() {
    const infoFromTryCatch =
      arguments[arguments.length - 1] === 'infoFromTryCatch'
    var args = Array.prototype.slice.call(arguments, 0)
    if (infoFromTryCatch) {
      args.splice(-1)
    }
    oldError.apply(null, args)
    infoFromTryCatch ||
      log({
        message: args.join(';'),
        type: ERROR_TYPE.LOG_ERROR,
        level: ERROR_LEVEL.HIGH
      })
  }

  window.console.warn = function() {
    const infoFromTryCatch =
      arguments[arguments.length - 1] === 'infoFromTryCatch'
    var args = Array.prototype.slice.call(arguments, 0)
    if (infoFromTryCatch) {
      args.splice(-1)
    }
    oldWarn.apply(null, args)
    infoFromTryCatch ||
      log({
        message: args.join(';'),
        type: ERROR_TYPE.LOG_ERROR,
        level: ERROR_LEVEL.NORMAL
      })
  }

  setFlag('consoleInjected', true)
}
