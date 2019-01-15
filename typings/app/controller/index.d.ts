// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportError from '../../../app/controller/error';
import ExportHome from '../../../app/controller/home';
import ExportLog from '../../../app/controller/log';
import ExportProject from '../../../app/controller/project';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    error: ExportError;
    home: ExportHome;
    log: ExportLog;
    project: ExportProject;
    user: ExportUser;
  }
}
