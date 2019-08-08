import { hashCode, getErrorTag } from './util';
import { IError } from '../types';
import CONS from '@/constant';



const allErrorNumber = {};

/**
    type: 'HTTP_ERROR',
    response: {},
    request: {
        method: 'get',
        url: '/abc',
        data: {name: 'abc'}
    },
    response: {
        status: 200,
        statusText: 'success',
        responseText: 'success'
    },
    url: 'http://localhost:8080/',
    time: 1234566,
    elapsedTime: 12,
    level: 2

*/

/** 
    type: 'JAVASCRIPT_ERROR',
    message: '出错了',
    name: 'Error',
    stack: [{url: 'http://', line: 32, column: 12, args:[], func: 'UNKNOWN_FUNCTION'}],
    url: 'http://',
    level: 3
    
*/

/**
 
    type: 'RESOURCE_ERROR',
    url: 'http://',
    src: 'http://',
    elapsedTime: 12,
    tagName: 'img',
    level: 3
 */

 /**
    type: 'VUE_ERROR',
    message: 'abcd',
    level: 3,
    componentName: 'A',
    propsData: {data: 1},
    name: 'abcd',
    stack: [],
    time: 1234
  */
export default function(data: IError) {
    let id: string;
    let hashId: number;
    const regex = /timestamp=\w*|t=\w*|ts=\w*|userId=\-?\w*|token=\w*/gi;
    const locationUrl = (data.url).replace(regex, '');
    const year = getErrorTag();
    if (data.type === CONS.HTTP_ERROR) {
        const reqUrl = data.request.url.replace(regex, '');
        id = data.type + locationUrl + data.request.method + data.response.status + reqUrl;
    } else if (data.type === CONS.JAVASCRIPT_ERROR || data.type === CONS.VUE_ERROR) {
        if (data.stack && data.stack.length) {
            id = data.type + data.stack[0].line + data.stack[0].column + locationUrl + data.name + data.message;
        } else {
            id = data.type + data.name + data.message + locationUrl;
        }
    } else {
        id = data.type + data.message + locationUrl;
    }
    hashId = hashCode(id);
   
    const info = localStorage.getItem('TRYCATCH_ERROR_ID_INFO');
    let parseData: any = {};
    if (info) {
        parseData = JSON.parse(info);
        if (parseData[year]) {
            if (parseData[year][hashId]) {
                if (parseData[year][hashId] > CONS.MAX_ERROR_COUNT) {
                    return null;
                } else {
                    parseData[year][hashId]++;
                }
            } else {
                parseData[year][hashId] = 1;
            }
        } else {
            parseData = {
                year: {
                    [hashId]: 1
                }
            }
        }
    } else {
        parseData = {
            year: { 
                [hashId]: 1
            }
        }
    }
    localStorage.setItem('TRYCATCH_ERROR_ID_INFO', JSON.stringify(parseData));

    return hashId;
}