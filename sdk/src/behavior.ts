import CONS from './constant';
import { getFlag, setFlag, getLocationHref, oneOf } from './utils/util';
import { BehaviorPage, BehaviorClick, BehaviorHttp, Config } from './types';



export default class Behavior {
    behaviorList: any[];
    config: Config;
    bindBehaviorSuccess: boolean = false;
    static instance: null | Behavior;
    constructor(config: Config = { behavior: 10, excludeUrl: [CONS.SERVER_URL] }) {
        this.behaviorList = [];
        this.config = config;
        this.addBehavior = this.addBehavior.bind(this);
        if (this.config.behavior && !this.bindBehaviorSuccess) {
            this.bindEvent();
        }
    }

    static getInstance(config: Config = { behavior: 10, excludeUrl: [CONS.SERVER_URL] }): Behavior {
        if (!Behavior.instance) {
            Behavior.instance = new Behavior(config);
        }
        return Behavior.instance;
    }

    clearBehaviors() {
        this.behaviorList = [];
    }

    
    getClickBehavior(e: any): BehaviorClick {
        return {
            type: 'CLICK',
            time: Date.now(),
            page: getLocationHref(),
            id: e.target.id || '',
            class: e.target.className || '',
            html: e.target.outerHTML.substr(0, 50)
        }
    }

    getPageBehavior(e: any): BehaviorPage {
        return {
            type: 'PAGE',
            time: Date.now(),
            oldURL: e.oldURL || document.referrer || '',
            newURL: e.newURL || e.target && e.target.URL || ''
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
            this.behaviorList.push(this.getClickBehavior(e));
        } else if (e.type === 'DOMContentLoaded') {
            this.behaviorList.push(this.getPageBehavior(e));
        } else if (e.type === 'historyPushState' || e.type === 'historyReplaceState' || e.type === 'historyPopstate') {
            this.behaviorList.push(this.getPageBehavior(e.detail));
        } else if (e.type === 'httpLoadEnd' || e.type === 'httpError') {
            if (oneOf(e.detail.url, this.config.excludeUrl) || oneOf(e.detail.responseURL, this.config.excludeUrl)) {
                return;
            }
            this.behaviorList.push(this.getHttpBehavior(e.detail));
        }

        if (this.behaviorList.length > this.config.behavior) {
            this.behaviorList = this.behaviorList.slice(-this.config.behavior, this.behaviorList.length)
        }
    }

    bindEvent() {
        if (window.addEventListener && !getFlag('watchBehavior')) {
            window.addEventListener('click', this.addBehavior, true);
            window.addEventListener('DOMContentLoaded', this.addBehavior);
            if (typeof window.onpopstate !== undefined) {

            }
            window.addEventListener('historyPushState', this.addBehavior);
            window.addEventListener('historyPopstate', this.addBehavior);
            window.addEventListener('historyReplaceState', this.addBehavior);
            window.addEventListener('httpLoadEnd', this.addBehavior);
            setFlag('watchBehavior', true);
        }
    }

    removeBindEvent() {
        if (window.addEventListener) {
            window.removeEventListener('click', this.addBehavior);
            window.removeEventListener('DOMContentLoaded', this.addBehavior);
            window.removeEventListener('historyPushState', this.addBehavior);
            window.removeEventListener('historyReplaceState', this.addBehavior);
            window.removeEventListener('historyPopstate', this.addBehavior);
            window.removeEventListener('httpLoadEnd', this.addBehavior);
            this.bindBehaviorSuccess = false;
            setFlag('watchBehavior', false);
        }
        
    }
}