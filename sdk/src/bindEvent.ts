import hijackHistoryEvent from './hijack/hijackHistoryEvent'
import { getConfig, setConfig, SetConfig } from './config'
import { hijackXMLHttpRequest, hijackFetch } from './hijack/hijackRequest'
import Behavior from './behavior'
import errorTrackerInGlobal from './errorTrackerInGlobal'
import errorTrackerInHttp from './errorTrackerInHttp'
import errorTrackerInPromise from './errorTrackerInPromise'
import hijackConsole from './hijack/hijackConsole'
import errorTrackerInVue from './errorTrackerInVue'

const install = function(conf?: SetConfig) {
  if (conf) {
    setConfig(conf)
  }
  const config = getConfig()

  hijackHistoryEvent()
  hijackXMLHttpRequest()
  hijackFetch()
  hijackConsole()

  Behavior.getInstance(config).install()
  errorTrackerInGlobal.install()
  errorTrackerInHttp.install(config)
  errorTrackerInPromise.install()
  errorTrackerInHttp.install()

  if ((window as any).Vue) {
    errorTrackerInVue.install((window as any).Vue)
  }
}

const uninstall = function() {
  if ((window as any).Vue) {
    errorTrackerInVue.uninstall((window as any).Vue)
  }
  Behavior.getInstance().uninstall()
  errorTrackerInHttp.uninstall()
}

export { install, uninstall }
