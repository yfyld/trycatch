import { ServerResponse } from './../app/util/serverResponse.d';
import { ServerResponse } from 'http';

import 'egg';
import { SequelizeStatic, Sequelize } from 'sequelize';
import { Redis } from 'ioredis';
import { ServerResponse } from '../app/util/serverResponse.d';

declare module 'egg' {
    interface Application {
        Sequelize: SequelizeStatic,
        model: Sequelize,
        redis: Redis
    }

    // interface Response extends ExtendResponseType {
    //     ServerResponse: ServerResponse,
    //     ResponseCode: {
    //         SUCCESS: number,
    //         ERROR: number,
    //         ERROR_ARGUMENT: number,
    //         NO_LOGIN: number,
    //         NO_AUTH: number,
    //     }
    // }

} 