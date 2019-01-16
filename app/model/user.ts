'use strict';
import { Application } from 'egg';



export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    mobile: STRING(20),
    password: STRING(50),
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};