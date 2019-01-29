'use strict';
import { Application } from 'egg';



export default (app: Application) => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;

  const Error = app.model.define('error', {
    id: { type: INTEGER, primaryKey: true },
    logId: STRING(1000),
    projectId: {
      type: INTEGER,
      field: 'project_id'
    },
    // errorId: {
    //   type: INTEGER,
    //   field: 'error_id'
    // },
    status: {
      type: ENUM,
      values: ['UNSOLVED', 'SOLVED', 'IGNORE', 'PROGRESS'],
      defaultValue: 'UNSOLVED'
    },
    count: INTEGER,
    type: STRING(30),
    description: STRING(100),
    created_at: DATE,
    updated_at: DATE,
  });

  return Error;
};