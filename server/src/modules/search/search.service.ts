import { STAT_USER_NUM_INTERVAL } from './../../app.config';
import { ErrorModel } from './../error/error.model';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from 'nest-bull';
import { ErrorService } from './../error/error.service';
import { AddLogDto, LogDto } from './search.dto';
import { IpService } from './../../providers/helper/helper.ip.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';
import * as UA from 'ua-device';
import { UaService } from '@/providers/helper/helper.ua.service';
import { QueryListQuery } from '@/interfaces/request.interface';
import { Queue } from 'bull';
import { Repository, getConnection, Between } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @InjectRepository(ErrorModel)
    private readonly errorModel: Repository<ErrorModel>,
    private readonly ipService: IpService,
    private readonly errorService: ErrorService,
    private readonly uaService: UaService,
    @InjectQueue()
    private readonly queue: Queue,
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

  public async createLogIndex(
    body: AddLogDto,
    ip: string,
    ua: string,
    uid: string,
  ) {
    const location = await this.ipService.query(ip);
    body.location = location;
    const uaDetail = this.uaService.parse(ua);
    const bulk: LogDto[] = this.bulk(body.info.projectId + '', 'log', {
      clientInfo: uaDetail,
      ...body,
      uid,
    });
    return await this.elasticsearchService.getClient().bulk({
      body: bulk,
    });
  }

  public async getLogList<T>(query: QueryListQuery<any>) {
    const result = await this.search({
      index: query.query.projectId,
      body: {
        from: query.skip,
        size: query.take,
        query: {
          match: { 'data.errorId': query.query.errorId },
        },
      },
    });
    const list: any[] = result.hits.hits.map(({ _source }) => {
      return _source;
    });
    let source;
    const sameStack = {};
    for (let item of list) {
      if (!item.data.stack || !item.data.stack[0]) {
        continue;
      }
      const key = `${item.data.stack.url}-${item.data.stack.line}-${item.data.stack.column}-${item.info.version}`;
      if (!!sameStack[key]) {
        source = sameStack[key];
      } else {
        source = await this.errorService.getSourceCode(
          item.data.stack[0],
          item.info.projectId,
          item.info.version,
        );
        sameStack[key] = source;
      }
      item.source = source;
    }

    return {
      totalCount: (result as any).hits.total.value,
      list,
    };
  }

  public async addComputedErrorsUserNumTask() {
    const errors = await this.errorModel.find({
      where: {
        updatedAt: Between(
          new Date(Date.now() - STAT_USER_NUM_INTERVAL),
          new Date(),
        ),
      },
    });
    errors.forEach(item => {
      this.queue.add('countUserNum', item);
    });
  }

  public async computedErrorsUserNum(error) {
    const { aggregations } = await this.search({
      index: '1',
      body: {
        size: 0,
        aggs: {
          queryResult: {
            filter: {
              match: {
                'data.errorId': error.id.replace(/^\d+\-/, ''),
              },
            },
            aggs: {
              userNum: {
                cardinality: {
                  field: 'uid.keyword',
                },
              },
            },
          },
        },
      },
    });
    error.userNum = aggregations.queryResult.userNum.value;
    await this.errorModel
      .query(
        `UPDATE error_model set userNum = ${error.userNum} where id = "${error.id}"`, //防止更新更新时间
      )
      .catch(e => {
        console.log(e);
      });
    console.log(
      `UPDATE error_model set userNum = ${error.userNum} where id = ${error.id}`,
    );
    return true;
  }

  public statLog(query) {
    return this.search({
      index: query.projectId,
      body: {
        size: 0,
        aggs: {
          os_terms: {
            terms: {
              field: 'clientInfo.os',
              size: 4,
            },
            browser_terms: {
              terms: {
                field: 'clientInfo.browser',
                size: 4,
              },
            },
          },
        },
      },
    });
  }
}
