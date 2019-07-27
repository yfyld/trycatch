import hijackHistoryEvent from './utils/hijackHistoryEvent';
import { hijackXMLHttpRequest, hijackFetch } from './utils/hijackRequest';
import hijackConsole from './utils/hijackConsole';
import Behavior from './behavior';
import CONS from './constant';
import { Config } from './types';
import ErrorTrackerInGlobal from './errorTrackerInGlobal';
import ErrorTrackerInHttp from './errorTrackerInHttp';
import ErrorTrackerInVue from './errorTrackerInVue';
import ErrorTrackerInPromise from './errorTrackerInPromise';

export default class TryCatch {
    config: Config;
    behavior: object;
    errorTracker: any;
    constructor(config: Config = {}) {
        const defaults = {
            apikey: '',
            version: '0.0.0',
            url: CONS.SERVER_URL,
            behavior: 10,
            hijackConsole: true
        }
        this.config = {...defaults , ...config}; 
        this.init();

    }


    init() {
        hijackHistoryEvent();
        hijackXMLHttpRequest();
        hijackFetch();
        this.config.hijackConsole && hijackConsole();
        this.behavior = Behavior.getInstance(this.config);
        this.errorTracker = ErrorTrackerInGlobal.install();
        ErrorTrackerInHttp.install(this.config);
        ErrorTrackerInPromise.install();
    }


}

const prototype = {
    trackVue: ErrorTrackerInVue.install,
    unTrackVue: ErrorTrackerInVue.uninstall,
    trackHttp: ErrorTrackerInHttp.install,
    unTrackHttp: ErrorTrackerInHttp.uninstall,
    log: ErrorTrackerInGlobal.log
}

for (let i in prototype) {
    TryCatch.prototype[i] = prototype[i];
}


const scriptDom: Element = document.querySelector('script[apikey]');


if (scriptDom) {
    const userInfo = {
        apikey: scriptDom.getAttribute('apikey'),
        version: scriptDom.getAttribute('version') || '0.0.0'
    }
    window.tryCatch = new TryCatch({...userInfo});
}