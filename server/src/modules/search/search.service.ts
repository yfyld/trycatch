import { IpService } from './../../providers/helper/helper.ip.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';
import * as UA from 'ua-device';
import { UaService } from '@/providers/helper/helper.ua.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly ipService: IpService,
    private readonly uaService: UaService,
  ) {}
  private bulk(index: string, type: string, generic: any): any[] {
    const bulk = [];
    bulk.push({ index: { _index: index, _type: type } });
    bulk.push(generic);
    return bulk;
  }

  async search<T>(params) {
    return await this.elasticsearchService.getClient().search<T>(params);
  }

  async create<T>(params) {
    return await this.elasticsearchService.getClient().bulk({
      index: 'string',
      type: 'string',
      body: 'any',
    });
  }

  public async createLogIndex(body: any,ip:string,ua:string) {
    const location = await this.ipService.query(ip);
    body.location = location;
    const uaDetail =  this.uaService.parse(ua);
    const bulk = this.bulk('logs', 'log', {...uaDetail,...body});
    return await this.elasticsearchService.getClient().bulk({
      body: bulk,
      index: 'logs',
      type: 'log',
    });
  }
}
