'use strict';
import { Application } from 'egg';



export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Log = app.model.define('log', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: STRING(30),
    description: STRING(100),
    created_at: DATE,
    updated_at: DATE,
  });

  return Log;
};