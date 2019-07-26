import { isError, getLocationHref, isString } from './utils/util';
import computedStackTrace from './utils/computedStackTrace';
import CONS from './constant';
import { sendData } from './send';

export default class ErrorTrackerInGlobal {
    static instance: null | object;
    oldErrorHandler: OnErrorEventHandlerNonNull;
    constructor() {
        this.oldErrorHandler = null;
        this.install();
    }

    static getInstance() {
        if (!ErrorTrackerInGlobal.instance) {
            ErrorTrackerInGlobal.instance = new ErrorTrackerInGlobal()
        }
        return ErrorTrackerInGlobal.instance;
    }
    install() {
        const self = this;
        this.oldErrorHandler = window.onerror;
        window.onerror = function(message: string, url?: string, lineNo?: number, columnNo?: number, e?: any) {
            self.traceGlobalError(message, url, lineNo, columnNo, e);
            
        }
        window.addEventListener('error', function(e: any) {
            if (e.path.length > 0 && ['img', 'script', 'link'].indexOf(e.path[0])) {
                
            } 
        })
    }
    traceGlobalError(message: string, url?: string, lineNo?: number, columnNo?: number, e?: any) {
        const error = this.computedErrorMsg(message, url, lineNo, columnNo, e);
        // send
        console.log(error);
        sendData(error);
    }
    computedErrorMsg(message: string, url?: string, lineNo?: number, columnNo?: number, e?: any) {
        let error: any;
        if (e && isError(e)) {
            error = computedStackTrace(e);
        }
        error.type = CONS.JAVASCRIPT_ERROR;
        return error;
    }
    computedStackTraceWithoutError (message: string, url: string = getLocationHref(), lineNo?: number, columnNo?: number) {
        let msg = message;
        let name = CONS.UNKNOWN;
        if (isString(message)) {
            const matches = message.match(CONS.ERROR_TYPES_RE);
            if (matches[1]) {
                name = matches[1];
                msg = matches[2];
            }
        }
        const element = {
            url,
            func: CONS.UNKNOWN_FUNCTION,
            args: CONS.UNKNOWN,
            line: lineNo,
            col: columnNo
        }
        const error = {
            url,
            name,
            message: msg,
            level: CONS.LEVEL.NORMAL,
            stack: [element]
        }
        return error;
    }
}