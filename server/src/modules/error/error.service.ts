import { ErrorTypeListItemDto } from './error.dto';
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
  ) {}

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
}
