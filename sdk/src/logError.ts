import { ErrorLog } from './types/index'
import { getLocationHref } from './utils/util'
import { sendData } from './send'

export function log(data: ErrorLog) {
  const error = {
    type: data.type,
    message: data.message,
    level: data.level,
    url: getLocationHref(),
    time: Date.now()
  }
  sendData(error)
}
