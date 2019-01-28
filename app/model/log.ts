'use strict';
import { Application } from 'egg';
import * as moment from 'moment';

export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Log = app.model.define('log', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    type: STRING(30),
    source: STRING(10000),
    url: STRING(100),
    projectId: {
      type: INTEGER,
      field: 'project_id',
    },
    month: STRING(10),
    version: STRING(10),
    created_at: {
      type: DATE,
      get() {
        console.log(this);
      }
    },
    updated_at: DATE,
  });

  Log.beforeCreate(function() {

    const y_m = moment().format('YYYY_MM');
    (Log as any).tableName = `log_${y_m}`;

  });

  Log.beforeFind(function(options: Object) {
    // const date = options.where.date
    const where = (options as any).where || {};
    const month = where.month;
    // 校验表是否存在
    (Log as any).tableName = `log_${month}`;
  });

  return Log;
};