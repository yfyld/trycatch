import * as HTTP from '@/constants/http.constant';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * @class HttpForbiddenError
 * @classdesc 403 -> 无权限/权限不足
 * @example new HttpForbiddenError('错误信息')
 * @example new HttpForbiddenError(new Error())
 */
export class HttpForbiddenError extends HttpException {
  constructor(error?: any) {
    super(error || HTTP.HTTP_PERMISSION_ERROR_DEFAULT, HttpStatus.FORBIDDEN);
  }
}
