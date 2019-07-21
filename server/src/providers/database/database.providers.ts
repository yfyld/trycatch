import { DB_CONNECTION_TOKEN } from '@/constants/common.constant';
import { createConnection } from 'typeorm';
import { ORMCONFIG } from '@/app.config';

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => await createConnection(ORMCONFIG),
  },
];
