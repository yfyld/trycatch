import '../utils/customEvent';
import { getConfig, setConfig } from './config'
import { install, uninstall } from './bindEvent'
import { log } from './logError'


import ErrorTrackerInVue from './errorTrackerInVue'

const scriptDom: Element = document.querySelector('script[apikey]')

if (scriptDom) {
  const userInfo = {
    apikey: scriptDom.getAttribute('apikey'),
    version: scriptDom.getAttribute('version') || '0.0.0'
  }
}
const trackerVue = ErrorTrackerInVue.install

install()

const trycatch = {
  setConfig,
  getConfig,
  trackerVue,
  install,
  uninstall,
  log
}

export { setConfig, getConfig, trackerVue, install, uninstall, log }
export default trycatch
