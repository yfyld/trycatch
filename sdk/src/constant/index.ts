export const ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/

export const ERROR_LEVEL = {
  CRITICAL: 1,
  HIGH: 2,
  NORMAL: 3,
  LOW: 4
}

export const ERROR_TYPE = {
  JAVASCRIPT_ERROR: 'JAVASCRIPT_ERROR',
  BUSINESS_ERROR: 'BUSINESS_ERROR',
  RESOURCE_ERROR: 'RESOURCE_ERROR',
  LOG_ERROR: 'LOG_ERROR',
  LOG_WARN: 'LOG_WARN',
  HTTP_ERROR: 'HTTP_ERROR',
  VUE_ERROR: 'VUE_ERROR',
  PROMISE_ERROR: 'PROMISE_ERROR'
}

export const UNKNOWN_FUNCTION = 'UNKNOWN_FUNCTION'
export const UNKNOWN = 'UNKNOWN'
