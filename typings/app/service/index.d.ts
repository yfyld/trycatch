// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/service/Account';
import ExportTest from '../../../app/service/Test';

declare module 'egg' {
  interface IService {
    account: ExportAccount;
    test: ExportTest;
  }
}
