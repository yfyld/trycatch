'use strict';
import { Application } from 'egg';



export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Error = app.model.define('error', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    logId: STRING(1000),
    errorId: {
      type: INTEGER,
      field: 'error_id'
    },
    count: INTEGER,
    type: STRING(30),
    description: STRING(100),
    created_at: DATE,
    updated_at: DATE,
  });

  return Error;
};