import { getFlag, setFlag } from './util';
import CONS from '../constant';
import {log } from '../logError';

export default function() {
    if (getFlag('consoleInjected')) {
        return;
    }
    const oldError = window.console.error;  
    window.console.error = function() {
        const infoFromTryCatch = arguments[arguments.length - 1] === 'infoFromTryCatch';
        var args = Array.prototype.slice.call(arguments, 0);
        if (infoFromTryCatch) {
            args.splice(-1);
        }
        oldError.apply(null, args);
        infoFromTryCatch || log({
            info: args.join(';'),
            type: CONS.LOG_ERROR
        })
    }  

    setFlag('consoleInjected', true);
}