import { Injectable, HttpService } from '@nestjs/common';
import * as path from 'path';
import * as IPDB from 'ipdb';
const ipdb = new IPDB(path.join(__dirname, './data/qqwry.ipdb'));

export type IP = string;
export interface IIPDetail {
  city: string;
  country: string;
  region: string;
  isp: string;
  ip: string;
}

@Injectable()
export class IpService {
  constructor(private readonly httpService: HttpService) {}

  // 通过阿里云服务查询
  private queryIpByTaobao(ip: IP): Promise<IIPDetail> {
    return this.httpService.axiosRef
      .request({
        url: `http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`,
      })
      .then(response => {
        if (response.data && response.data.code === 0) {
          return Promise.resolve(response.data.data);
        } else {
          return Promise.reject(response.data);
        }
      })
      .catch(error => {
        return Promise.reject();
      });
  }

  // 通过 GEO 库查询
  private queryIpByGeo(ip: IP): IIPDetail {
    const result = ipdb.find(ip);
    if (result.code >= 0) {
      return {
        country: result.data.country_name,
        region: result.data.region_name,
        city: result.data.city_name,
        isp: result.data.isp_domain,
        ip,
      };
    } else {
      return {
        country: '未知',
        region: '未知',
        city: '未知',
        isp: '未知',
        ip,
      };
    }
  }

  // 查询 IP 地址
  public query(ip: IP): Promise<IIPDetail> {
    const result = this.queryIpByGeo(ip);
    if (result.city !== '未知') {
      return Promise.resolve(result);
    }
    return this.queryIpByTaobao(ip)
      .then(({ city, country, isp, region, ip }) => ({
        city,
        country,
        isp,
        region,
        ip,
      }))
      .catch(() => Promise.resolve(result));
  }
}
