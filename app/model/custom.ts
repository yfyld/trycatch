'use strict';
import { Application } from 'egg';



export default (app: Application) => {
  const {STRING, INTEGER, DATE,UUID,UUIDV4 } = app.Sequelize;

  const Custom = app.model.define('custom', {
    id: { type: UUID, primaryKey: true,defaultValue:UUIDV4},
    uId:{type:INTEGER,field:'u_id'},
    ua:STRING(200),
    created_at: DATE,
    updated_at: DATE,
  });

  return Custom;
};