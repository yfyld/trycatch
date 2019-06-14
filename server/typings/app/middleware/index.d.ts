// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCheckLogin from '../../../app/middleware/checkLogin';

declare module 'egg' {
  interface IMiddleware {
    checkLogin: typeof ExportCheckLogin;
  }
}
