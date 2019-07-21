import * as HTTP from '@/constants/http.constant';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * @class HttpBadRequestError
 * @classdesc 400 -> 请求不合法
 * @example new HttpBadRequestError('错误信息')
 * @example new HttpBadRequestError(new Error())
 */
export class HttpBadRequestError extends HttpException {
  constructor(error?: any) {
    super(error || HTTP.HTTP_BAD_REQUEST_TEXT_DEFAULT, HttpStatus.BAD_REQUEST);
  }
}
