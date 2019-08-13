import { Config } from './config'
import { getFlag, setFlag, getLocationHref, oneOf } from './utils/util'
import { BehaviorPage, BehaviorClick, BehaviorHttp } from './types'

interface BehaviorConfig {
  behavior: number
  excludeUrlList: string[]
}

export default class Behavior {
  behaviorList: any[]
  config: BehaviorConfig = {
    behavior: 20,
    excludeUrlList: []
  }
  static instance: null | Behavior
  constructor() {
    this.behaviorList = []
    this.addBehavior = this.addBehavior.bind(this)
  }

  static getInstance(config?: Config | BehaviorConfig): Behavior {
    if (!Behavior.instance) {
      Behavior.instance = new Behavior()
    }
    if (config) {
      const { behavior, excludeUrlList } = config
      Behavior.instance.config = { behavior, excludeUrlList }
    }
    return Behavior.instance
  }

  clearBehaviors() {
    this.behaviorList = []
  }

  getClickBehavior(e: any): BehaviorClick {
    return {
      type: 'CLICK',
      time: Date.now(),
      page: getLocationHref(),
      id: e.target.id || '',
      class: e.target.className || '',
      html: e.target.outerHTML.substr(0, 100)
    }
  }

  getPageBehavior(e: any): BehaviorPage {
    return {
      type: 'PAGE',
      time: Date.now(),
      firstVisit: !e.oldURL,
      oldURL: e.oldURL || document.referrer || '',
      newURL: e.newURL || (e.target && e.target.URL) || ''
    }
  }

  getHttpBehavior(e: any): BehaviorHttp {
    return {
      type: 'HTTP',
      time: Date.now(),
      method: e.method,
      url: e.url,
      page: getLocationHref()
    }
  }

  addBehavior(e: any) {
    if (e.type === 'click') {
      this.behaviorList.push(this.getClickBehavior(e))
    } else if (e.type === 'DOMContentLoaded') {
      this.behaviorList.push(this.getPageBehavior(e))
    } else if (
      e.type === 'historyPushState' ||
      e.type === 'historyReplaceState' ||
      e.type === 'historyPopstate'
    ) {
      this.behaviorList.push(this.getPageBehavior(e.detail))
    } else if (e.type === 'httpLoadEnded' || e.type === 'httpErrored') {
      if (
        oneOf(e.detail.url, this.config.excludeUrlList) ||
        oneOf(e.detail.responseURL, this.config.excludeUrlList)
      ) {
        return
      }
      this.behaviorList.push(this.getHttpBehavior(e.detail))
    }
    if (this.behaviorList.length > this.config.behavior) {
      this.behaviorList = this.behaviorList.slice(
        -this.config.behavior,
        this.behaviorList.length
      )
    }
  }

  install() {
    if (window.addEventListener && !getFlag('watchBehavior')) {
      window.addEventListener('click', this.addBehavior, true)
      window.addEventListener('DOMContentLoaded', this.addBehavior)
      if (typeof window.onpopstate === undefined) {
        window.addEventListener('hashchange', this.addBehavior)
      }
      window.addEventListener('historyPushState', this.addBehavior)
      window.addEventListener('historyPopstate', this.addBehavior)
      window.addEventListener('historyReplaceState', this.addBehavior)
      window.addEventListener('httpLoadEnded', this.addBehavior)
      setFlag('watchBehavior', true)
    }
  }

  uninstall() {
    if (window.addEventListener) {
      window.removeEventListener('click', this.addBehavior)
      window.removeEventListener('DOMContentLoaded', this.addBehavior)
      if (typeof window.onpopstate === 'undefined') {
        window.removeEventListener('hashchange', this.addBehavior)
      }
      window.removeEventListener('historyPushState', this.addBehavior)
      window.removeEventListener('historyReplaceState', this.addBehavior)
      window.removeEventListener('historyPopstate', this.addBehavior)
      window.removeEventListener('httpLoadEnd', this.addBehavior)
      setFlag('watchBehavior', false)
    }
  }
}
