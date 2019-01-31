'use strict';
import { Application } from 'egg';



export default (app: Application) => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;

  const Error = app.model.define('error', {
    id: {
      type: INTEGER,
      field: 'id',
      primaryKey: true
    },
    ownerId: {
      type: INTEGER,
      field: 'owner_id'
    },
    projectId: {
      type: INTEGER,
      field: 'project_id'
    },
    status: {
      type: ENUM,
      values: ['UNSOLVED', 'SOLVED', 'IGNORE', 'PROGRESS'],
      defaultValue: 'UNSOLVED'
    },
    eventCount: {
      type: INTEGER,
      field: 'event_count',
      defaultValue:1
    },
    userCount: {
      type: INTEGER,
      field: 'user_count',
      defaultValue:1
    },
    type:{
      type: ENUM,
      values: ['HTTP_ERROR', 'JAVASCRIPT_ERROR', 'VUE_ERROR', 'REACT_ERROR'],
      defaultValue: 'JAVASCRIPT_ERROR'
    },
    description: STRING(300),
    level: {
      type: INTEGER,
      defaultValue:1
    },
    page: STRING(300),
    url: STRING(300),
    name: STRING(300),
    message: STRING(300),
    version: STRING(300),
    created_at: DATE,
    updated_at: DATE,
  });

  return Error;
};