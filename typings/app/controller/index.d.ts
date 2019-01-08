// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/controller/account';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    account: ExportAccount;
    home: ExportHome;
  }
}
