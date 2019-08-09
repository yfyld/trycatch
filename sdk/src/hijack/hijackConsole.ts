import { getFlag, setFlag } from '../utils/util'
import { log } from '../logError'
import { ERROR_TYPE } from '../constant'

export default function() {
  if (getFlag('consoleInjected')) {
    return
  }
  const oldError = window.console.error
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
        info: args.join(';'),
        type: ERROR_TYPE.LOG_ERROR
      })
  }

  setFlag('consoleInjected', true)
}
