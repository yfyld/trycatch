import * as HTTP from '@/constants/http.constant';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * @class ValidationError
 * @classdesc 400 -> 请求有问题，这个错误经常发生在错误内层，所以 code 没有意义
 * @example new ValidationError('错误信息')
 * @example new ValidationError(new Error())
 */
export class ValidationError extends HttpException {
  constructor(error?: any) {
    super(error || HTTP.VALIDATION_ERROR_DEFAULT, HttpStatus.BAD_REQUEST);
  }
}
