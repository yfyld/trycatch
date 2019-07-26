import { getFlag, setFlag, getLocationHref } from './utils/util';
import CONS from './constant';
import { Config } from './types';
import { sendData } from './send';

export default class ErrorTrackerInHttp {
    static instance: null | object;
    ignoreHttpCodeList: number[];
    constructor(config: Config) {
        this.traceHttpError = this.traceHttpError.bind(this);
        this.decideHttp = this.decideHttp.bind(this);
        this.ignoreHttpCodeList = config.ignoreHttpCodeList || [];
        this.install();
    }
    static getInstance(config: Config) {
        if (!ErrorTrackerInHttp.instance) {
            ErrorTrackerInHttp.instance = new ErrorTrackerInHttp(config);
        }
        return ErrorTrackerInHttp.instance;
    }
    computedErrorStackTrace(data: any, level: number) {
        let error = {
            type: CONS.HTTP_ERROR,
            response: {
                status: data.status,
                statusText: data.statusText,
                description: data.status === 0 ? 'XMLHttpRequest请求失败(可能原因:浏览器跨域限制、限时)' : data.responseText   
            },
            resuest: {
                method: data.method,
                url:data.url,
                data: data.reqData
            },
            url: getLocationHref(),
            time: Date.now(),
            elapsedTime: data.elapsedTime,
            level

        }
        return error;
        
    }
   
    traceHttpError(e: any) {
        const error = this.computedErrorStackTrace(e.detail, CONS.LEVEL.HIGH);
        // console.log(error);
        // send
        sendData(error);
    }

    decideHttp(e: any) {
        if ((e.status >= 400 || e.status === 0) && this.ignoreHttpCodeList.indexOf(e.status) < 0) {
            this.traceHttpError(e);
        }
    }
    install() {
        if (window.addEventListener && !getFlag('watchRequest')) {
            window.addEventListener('httpError', this.traceHttpError, false);
            window.addEventListener('httpLoadEnd', this.decideHttp, false);
            setFlag('watchRequest', true);
        }
    }
    uninstall() {
        if (window.addEventListener) {
            window.removeEventListener('httpError', this.traceHttpError);
            window.removeEventListener('httpLoadEnd', this.traceHttpError);
            setFlag('watchRequest', false);
        }
    }
}