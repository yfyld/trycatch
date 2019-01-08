'use strict';
import { Application } from 'egg';



module.exports = (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    mobile: STRING(20),
    password: STRING(20),
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};