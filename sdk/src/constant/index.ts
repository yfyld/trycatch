const CONS = {
    ERROR_TYPES_RE: /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/,
    UNKNOWN: 'UNKNOWN',
    UNKNOWN_FUNCTION: 'UNKNOWN_FUNCTION',
    JAVASCRIPT_ERROR: 'JAVASCRIPT_ERROR',
    BUSINESS_ERROR: 'BUSINESS_ERROR',
    LOG_ERROR: 'LOG_ERROR',
    HTTP_ERROR: 'HTTP_ERROR',
    VUE_ERROR: 'VUE_ERROR',
    PROMISE_ERROR: 'PROMISE_ERROR',
    SERVER_URL: 'http://moapi.tongdun.cn/api/project/mock/1/error',
    MAX_ERROR_COUNT: 3,
    LEVEL: {
        CRITICAL: 1,
        HIGH: 2,
        NORMAL: 3,
        LOW: 4
    }

}

export default CONS;