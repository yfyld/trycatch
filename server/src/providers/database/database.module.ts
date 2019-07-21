import { ORMCONFIG } from '@/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { Module , Global} from '@nestjs/common';
// import { databaseProviders } from './database.providers';

// @Global()
// @Module({
//   providers: [...databaseProviders],
//   exports: [...databaseProviders],
// })
// export class DatabaseModule {}

export const DatabaseModule = TypeOrmModule.forRoot(ORMCONFIG);
