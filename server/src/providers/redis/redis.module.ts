import { REDIS } from './../../app.config';
import { ORMCONFIG } from '@/app.config';
import { RedisModule as _RedisModule } from 'nestjs-redis';
import { DynamicModule } from '@nestjs/common';

export const RedisModule: DynamicModule = _RedisModule.register({
  host: REDIS.host,
  port: REDIS.port,
  db: 3,
});
