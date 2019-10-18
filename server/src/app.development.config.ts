import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as path from 'path';

export const APP = {
  port: 7001,
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

export const BULLCONFIG = {};

export const CCONFIG = {};

export const MULTER_OPTIONS = {
  fileSize: 10000000,
  path: path.join(__dirname, 'publics/uploads'),
};

export const ALARMCONFIG = {
  alarmWithlevelType: [1, 10, 100],
};

export const STAT_USER_NUM_INTERVAL = 30000;
export const ALARM_INTERVAL = 30000;
export const GENERATE_IMG_CRON = '0 0 11 * *';

export const BASE_URL = {
  webUrl: 'http://127.0.0.1:5000',
  serverUrl: 'http://127.0.0.1:7001',
};

export const ORMCONFIG: MysqlConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3337,
  username: 'root',
  password: '342531',
  database: 'trycatch',
  entities: [__dirname + '/**/*.model{.ts,.js}'],
  synchronize: true,
};

export const MONGODB = {
  url: `mongodb://127.0.0.1:27017/minder`,
  username: 'yfyld',
  password: '342531',
  limit: 20,
};

export const REDIS = {
  host: '127.0.0.1',
  port: 6667,
  ttl: null,
  defaultCacheTTL: 60 * 60 * 24,
};

export const ES_CONFIG = {
  host: 'trycatch.yfyld.com:9600',
  log: 'trace',
};
