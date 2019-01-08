import { ServerResponse } from 'http';
// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExtendResponse from '../../../app/extend/response';
declare module 'egg' {
  type ExtendResponseType = typeof ExtendResponse;
  interface Response extends ExtendResponseType { 
    ServerResponse: {
      constructor(status?: number, msg?: string, data?: object | null);
      status: number;
      msg?: string;
      data?: object | null;
      getData(): object | null;
      getStatus(): number;
      static success(msg: string, data: object, status?: number): object;
      static error(msg: string, status?: number): object;
    }
    ResponseCode: {
      SUCCESS: number,
      ERROR: number,
      ERROR_ARGUMENT: number,
      NO_LOGIN: number,
      NO_AUTH: number,
    }
  }
}