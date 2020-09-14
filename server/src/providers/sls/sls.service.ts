import { Injectable } from '@nestjs/common';
import * as ALY from 'aliyun-sdk';
import { transformQueryToStr, addSelect } from './sls.util';

const sls = new ALY.SLS({
  accessKeyId: '', // 步骤2获取的密钥
  secretAccessKey: '', // 步骤2获取的密钥值
  endpoint: 'http://cn-hangzhou.sls.aliyuncs.com',
  apiVersion: '2015-06-01'
});

@Injectable()
export class SlsService {
  constructor() { }
  public query = function (opt) {
    const { query, ...other } = opt;

    const newOpt = {
      projectName: 'trycatch',
      logStoreName: 'error',
      from: other.from,
      to: other.to,
      query: addSelect(transformQueryToStr(query))
    };

    return new Promise((resolve, reject) => {
      sls.getLogs(newOpt, function (error, data) {
        if (error) {
          reject(error);
        } else {

          resolve(Object.values(data.body));
        }
      });
    });
  };

  public create(data: any[]) {
    return sls.putLogs({
      projectName: 'trycatch',
      logStoreName: 'error',
      logGroup: {
        logs: data
      }
    }, (error) => {
      console.log(error)
    })
  }

}
