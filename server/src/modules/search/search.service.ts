import { ErrorService } from './../error/error.service';
import { AddLogDto, LogDto } from './search.dto';
import { IpService } from './../../providers/helper/helper.ip.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';
import * as UA from 'ua-device';
import { UaService } from '@/providers/helper/helper.ua.service';
import { QueryListResult } from '@/interfaces/request.interface';

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,

    private readonly ipService: IpService,
    private readonly errorService: ErrorService,
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

  async get<T>(params) {
    return await this.elasticsearchService.getClient().get(params);
  }

  async create<T>(params) {
    return await this.elasticsearchService.getClient().bulk({
      index: 'string',
      type: 'string',
      body: 'any',
    });
  }

  public async createLogIndex(body: AddLogDto, ip: string, ua: string) {
    const location = await this.ipService.query(ip);
    body.location = location;
    const uaDetail = this.uaService.parse(ua);
    const bulk: LogDto[] = this.bulk('logs', 'log', { ...uaDetail, ...body });
    return await this.elasticsearchService.getClient().bulk({
      body: bulk,
      index: 'logs',
      type: 'log',
    });
  }

  public async getLogList<T>(query: QueryListResult<any>) {
    const result = await this.search({
      index: 'logs',
      body: {
        from: query.skip,
        size: query.take,
        query: {
          match: { errorId: query.query.errorId },
        },
      },
    });
    const list: any[] = result.hits.hits.map(({ _source }) => {
      return _source;
    });
    const sameStack = {};
    for (let item of list) {
      if (item.stack && item.stack[0]) {
        continue;
      }
      const key = `${item.stack.url}-${item.stack.line}-${item.stack.column}-${item.version}`;
      if (!!sameStack[key]) {
        return sameStack[key];
      }
      const source = this.errorService.getSourceCode(
        item.stack[0],
        item.projectId,
        item.version,
      );
      sameStack[key] = source;
      item.source = source;
    }

    return {
      totalCount: (result as any).hits.total.value,
      list,
    };
  }
}
