import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { PaginateResult } from 'mongoose';
import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { THttpSuccessResponse, IHttpResultPaginate, EHttpStatus } from '@/interfaces/http.interface';
import { TMessage } from '@/interfaces/http.interface';
import * as HTTP from '@/constants/http.constant';

// 转换为标准的数据结构
export function transformDataToPaginate<T>(data: PaginateResult<T>, request?: any): IHttpResultPaginate<T[]> {
  return {
    list: data.docs,
    totalCount: data.total,
  };
}

/**
 * @class TransformInterceptor
 * @classdesc 当控制器所需的 Promise service 成功响应时，将在此被转换为标准的数据结构 IHttpResultPaginate
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, THttpSuccessResponse<T>> {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<THttpSuccessResponse<T>> {
    const call$ = next.handle();
    const target = context.getHandler();
    const request = context.switchToHttp().getRequest();
    const message = this.reflector.get<TMessage>(HTTP.HTTP_SUCCESS_MESSAGE, target) || HTTP.HTTP_DEFAULT_SUCCESS_TEXT;
    const usePaginate = this.reflector.get<boolean>(HTTP.HTTP_RES_TRANSFORM_PAGINATE, target);
    return call$.pipe(map((data: any) => {
      const result = !usePaginate ? data : transformDataToPaginate<T>(data, request);
      return { status: EHttpStatus.Success, message, result };
    }));
  }
}
