import 'egg';
import { SequelizeStatic, Sequelize } from 'sequelize';
import { Redis } from 'ioredis';

declare module 'egg' {
    interface Application {
        Sequelize: SequelizeStatic,
        model: Sequelize,
        redis: Redis
    }
} 