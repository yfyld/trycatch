import * as HTTP from '@/constants/http.constant';
import { UnauthorizedException } from '@nestjs/common';
import { TMessage } from '@/interfaces/http.interface';

/**
 * @class HttpUnauthorizedError
 * @classdesc 401 -> 未授权/权限验证失败
 * @example new HttpUnauthorizedError('全新验证失败')
 * @example new HttpUnauthorizedError('错误信息', new Error())
 */
export class HttpUnauthorizedError extends UnauthorizedException {
  constructor(message?: TMessage, error?: any) {
    super(message || HTTP.HTTP_UNAUTHORIZED_TEXT_DEFAULT, error);
  }
}
