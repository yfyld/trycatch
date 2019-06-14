// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCustom from '../../../app/model/custom';
import ExportError from '../../../app/model/error';
import ExportId from '../../../app/model/id';
import ExportIndex from '../../../app/model/index';
import ExportLog from '../../../app/model/log';
import ExportProject from '../../../app/model/project';
import ExportUser from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Custom: ReturnType<typeof ExportCustom>;
    Error: ReturnType<typeof ExportError>;
    Id: ReturnType<typeof ExportId>;
    Index: ReturnType<typeof ExportIndex>;
    Log: ReturnType<typeof ExportLog>;
    Project: ReturnType<typeof ExportProject>;
    User: ReturnType<typeof ExportUser>;
  }
}
