import { ParsePageQueryIntPipe } from './../../pipes/parse-page-query-int.pipe';
import { ParseIntPipe } from './../../pipes/parse-int.pipe';
import { Cookie } from './../../decotators/cookie.decorators';
import { PageData } from './../../interfaces/request.interface';
import { SearchService } from './search.service';
import { Controller, Get, Post, Query, Req, Param, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiUseTags,
  ApiResponse,
} from '@nestjs/swagger';
import { InjectQueue } from 'nest-bull';
import { Queue } from 'bull';
import { QueryList } from '@/decotators/query-list.decorators';
import { QueryListQuery } from '@/interfaces/request.interface';

import * as uuidv4 from 'uuid/v4';
import { QueryStatLogDto, QueryLogListDto, LogListDto } from './search.dto';

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
  async createErrorLogByBody(
    @Res() response: Response,
    @Req() req: Request,
    @Cookie() cookie,
  ): Promise<any> {
    const { body, ip, headers, cookies } = req;
    const data = JSON.parse(body); //JSON.parse(Buffer.from(body, 'base64').toString());
    const uid = cookies.TRYCATCH_TOKEN || uuidv4();
    response.cookie('TRYCATCH_TOKEN', uid, {
      maxAge: 999999999999,
      httpOnly: true,
      path: '/',
    });
    this.queue.add('getLog', {
      body: data,
      ip: ip.replace(/[^.\d]/g, ''),
      ua: headers['user-agent'],
      uid,
    });
    return response.send('');
  }

  @ApiOperation({ title: '上报错误日志', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  @Get('/error.gif')
  createErrorLogByQuery(@Req() req: any): Promise<void> {
    const { query, ip, headers } = req;
    this.queue.add('getLog', {
      body: JSON.parse(query),
      ip: ip.replace(/[^.\d]/g, ''),
      ua: headers['user-agent'],
    });
    return;
  }

  // @ApiOperation({ title: '查询日志详情', description: '' })
  // @Get('/log-info/:logId')
  // public async getErrorLogInfo(
  //   @Param('logId')
  //   logId: string,
  // ): Promise<any> {
  //   const result = await this.searchService.get({
  //     index: 'logs',
  //     id: logId,
  //   });

  //   return { ...result._source, id: logId };
  // }

  @ApiOperation({ title: '查询日志列表', description: '' })
  @Get('/log')
  public async getErrorLogList(
    @QueryList(new ParsePageQueryIntPipe(['projectId']))
    query: QueryListQuery<QueryLogListDto>,
  ): Promise<PageData<LogListDto>> {
    return this.searchService.getLogList(query);
  }

  @ApiOperation({ title: '统计error', description: '' })
  @Get('/stat/error')
  public async statError(
    @Query(
      new ParseIntPipe([
        'startDate',
        'endDate',
        'projectId',
        'level',
        'status',
        'guarderId',
      ]),
    )
    query: any,
  ): Promise<any> {
    return this.searchService.statError(query);
  }

  @ApiOperation({ title: '统计error日志', description: '' })
  @Get('/stat/log')
  public async statLog(
    @Query(new ParseIntPipe(['startDate', 'endDate', 'projectId']))
    query: QueryStatLogDto,
  ): Promise<any> {
    return this.searchService.statLog(query);
  }

  @Get('/clear')
  public async test(): Promise<any> {
    return null;
  }
}
