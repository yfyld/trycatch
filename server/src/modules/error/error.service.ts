import { ALARM_INTERVAL } from './../../app.config';
import { InjectQueue } from 'nest-bull';
import { SourcemapModel, ProjectModel } from './../project/project.model';
import {
  QueryErrorListDto,
  ErrorDto,
  SourceCodeDto,
  UpdateErrorDto,
} from './error.dto';
import { HttpBadRequestError } from '../../errors/bad-request.error';
import { ErrorModel } from './error.model';
import { Injectable, HttpService } from '@nestjs/common';
import { Repository, In, LessThan, MoreThan, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserModel } from '@/modules/user/user.model';
import { QueryListQuery, PageData } from '@/interfaces/request.interface';
import * as SourceMap from 'source-map';
import { RedisService } from 'nestjs-redis';
import { Queue } from 'bull';
import * as moment from 'moment';
@Injectable()
export class ErrorService {
  constructor(
    @InjectRepository(ErrorModel)
    private readonly errorModel: Repository<ErrorModel>,
    @InjectRepository(SourcemapModel)
    private readonly sourcemapModel: Repository<SourcemapModel>,
    @InjectRepository(ProjectModel)
    private readonly projectModel: Repository<ProjectModel>,
    @InjectRepository(UserModel)
    private readonly userModel: Repository<UserModel>,
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,

    @InjectQueue()
    private readonly queue: Queue,
  ) {}

  public async createError(body: ErrorDto): Promise<void> {
    let error = await this.getErrorById(body.id);
    if (error) {
      error.eventNum++;
    } else {
      error = this.errorModel.create({
        ...body,
        eventNum: 1,
        userNum: 1,
      });
    }
    await this.errorModel.save(error);
    return;
  }

  public async getErrorById(errorId: string): Promise<ErrorModel> {
    const error = await this.errorModel.findOne({
      where: { id: errorId },
    });
    return error;
  }

  public async getErrorAllInfo(errorId: string): Promise<string> {
    const error = await this.errorModel.findOne({
      where: { id: errorId },
    });
    return null;
  }

  public async getErrors(
    query: QueryListQuery<QueryErrorListDto>,
  ): Promise<PageData<ErrorModel>> {
    const { endDate, startDate, guarderId, projectId } = query.query;
    const searchBody = {
      skip: query.skip,
      take: query.take,
      where: {
        project: { id: parseInt(projectId, 10) },
        cratedAt: LessThan(new Date(endDate)),
        updateAt: MoreThan(new Date(startDate)),
      },
      order: {},
      relations: ['guarder'],
    };
    if (query.sort.key) {
      searchBody.order[query.sort.key] = query.sort.value;
    }
    if (query.query.guarderId) {
      searchBody.where['guarder'] = { id: guarderId };
    }
    const [errorTypes, totalCount] = await this.errorModel.findAndCount(
      searchBody,
    );
    return {
      totalCount,
      list: errorTypes,
    };
  }

  public async updateError(body: UpdateErrorDto): Promise<void> {
    const updateBody: any = {};
    if (body.actionType === 'LEVEL') {
      updateBody.level = body.level;
    } else if (body.actionType === 'STATUS') {
      updateBody.status = body.status;
    } else {
      updateBody.guarder = { id: body.guarderId };
    }
    await this.errorModel
      .createQueryBuilder()
      .update()
      .set(updateBody)
      .where('id IN (:...errorIds)', { errorIds: body.errorIds })
      .execute();
    return;
  }

  private async parseSourcemap(
    sourcemapSrc,
    line,
    column,
  ): Promise<SourceCodeDto> {
    // 读取map文件，实际就是一个json文件
    var rawSourceMap = await this.httpService.axiosRef.request({
      url: sourcemapSrc,
    });
    if (!rawSourceMap || !rawSourceMap.data) {
      return null;
    }
    // 通过sourceMap库转换为sourceMapConsumer对象
    var consumer = await new SourceMap.SourceMapConsumer(rawSourceMap.data);
    // 传入要查找的行列数，查找到压缩前的源文件及行列数
    var sm = consumer.originalPositionFor({
      line, // 压缩后的行数
      column, // 压缩后的列数
    });
    // 压缩前的所有源文件列表
    var sources = consumer.sources;
    // 根据查到的source，到源文件列表中查找索引位置
    var smIndex = sources.indexOf(sm.source);
    // 到源码列表中查到源代码
    var smContent = consumer.sourcesContent[smIndex];
    // 将源代码串按"行结束标记"拆分为数组形式
    const rawLines = smContent.split(/\r?\n/g);
    // 输出源码行，因为数组索引从0开始，故行数需要-1

    return {
      code: `
${rawLines[sm.line - 3]}
${rawLines[sm.line - 2]}
${rawLines[sm.line - 1]}
> ${rawLines[sm.line]}
${rawLines[sm.line + 1]}
${rawLines[sm.line + 2]}
${rawLines[sm.line + 3]}`,
      line: sm.line,
      column: sm.column,
      sourceUrl: sm.source,
      name: sm.name,
    };
  }

  public async getSourceCode(
    stack: any,
    projectId: number,
    version: string,
  ): Promise<SourceCodeDto> {
    const client = this.redisService.getClient();

    const fileName = stack.url.match(/[^/]+$/)[0];
    const line = stack.line;
    const column = stack.column;
    const targetSrc = stack.url;
    const clearKey = `${projectId}-${stack.fileName}-${line}-${column}-${version}`;
    let sourceCode = await client.get(clearKey);
    let sourcemapSrc;

    if (sourceCode) {
      return JSON.parse(sourceCode);
    }

    let sourcemap = await this.sourcemapModel.findOne({
      where: { fileName, projectId, hash: true },
    });
    if (!sourcemap) {
      sourcemap = await this.sourcemapModel.findOne({
        where: { fileName, projectId, version },
      });
    }

    if (!sourcemap) {
      const project = await this.projectModel.findOne({
        where: { id: projectId },
      });
      if (project.sourcemapOnline) {
        sourcemapSrc = targetSrc + '.map';
      }
    }

    if (!sourcemapSrc) {
      return null;
    }
    let result = await this.parseSourcemap(sourcemapSrc, line, column);
    if (!result) {
      return null;
    }
    client.set(clearKey, JSON.stringify(result));
    return result;
  }

  public async computedAlarmErrors() {
    const errors = await this.errorModel.find({
      where: {
        updatedAt: Between(new Date(Date.now() - ALARM_INTERVAL), new Date()),
      },
    });
    errors.forEach(item => {
      this.queue.add('sendAlarm', item);
    });
  }

  public async sendAlarm(error) {
    const guarder = await this.userModel.findOne(error.guarderId);
    //const project = await this.projectModel.findOne(error.projectId);
    await this.httpService.axiosRef.request({
      // project.alarmHookUrl
      url: `https://oapi.dingtalk.com/robot/send?access_token=76dc9eda9d95b1ff3f0c77ee8e0a0ebe7b43a388dfebead943a97d5d25a81c5a`,
      method: 'post',
      data: {
        actionCard: {
          title: error.name || error.type,
          text: `### ${error.type}  ${error.name}  @${guarder.nickname} \n > ${
            error.message
          } ${error.url} \n * 错误等级: ${error.level} \n * 用户数:   ${
            error.userNum
          } \n * 事件数:   ${error.eventNum} \n * 版本:   ${
            error.version
          } \n * 创建时间:  ${moment(error.created_at).format(
            'YYYY-MM-DD HH:mm:ss',
          )} \n * 更新时间:  ${moment(error.updated_at).format(
            'YYYY-MM-DD HH:mm:ss',
          )}`,
          hideAvatar: '0',
          btnOrientation: '0',
          btns: [
            {
              title: '查看详情',
              actionURL: `http://127.0.0.1:7001/${error.projectId}/${error.id}`,
            },
            {
              title: '前往处理',
              actionURL: `http://127.0.0.1:7001/${error.projectId}/${error.id}`,
            },
            {
              title: '暂不处理',
              actionURL: `http://127.0.0.1:7001/${error.projectId}/${error.id}`,
            },
          ],
        },
        msgtype: 'actionCard',

        at: {
          atMobiles: [guarder.nickname],
          isAtAll: false,
        },
      },
    });
    return true;
  }
}
