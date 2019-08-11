import { PageData } from './../../interfaces/request.interface';
import { SearchService } from './search.service';
import { Controller, Get, Post, Query, Req, Param } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiUseTags,
  ApiResponse,
} from '@nestjs/swagger';
import { InjectQueue } from 'nest-bull';
import { Queue } from 'bull';
import { QueryList } from '@/decotators/query-list.decorators';
import { QueryListResult } from '@/interfaces/request.interface';

@ApiUseTags('上传日志')
@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    @InjectQueue()
    private readonly queue: Queue,
  ) {}

  @ApiOperation({ title: '上报错误日志', description: '' })
  @ApiResponse({ status: 200 })
  @Post('/error.gif')
  async createErrorLogByBody(@Req() req: any): Promise<any> {
    const { body, ip, headers } = req;
    this.queue.add('profile', {
      body: JSON.parse(body),
      ip: ip.replace(/[^.\d]/g, ''),
      ua: headers['user-agent'],
    });
    return;
  }

  @ApiOperation({ title: '上报错误日志', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  @Get('/error.gif')
  createErrorLogByQuery(@Req() req: any): Promise<void> {
    const { query, ip, headers } = req;
    this.queue.add('profile', {
      body: JSON.parse(query),
      ip: ip.replace(/[^.\d]/g, ''),
      ua: headers['user-agent'],
    });
    return;
  }

  @ApiOperation({ title: '查询日志详情', description: '' })
  @Get('/log-info/:logId')
  public async getErrorLogInfo(
    @Param('logId')
    logId: string,
  ): Promise<any> {
    const result = await this.searchService.get({
      index: 'logs',
      id: logId,
    });

    return { ...result._source, id: logId };
  }

  @ApiOperation({ title: '查询日志列表', description: '' })
  @Get('/log-list')
  public async getErrorLogList(
    @QueryList() query: QueryListResult<any>,
  ): Promise<PageData<any>> {
    const result = await this.searchService.search({
      index: 'logs',
      body: {
        from: query.skip,
        size: query.take,
        query: {
          match: { errorId: query.query.errorId },
        },
      },
    });
    return {
      totalCount: (result as any).hits.total.value,
      list: result.hits.hits.map(({ _source }) => {
        return _source;
      }),
    };
  }
}
