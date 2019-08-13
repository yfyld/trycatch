import { Sourcemap, Project } from './../project/project.model';
import { ErrorTypeListItemDto, ErrorTypeDto, SourceCodeDto } from './error.dto';
import { HttpBadRequestError } from '../../errors/bad-request.error';
import { ErrorType } from './error.model';
import { Injectable, HttpService } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@/modules/user/user.model';
import { QueryListResult, PageData } from '@/interfaces/request.interface';
import * as SourceMap from 'source-map';
import { RedisService } from 'nestjs-redis';
@Injectable()
export class ErrorService {
  constructor(
    @InjectRepository(ErrorType)
    private readonly errorTypeModel: Repository<ErrorType>,
    @InjectRepository(Sourcemap)
    private readonly sourcemapModel: Repository<Sourcemap>,
    @InjectRepository(Project)
    private readonly projectModel: Repository<Project>,
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
  ) {}

  public async createError(body: ErrorTypeDto): Promise<void> {
    let errorType = await this.getErrorTypeById(body.id);
    if (errorType) {
      errorType.eventNum++;
      return;
    } else {
      errorType = this.errorTypeModel.create(body);
    }
    await this.errorTypeModel.save(errorType);
    return;
  }

  public async getErrorTypeById(errorTypeId: string): Promise<ErrorType> {
    const errorType = await this.errorTypeModel.findOne({
      where: { id: errorTypeId },
    });
    return errorType;
  }

  public async getErrorTypes(
    query: QueryListResult<ErrorTypeListItemDto>,
  ): Promise<PageData<ErrorType>> {
    const [errorTypes, totalCount] = await this.errorTypeModel.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...query.query,
      },
    });
    return {
      totalCount,
      list: errorTypes,
    };
  }

  public async updateError(errorTypeId: number, body: any): Promise<void> {
    const errorType = await this.errorTypeModel.findOne({
      where: { id: errorTypeId },
    });
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
}
