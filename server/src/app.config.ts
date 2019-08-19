import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as path from 'path';
import { isProdMode } from './app.environment';

export const APP = {
  port: 3300,
  version: '1.0.0',
};

export const AUTH = {
  jwtTokenSecret: 'I am quiet handsome man',
  expiresIn: 99999999999999,
  defaultPassword: '123456',
  data: { username: 'root', roles: [] },
};

export const CROSS_DOMAIN = {
  allowedOrigins: [],
};

export const MONGODB = {
  url: `mongodb://yfyld.online:27017/minder`,
  username: 'yfyld',
  password: '342531',
  limit: 20,
};

export const REDIS = {
  host: '127.0.0.1',
  port: 6666,
  ttl: null,
  defaultCacheTTL: 60 * 60 * 24,
};

export const BULLCONFIG = {};

export const CCONFIG = {};

export const ORMCONFIG: MysqlConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3333,
  username: 'root',
  password: '342531',
  database: 'trycatch',
  entities: [__dirname + '/**/*.model{.ts,.js}'],
  synchronize: true,
};

export const MULTER_OPTIONS = {
  fileSize: 10000000,
  path: path.join(__dirname, 'publics/uploads'),
};

export const BASE_URL = {
  webUrl: isProdMode ? 'http://trycatch.yfyld.cn' : 'http://localhost:5000',
  serverUrl: isProdMode
    ? 'http://trycatch.yfyld.cn/api'
    : 'http://localhost:3300',
};

export const ALARMCONFIG = {
  alarmWithlevelType: [1, 10, 100],
};
