// 响应状态
export enum EHttpStatus {
  Error = 400,
  Success = 200,
}

export type TMessage = string;
export type TExceptionOption = TMessage | {
  message: TMessage;
  error?: any
};

// 翻页数据
export interface IHttpResultPaginate<T> {
  list: T;
  totalCount: number;
}

// HTTP 状态返回
export interface IHttpResponseBase {
  status: EHttpStatus;
  message: TMessage;
}

// HTTP error
export type THttpErrorResponse = IHttpResponseBase & {
  error: any;
  debug?: string
};

// HTTP success 返回
export type THttpSuccessResponse<T> = IHttpResponseBase & {
  result: T | IHttpResultPaginate<T>;
};

// HTTP Response
export type THttpResponse<T> = THttpErrorResponse | THttpSuccessResponse<T>;
