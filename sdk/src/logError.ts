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

    sendData(error);
}