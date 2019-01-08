'use strict';
import { Application } from 'egg';



export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Account = app.model.define('account', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    mobile: STRING(20),
    password: STRING(20),
    created_at: DATE,
    updated_at: DATE,
  });

  return Account;
};