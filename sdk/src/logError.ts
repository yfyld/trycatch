import { ErrorLog } from '@/types';
import { getLocationHref } from './utils/util';
import { sendData } from './send';

export function log(data: ErrorLog) {
    const error = {
        type: data.type,
        info: data.info,
        level: data.level,
        url: getLocationHref()
    }
    // if(data.ex) {
    //     error.name = data.ex.name;
    //     error.message = data.ex.message;
    // }
    sendData(error);
}