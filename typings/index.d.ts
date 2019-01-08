
import 'egg';
import { SequelizeStatic, Sequelize } from 'sequelize';
import { Redis } from 'ioredis';
import { ServerResponse } from './../app/util/serverResponse.d';

declare module 'egg' {
    interface Application {
        Sequelize: SequelizeStatic,
        model: Sequelize,
        redis: Redis
    }

    interface Response {
        ServerResponse: ServerResponse
    }
} 