import { SourcemapModel, ProjectModel } from './../project/project.model';
import { QueryErrorListDto, ErrorDto, SourceCodeDto } from './error.dto';
import { HttpBadRequestError } from '../../errors/bad-request.error';
import { ErrorModel } from './error.model';
import { Injectable, HttpService } from '@nestjs/common';
import { Repository, In, LessThan, MoreThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserModel } from '@/modules/user/user.model';
import { QueryListResult, PageData } from '@/interfaces/request.interface';
import * as SourceMap from 'source-map';
import { RedisService } from 'nestjs-redis';
@Injectable()
export class ErrorService {
  constructor(
    @InjectRepository(ErrorModel)
    private readonly errorTypeModel: Repository<ErrorModel>,
    @InjectRepository(SourcemapModel)
    private readonly sourcemapModel: Repository<SourcemapModel>,
    @InjectRepository(ProjectModel)
    private readonly projectModel: Repository<ProjectModel>,
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
  ) {}

  public async createError(body: ErrorDto): Promise<void> {
    let errorType = await this.getErrorById(body.id);
    if (errorType) {
      errorType.eventNum++;
      return;
    } else {
      errorType = this.errorTypeModel.create(body);
    }
    await this.errorTypeModel.save(errorType);
    return;
  }

  public async getErrorById(errorTypeId: string): Promise<ErrorModel> {
    const errorType = await this.errorTypeModel.findOne({
      where: { id: errorTypeId },
    });
    return errorType;
  }

  public async getErrors(
    query: QueryListResult<QueryErrorListDto>,
  ): Promise<PageData<ErrorModel>> {
    const { endDate, startDate, guarderId } = query.query;
    const searchBody = {
      skip: query.skip,
      take: query.take,
      where: {
        ...query.query,
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
    const [errorTypes, totalCount] = await this.errorTypeModel.findAndCount(
      searchBody,
    );
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
