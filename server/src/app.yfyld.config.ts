import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as path from 'path';

export const APP = {
  port: 3007,
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
export const GENERATE_IMG_CRON = '0 0 3 * *';

export const BASE_URL = {
  webUrl: 'http://trycatch.yfyld.com',
  serverUrl: 'http://trycatch.yfyld.com/api',
};

export const ORMCONFIG: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'root',
  password: '342531',
  database: 'trycatch',
  entities: [__dirname + '/**/*.model{.ts,.js}'],
  synchronize: true,
};

export const REDIS = {
  host: 'redis',
  port: 6379,
  ttl: null,
  defaultCacheTTL: 60 * 60 * 24,
};

export const ES_CONFIG = {
  host: 'trycatch.yfyld.com:9006',
  log: 'trace',
};
