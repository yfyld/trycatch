import { ERROR_TYPE } from './../constant/index';
import { hashCode, getErrorTag } from './util';
import { IError } from '../types';

const allErrorNumber = {};

function getRealPath(url: string) {
  return url.replace(/\?.*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1');
}

//解决因object key顺序不一样导致生成id不一致
function objectOrder(str: string): string {
  const sortFn = (obj: Object) => {
    return Object.keys(obj)
      .sort()
      .reduce((total, key) => {
        if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
          total[key] = sortFn(obj[key]);
        } else {
          total[key] = obj[key];
        }
        return total;
      }, {});
  };
  try {
    if (/\{.*\}/.test(str)) {
      let obj = JSON.parse(str);
      obj = sortFn(obj);
      return JSON.stringify(obj);
    }
  } catch (error) {
    return str;
  }
}

export default function(data: IError, maxCount = { once: 3, oneDay: 10 }) {
  let id: string;
  let hashId: number;
  const locationUrl = getRealPath(data.url);

  if (data.type === ERROR_TYPE.HTTP_ERROR) {
    id = data.type + data.request.method + data.response.status + getRealPath(data.request.url);
  } else if (
    data.type === ERROR_TYPE.JAVASCRIPT_ERROR ||
    data.type === ERROR_TYPE.VUE_ERROR ||
    data.type === ERROR_TYPE.RESOURCE_ERROR
  ) {
    id = data.type + data.name + data.message + locationUrl;
  } else if (data.type === ERROR_TYPE.PROMISE_ERROR) {
    id = data.type + objectOrder(data.message) + locationUrl;
  } else {
    id = data.type + data.message + locationUrl;
  }
  hashId = hashCode(id);

  if (allErrorNumber[hashId]) {
    allErrorNumber[hashId]++;
    if (allErrorNumber[hashId] > maxCount.once) {
      return null;
    }
  } else {
    allErrorNumber[hashId] = 1;
  }

  const errorIdInfo = localStorage.getItem('TRYCATCH_ERROR_ID_INFO') || '{}';
  let parseData: any = {};
  const date = getErrorTag();
  parseData = JSON.parse(errorIdInfo);

  if (parseData[date]) {
    if (parseData[date][hashId]) {
      const overNum = parseData[date][hashId] - maxCount.oneDay;
      if (overNum <= 0 || 1 / overNum > Math.random()) {
        parseData[date][hashId]++;
      } else {
        return null;
      }
    } else {
      parseData[date][hashId] = 1;
    }
  } else {
    parseData = {
      [date]: {
        [hashId]: 1
      }
    };
  }

  localStorage.setItem('TRYCATCH_ERROR_ID_INFO', JSON.stringify(parseData));

  return hashId;
}
