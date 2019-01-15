// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportError from '../../../app/model/error';
import ExportIndex from '../../../app/model/index';
import ExportLog from '../../../app/model/log';
import ExportProject from '../../../app/model/project';
import ExportUser from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Error: ReturnType<typeof ExportError>;
    Index: ReturnType<typeof ExportIndex>;
    Log: ReturnType<typeof ExportLog>;
    Project: ReturnType<typeof ExportProject>;
    User: ReturnType<typeof ExportUser>;
  }
}
