import { getFlag, setFlag } from './utils/util';
import CONS from './constant';

export default class ErrorTrackerInPromise {
    install() {
        if (getFlag('promiseInjected')) {
            return;
        }
        if (window.addEventListener) {
            window.addEventListener('unhandledrejection', this.tracePromiseError);
            setFlag('promiseInjected', true);
        } 
    }

    tracePromiseError(e: any) {
        const error = {
           type: CONS.REJECT_ERROR,
           message: e.reason
        }
        console.log(error);
    }
}