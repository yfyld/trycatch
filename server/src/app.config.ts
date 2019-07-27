import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

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
  host: 'yfyld.online',
  port: 6379,
  ttl: null,
  defaultCacheTTL: 60 * 60 * 24,
};

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
