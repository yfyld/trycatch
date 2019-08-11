import { Sourcemap } from './../project/project.model';
import { ErrorTypeListItemDto, ErrorTypeDto } from './error.dto';
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
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
  ) {}

  public async createError(body: ErrorTypeDto): Promise<void> {
    const errorType = this.errorTypeModel.create(body);
    await this.errorTypeModel.save(errorType);
    return;
  }

  public async getErrorTypeById(errorTypeId: number): Promise<ErrorType> {
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

  private async parseSourcemap(sourcemapSrc, line, column): Promise<string> {
    // 读取map文件，实际就是一个json文件
    var rawSourceMap = await this.httpService.axiosRef.request({
      url: sourcemapSrc,
    });
    if (!rawSourceMap || !rawSourceMap.data) {
      return '';
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

    return `
    ${rawLines[sm.line - 3]} \n
    ${rawLines[sm.line - 2]} \n
    ${rawLines[sm.line - 1]} \n
    > ${rawLines[sm.line]} \n
    ${rawLines[sm.line + 1]}
    `;
  }

  public async getSourceCode(): Promise<string> {
    // const errorType = await this.errorTypeModel.findOne({
    //   where: { id: errorTypeId, version },
    // });

    // const sourcemap = await this.sourcemapModel.findOne({
    //   where: { fileName, version, projectId },
    // });
    // if (sourcemap) {
    // }
    const client = this.redisService.getClient();

    const clearKey = 'aaaaa'; //`${projectId}-${errorTypeId}-${version}-${sourcemapSrc}`;

    let sourceCode = await client.get(clearKey);

    if (sourceCode) {
      return sourceCode;
    }

    sourceCode = await this.parseSourcemap(
      'http://zyyh.91jkys.com/assets/js/vendor.baca39463fd704390477.js.map',
      1,
      200,
    );

    client.set(clearKey, sourceCode);
    return;
  }
}
