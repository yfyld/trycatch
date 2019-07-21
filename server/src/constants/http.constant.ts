import { CACHE_KEY_METADATA } from '@nestjs/common/cache/cache.constants';
export const HTTP_ERROR_CODE = 400;
export const HTTP_SUCCESS_CODE = 200;
export const HTTP_ERROR_MESSAGE = 'HTTP_ERROR_MESSAGE';
export const HTTP_SUCCESS_MESSAGE = 'HTTP_SUCCESS_MESSAGE';
export const HTTP_RES_TRANSFORM_PAGINATE = 'HTTP_RES_TRANSFORM_PAGINATE';

export const HTTP_ERROR_SUFFIX = '失败';
export const HTTP_SUCCESS_SUFFIX = '成功';
export const HTTP_DEFAULT_TEXT = '数据请求';
export const HTTP_DEFAULT_ERROR_TEXT = HTTP_DEFAULT_TEXT + HTTP_ERROR_SUFFIX;
export const HTTP_DEFAULT_SUCCESS_TEXT =
  HTTP_DEFAULT_TEXT + HTTP_SUCCESS_SUFFIX;

export const HTTP_ANONYMOUSE_TEXT = '来者何人';
export const HTTP_UNAUTHORIZED_TEXT_DEFAULT = '权限验证失败';
export const HTTP_BAD_REQUEST_TEXT_DEFAULT = '未知错误';
export const HTTP_PERMISSION_ERROR_DEFAULT = '无权权限访问';

export const VALIDATION_ERROR_DEFAULT = '参数验证失败';

export const HTTP_CACHE_KEY_METADATA = CACHE_KEY_METADATA;
export const HTTP_CACHE_TTL_METADATA = '__customHttpCacheTTL__';
