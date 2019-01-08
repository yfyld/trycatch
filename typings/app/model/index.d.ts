// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/model/account';

declare module 'sequelize' {
  interface Sequelize {
    Account: ReturnType<typeof ExportAccount>;
  }
}
