import { ERROR_TYPE } from './constant/index'
import http from './utils/http'
import createErrorId from './utils/createErrorId'
import { IError, PackageData } from './types'
import Behavior from './behavior'
import { getConfig, Config } from './config'
import { oneOf } from './utils/util'
import { trycatchInfo } from './trycatchInfo'

const behavior = Behavior.getInstance()
const allData: IError[] = []
let timer: any = null
function _generatePackageData(data: IError | IError[]) {
  const { projectId, version, guarderId } = getConfig()
  const packageData: PackageData = {
    data,
    behavior: behavior.behaviorList,
    libInfo: trycatchInfo,
    info: {
      projectId,
      version,
      guarderId
    }
  }
  return packageData
}

function _send(data: IError, config: Config) {
  if (config.asyncSend) {
    allData.push(data)
    clearTimeout(timer)
    timer = setTimeout(() => {
      _sendToServer(allData)
    }, config.delayTime)
  } else {
    _sendToServer(data)
  }
}

function _ignoreSend(data: IError, config: Config) {
  if (
    data.type === ERROR_TYPE.HTTP_ERROR &&
    config.ignoreHttpCodeList &&
    config.ignoreHttpCodeList.length
  ) {
    return oneOf(data.response.status, config.ignoreHttpCodeList)
  }
  if (typeof config.ignoreFunc === 'function') {
    return config.ignoreFunc(data)
  }
  return false
}

export function sendData(data: IError) {
  const config: Config = getConfig()
  const errorId = createErrorId(data)
  if (!errorId) {
    //限制上传数量
    return
  }
  data.errorId = `${config.projectId}_${errorId < 0 ? `0${Math.abs(errorId)}` : errorId}`;
  if (_ignoreSend(data, config)) {
    return
  }
  _send(data, config)
}

function _sendToServer(data: IError | IError[]) {
  const packageData = _generatePackageData(data)
  return http(packageData)
}
