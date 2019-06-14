// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/service/Test';
import ExportError from '../../../app/service/error';
import ExportLog from '../../../app/service/log';
import ExportProject from '../../../app/service/project';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    test: ExportTest;
    error: ExportError;
    log: ExportLog;
    project: ExportProject;
    user: ExportUser;
  }
}
