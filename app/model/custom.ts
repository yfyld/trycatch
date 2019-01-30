'use strict';
import { Application } from 'egg';



export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Custom = app.model.define('custom', {
    id: { type: STRING(50), primaryKey: true},
    uId:{type:INTEGER,field:'u_id'},
    created_at: DATE,
    updated_at: DATE,
  });

  return Custom;
};