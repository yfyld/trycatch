import { REDIS } from './../../app.config';
import { ORMCONFIG } from '@/app.config';
import { BullModule } from 'nest-bull';

export const BullQueueModule = BullModule.forRoot({
  //name: 'store',
  options: {
    redis: {
      host: REDIS.host,
      port: REDIS.port,
      db: 1,
    },
  },
  processors: [],
});
