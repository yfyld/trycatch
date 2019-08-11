import { Sourcemap } from './../project/project.model';
import { ErrorTypeListItemDto, ErrorTypeDto } from './error.dto';
import { HttpBadRequestError } from '../../errors/bad-request.error';
import { ErrorType } from './error.model';
import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@/modules/user/user.model';
import { QueryListResult, PageData } from '@/interfaces/request.interface';
@Injectable()
export class ErrorService {
  constructor(
    @InjectRepository(ErrorType)
    private readonly errorTypeModel: Repository<ErrorType>,
    @InjectRepository(Sourcemap)
    private readonly sourcemapModel: Repository<Sourcemap>,
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

  public async parseSourcemap(
    errorTypeId: number,
    version: string,
  ): Promise<void> {
    const errorType = await this.errorTypeModel.findOne({
      where: { id: errorTypeId, version },
    });

    const sourcemap = await this.sourcemapModel.findOne({
      where: { fileName, version },
    });
    return;
  }
}
