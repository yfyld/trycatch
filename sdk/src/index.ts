import hijackHistoryEvent from './utils/hijackHistoryEvent';
import { hijackXMLHttpRequest, hijackFetch } from './utils/hijackRequest';
import hijackConsole from './utils/hijackConsole';
import Behavior from './behavior';
import CONS from './constant';
import { Config } from './types';
import ErrorTrackerInGlobal from './errorTrackerInGlobal';
import ErrorTrackerInHttp from './errorTrackerInHttp';

export default class TryCatch {
    config: Config;
    behavior: object;
    errorTracker: object;
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
        this.errorTracker = ErrorTrackerInGlobal.getInstance();
        ErrorTrackerInHttp.getInstance(this.config);
    }
}

const scriptDom: Element = document.querySelector('script[apikey]');

if (scriptDom) {
    const userInfo = {
        apikey: scriptDom.getAttribute('apikey'),
        version: scriptDom.getAttribute('version') || '0.0.0'
    }
    window.tryCatch = new TryCatch({...userInfo});
}