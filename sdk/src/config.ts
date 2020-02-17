import Base64 from './utils/base64'

enum Env {
  PRO = 'PRODUCTION',
  DEV = 'DEVMENT'
}

export interface Config {
  env: Env
  projectId: number
  version: string
  hijackConsole: boolean
  behavior: number
  url: string
  asyncSend: boolean
  delayTime: number
  ignoreHttpCodeList: number[]
  excludeUrlList: string[]
  ignoreFunc: Function
  maxErrorCount: { once: number; oneDay: number },
  guarderId: number
}

export interface SetConfig {
  env?: Env
  projectId?: number
  apikey?: string
  version?: string
  hijackConsole?: boolean
  behavior?: number
  url?: string
  asyncSend?: boolean
  delayTime?: number
  ignoreHttpCodeList?: number[]
  excludeUrlList?: string[]
  ignoreFunc?: Function
  maxErrorCount?: { once: number; oneDay: number },
  guarderId?: number
}

//default config
let config: Config = {
  env: Env.PRO,
  projectId: null,
  version: null,
  asyncSend: false,
  hijackConsole: true,
  behavior: 20,
  url: 'http://127.0.0.1:7001/search/error.gif',
  delayTime: 500, //延迟发送的时间
  ignoreFunc: () => { },
  ignoreHttpCodeList: [400, 401],
  excludeUrlList: [],
  maxErrorCount: { once: 3, oneDay: 10 },
  guarderId: null
}

//script trycatch-key  config
let scriptDom = document.querySelector('script[trycatch-key]')
if (scriptDom) {
  let newConfig = Base64.decode(scriptDom.getAttribute('trycatch-key') || '')
  if (newConfig) {
    config = { ...config, ...JSON.parse(newConfig) }
  }
}

export function getConfig() {
  return config
}

export function setConfig(data: SetConfig) {
  if (data.apikey) {
    Base64.decode(data.apikey)
    delete data.apikey
    data = { ...data, ...JSON.parse(Base64.decode(data.apikey)) }
  }
  config = { ...config, ...data }
}
