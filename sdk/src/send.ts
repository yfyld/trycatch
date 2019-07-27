import http from './utils/http';
import createErrorId from './utils/createErrorId';
import { IError, PackageData, Config } from '@/types';
import Behavior from './behavior';
import CONS from './constant';
import { getEnvBasedOnHost } from './utils/util';

const behavior = Behavior.getInstance();
const allData: IError[] = [];
let timer: null | number = null;

// export function send(data: IError) {

// }
// function _sendToServer(data) {
//     return http(data);
// }



function _generatePackageData(data: IError | IError[]) {
    const packageData: PackageData = {};
    packageData.data = data;
    packageData.behavior = behavior.behaviorList;
    return packageData;

}

function _send(data: IError, async = true) {
    /*
    if (getEnvBasedOnHost() !== 'online') {
        data.createTime = Date.now();
        data.updateTime = Date.now();
        data.eventNum = 1;
        data.userAgent = navigator.userAgent;
        let isNewError = true;
        let localData = JSON.parse(localStorage.getItem('TRYCATCHLOCALLOG')) || [];
        for (let item of localData) {
            if (item.errorId === data.errorId) {
                isNewError = false;
                item.eventNum++;
                item.updateTime = Date.now();
                break;
            }
        }
        if (isNewError) {
            localData.push(data);
            if (localData.length > 20) {
                localData = localData.slice(-20, localData.length);
            }
        }
        localStorage.setItem('TRYCATCHLOCALLOG', JSON.stringify(localData));
        return ;
    }*/
    if (async) {
        allData.push(data);
        if (!timer) {
            timer = setTimeout(() => {
                _sendToServer(allData);
            }, 0)
        }
    } else {
        _sendToServer(data)
    }
    
}

export function sendData(data: IError) {
    const errorId = createErrorId(data);
    if (!errorId) {
        return ;
    }
    data.errorId = errorId;
    _send(data);
}

function _sendToServer(data: IError | IError[]) {
    const packageData = _generatePackageData(data);
    console.log(packageData);
    return http(packageData);
}