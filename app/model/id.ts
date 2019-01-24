'use strict';
import { Application } from 'egg';

export default (app: Application) => {
    const { INTEGER, DATE } = app.Sequelize;

    const Id = app.model.define('id', {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true, unique: true },
            logId: { type: INTEGER, field: 'log_id'},
            created_at: DATE,
            updated_at: DATE,
    });

   

    return Id;
};