import { ErrorDto } from './../error/error.dto';
import { ProjectModel } from './../project/project.model';
import { ChartService } from './../../providers/helper/helper.chart.service';
import { STAT_USER_NUM_INTERVAL } from './../../app.config';
import { ErrorModel } from './../error/error.model';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from 'nest-bull';
import { ProjectService } from './../project/project.service';
import {
  AddLogDto,
  LogDto,
  QueryStatLogDto,
  QueryLogListDto,
  LogListDto,
} from './search.dto';
import { IpService } from './../../providers/helper/helper.ip.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';
import * as UA from 'ua-device';
import { UaService } from '@/providers/helper/helper.ua.service';
import { QueryListQuery, PageData } from '@/interfaces/request.interface';
import { Queue } from 'bull';
import * as uuidv4 from 'uuid/v4';
import {
  Repository,
  getConnection,
  Between,
  LessThan,
  MoreThan,
} from 'typeorm';
import { eachDay, format, addMonths, addYears } from 'date-fns';
import * as path from 'path';
import { ILogJobData } from './search.queue';

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @InjectRepository(ErrorModel)
    private readonly errorModel: Repository<ErrorModel>,
    @InjectRepository(ProjectModel)
    private readonly projectModel: Repository<ProjectModel>,
    private readonly ipService: IpService,
    private readonly projectService: ProjectService,
    private readonly uaService: UaService,
    private readonly chartService: ChartService,
    @InjectQueue()
    private readonly queue: Queue,
  ) {}

  private bulk(index: string, type: string, generic: any): any[] {
    const bulk = [];
    bulk.push({ index: { _index: index, _type: type } });
    bulk.push(generic);
    return bulk;
  }

  private escape(query: string) {
    return query.replace(/([-\!\*\+\&\|\(\)\[\]\{\}\^\~\?\:\"\/])/g, '\\$1');
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
  /**
   *添加处理日志队列
   *
   * @param {*} { body, ip, ua, uid }
   * @returns
   * @memberof SearchService
   */
  public dealLogByQueue({ body, ip, ua, uid }) {
    const data = JSON.parse(body); //JSON.parse(Buffer.from(body, 'base64').toString());
    this.queue.add('dealLog', {
      body: data,
      ip: ip.replace(/[^.\d]/g, ''),
      ua,
      uid,
    });
    return;
  }

  /**
   *队列日志处理函数
   *解析ip 和 ua
   * @param {ILogJobData} { body, ip, ua, uid }
   * @returns
   * @memberof SearchService
   */
  public async dealLog({ body, ip, ua, uid }: ILogJobData) {
    const location = await this.ipService.query(ip);
    body.location = location;
    const uaDetail = this.uaService.parse(ua);
    const bulk: LogDto[] = this.bulk(body.info.projectId + '', 'log', {
      clientInfo: uaDetail,
      ...body,
      uid,
    });
    //this.queue.add('createLog', bulk);
    this.saveLogToEs(bulk);
    return bulk;
  }

  private getErrors(bulks:LogDto[]):ErrorDto[]{
    const errorMap:{[prop:string]:{data:LogDto,num:number}} = this.bulks.reduce((total, item) => {
      if (item.data) {
        if (total[item.data.errorId]) {
          total[item.data.errorId].num++;
        } else {
          total[item.data.errorId] = { data: item, num: 1 };
        }
      }
      return total;
    }, {});
    const result:ErrorDto[]=Object.values(errorMap).map(item=>({
      id:item.data.data.errorId,
      project:{id:item.data.info.projectId},
      ...item.data.data,
      eventNum:item.num
    }))
    return result
  }
  private time = Date.now();
  private bulks:LogDto[] = [];
  private saveLogToEs(bulk: LogDto[]) {
    this.bulks = this.bulks.concat(bulk);
    if (this.time < Date.now() - 10 * 1000 || this.bulks.length > 10) {
      this.time = Date.now();
      const errorDatas = this.getErrors(this.bulks)
      this.queue.add('updateError', errorDatas);
      this.createLogIndex(this.bulks);
      this.bulks = [];
    }
  }

  public async createLogIndex(bulk: LogDto[]) {
    return await this.elasticsearchService.getClient().bulk({
      body: bulk,
    });
  }

  public async getLogList<T>(
    query: QueryListQuery<QueryLogListDto>,
  ): Promise<PageData<LogListDto>> {
    const result = await this.search({
      index: query.query.projectId,
      body: {
        from: query.skip,
        size: query.take,
        query: {
          bool: {
            filter: [
              {
                term: {
                  'data.errorId': query.query.errorId,
                },
              },
            ],
          },
        },
      },
    });
    const list: any[] = result.hits.hits.map(({ _source, _id }) => {
      return { ..._source, id: _id };
    });
    let source;
    const sameStack = {};
    for (let item of list) {
      if (!item.data.stack || (item.data.stack && !item.data.stack[0])) {
        continue;
      }
      const key = `${item.data.stack[0].url}-${item.data.stack[0].line}-${item.data.stack[0].column}-${item.info.version}`;
      if (!!sameStack[key]) {
        source = sameStack[key];
      } else {
        source = await this.projectService.getSourceCode(
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
              term: {
                'data.errorId': error.id,
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
        // console.log(e);
      });
    console.log(
      `UPDATE error_model set userNum = ${error.userNum} where id = ${error.id}`,
    );
    return true;
  }

  private getTimes(startDate, endDate) {
    let dayNum = (endDate - startDate) / 3600000 / 24;
    let startTime = new Date(startDate);
    let times = [];
    let type = 'YYYY-MM-DD';
    if (dayNum > 365) {
      const interval = Math.ceil(dayNum / 365);
      for (let i = 0; i < interval; i++) {
        times.push({
          from: addYears(startTime, i).getTime(),
          to: addYears(startTime, i + 1).getTime(),
        });
      }
      type = 'YYYY';
    } else if (dayNum > 31) {
      const interval = Math.ceil(dayNum / 31);
      for (let i = 0; i < interval; i++) {
        times.push({
          from: addMonths(startTime, i).getTime(),
          to: addMonths(startTime, i + 1).getTime(),
        });
      }
      type = 'YYYY-MM';
    } else {
      let days = eachDay(new Date(startDate), new Date(endDate));
      if (days.length === 1) {
        const day = days[0];
        times = [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
        ].map(item => ({
          from: day.setHours(item - 1),
          to: day.setHours(item + 1),
        }));
        type = 'HH:mm';
      } else {
        times = days.map(item => ({
          from: item.getTime(),
          to: item.setHours(24),
        }));
      }
    }

    return { times, type };
  }

  public async statLog(query: QueryStatLogDto) {
    const { times, type } = this.getTimes(query.startDate, query.endDate);
    const { hits, aggregations } = await this.search({
      index: query.projectId,
      body: {
        query: {
          bool: {
            filter: [
              {
                term: {
                  'data.errorId': query.errorId,
                },
              },
              {
                range: {
                  'data.time': {
                    gt: query.startDate,
                    lt: query.endDate,
                  },
                },
              },
            ],
          },
        },
        size: 0,
        aggs: {
          trendStat: {
            range: {
              field: 'data.time',
              ranges: times,
            },
          },
          osStat: {
            terms: {
              field: 'clientInfo.os.keyword',
              size: 4,
            },
          },
          browserStat: {
            terms: {
              field: 'clientInfo.browser.keyword',
              size: 4,
            },
          },
          deviceStat: {
            terms: {
              field: 'clientInfo.deviceType.keyword',
              size: 4,
            },
          },
        },
      },
    });

    return {
      trendStat: {
        totalCount: hits.total,
        data: aggregations.trendStat.buckets.map(item => ({
          date: format(item.from, type),
          count: item.doc_count,
        })),
      },
      osStat: {
        totalCount: hits.total,
        data: aggregations.osStat.buckets.map(item => ({
          name: item.key,
          count: item.doc_count,
        })),
      },
      browserStat: {
        totalCount: hits.total,
        data: aggregations.browserStat.buckets.map(item => ({
          name: item.key,
          count: item.doc_count,
        })),
      },
      deviceStat: {
        totalCount: hits.total,
        data: aggregations.deviceStat.buckets.map(item => ({
          name: item.key,
          count: item.doc_count,
        })),
      },
    };
  }

  public async statError(query: any) {
    const { endDate, startDate, projectId, guarderId, otherQuery } = query;
    const errorQueryBody = {
      ...otherQuery,
      project: { id: projectId },
      createdAt: LessThan(new Date(endDate)),
      updatedAt: MoreThan(new Date(startDate)),
    };
    if (guarderId) {
      errorQueryBody.guarder = { id: guarderId };
    }
    const errors = await this.errorModel.find(errorQueryBody);

    const { times, type } = this.getTimes(startDate, endDate);

    const filterIn = [];
    errors.forEach(item => {
      filterIn.push({
        term: {
          'data.errorId': item.id,
        },
      });
    });
    const { hits, aggregations } = await this.search({
      index: projectId,
      body: {
        query: {
          bool: {
            filter: [
              {
                range: {
                  'data.time': {
                    gt: startDate,
                    lt: endDate,
                  },
                },
              },
            ],
            should: filterIn,
          },
        },
        size: 0,
        aggs: {
          trendStat: {
            range: {
              field: 'data.time',
              ranges: times,
            },
          },
        },
      },
    });
    return {
      totalCount: hits.total,
      data: aggregations.trendStat.buckets.map(item => ({
        date: format(item.from, type),
        count: item.doc_count,
      })),
    };
  }

  /**
   * addGenerateImgTask
   */
  public async addGenerateImgTask() {
    const errors = await this.errorModel.find({
      where: {
        updatedAt: Between(new Date(Date.now() - 24 * 3600 * 1000), new Date()),
      },
    });

    const projectIds = errors.map(item => item.projectId);

    projectIds.forEach(item => {
      this.queue.add('generateImg', item);
    });
  }

  private getChartOption(data) {
    return {
      grid: {
        left: 10,
        top: 10,
        bottom: 50,
        right: 10,
      },
      xAxis: {
        type: 'category',
        boundaryGap: ['20%', '20%'],
        splitLine: false,
        axisLine: {
          lineStyle: {
            color: '#999',
          },
        },
        data: data.data.map(item => item.date),
      },
      yAxis: {
        show: false,
        type: 'value',
        splitLine: false,
      },
      series: [
        {
          data: data.data.map(item => item.count),
          type: 'line',
          lineStyle: {
            color: '#09c',
          },
          areaStyle: {
            color: '#09c',
          },
          smooth: true,
        },
      ],
    };
  }

  public async generateImg(projectId) {
    const data = await this.statError({
      endDate: Date.now(),
      startDate: Date.now() - 86400000 * 7,
      projectId,
    });

    const image = this.chartService.generateImg({
      option: this.getChartOption(data),
      path: path.join(
        __dirname,
        `../../publics/charts/${projectId}_${Date.now()}.png`,
      ),
    });

    const project = await this.projectModel.findOne(projectId);
    project.image = image;
    this.projectModel.save(project);
    return true;
  }
}
