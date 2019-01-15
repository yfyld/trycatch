'use strict';
import { Application } from 'egg';



export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Project = app.model.define('project', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    language: STRING(20),
    frame: STRING(10),
    member: STRING(100),
    created_at: DATE,
    updated_at: DATE,
  });

  return Project;
};